"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import { Evento, TipoEvento } from "@/lib/types";
import * as api from "@/lib/api";
import { FundoEfeitoBrilho } from "@/components/layout/fundo-efeito-brilho";
import { Cabecalho } from "@/components/layout/cabecalho";
import { CabecalhoLogado } from "@/components/layout/cabecalho-logado";
import { CartaoEvento } from "@/components/ui/cartao-evento";
import { ModalEvento } from "@/components/ui/modal-evento";
import { FiltrosEventos } from "@/components/ui/filtros-eventos";
import { FormularioEvento } from "@/components/ui/formulario-evento";
import { Calendar } from "lucide-react";

const categorias = ["Todas", ...Object.values(TipoEvento)];

export default function MeusEventosPage() {
  const router = useRouter();
  const { admin, token, logout } = useAuth();
  const [aba, setAba] = useState<"lista" | "cadastrar" | "editar">("lista");
  const [busca, setBusca] = useState("");
  const [categoria, setCategoria] = useState("Todas");
  const [eventoSelecionado, setEventoSelecionado] = useState<Evento | null>(null);
  const [eventoEditando, setEventoEditando] = useState<Evento | null>(null);
  const [listaEventos, setListaEventos] = useState<Evento[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!admin || !token) {
      router.push("/login");
      return;
    }

    api.listarMeusEventos(token, admin.id, 0, 100)
      .then((res) => setListaEventos(res.content))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [admin, token, router]);

  const eventosFiltrados = listaEventos.filter((evento) => {
    const buscaMatch =
      evento.nome.toLowerCase().includes(busca.toLowerCase()) ||
      evento.localizacao.toLowerCase().includes(busca.toLowerCase());
    const categoriaMatch =
      categoria === "Todas" || evento.tipo === categoria;
    return buscaMatch && categoriaMatch;
  });

  async function aoCadastrarEvento(evento: Evento) {
    setListaEventos((prev) => [...prev, evento]);
    setAba("lista");
  }

  async function aoEditarEvento(evento: Evento) {
    setListaEventos((prev) => prev.map((e) => (e.id === evento.id ? evento : e)));
    setEventoEditando(null);
    setEventoSelecionado(null);
    setAba("lista");
  }

  async function aoExcluirEvento(evento: Evento) {
    if (!token) return;
    try {
      await api.deletarImagem(token, evento.imagemUrl).catch(() => {});
      await api.deletarEvento(token, evento.id);
      setListaEventos((prev) => prev.filter((e) => e.id !== evento.id));
      setEventoSelecionado(null);
    } catch {}
  }

  function abrirEdicao(evento: Evento) {
    setEventoEditando(evento);
    setEventoSelecionado(null);
    setAba("editar");
  }

  if (!admin) return null;

  return (
    <div className="pagina">
      <FundoEfeitoBrilho />

      <Cabecalho>
        <img src="/logo-header2.png" alt="BeatManager" style={{ width: 210, height: 70, objectFit: "contain" }} />
        <CabecalhoLogado aoSair={logout} />
      </Cabecalho>

      <main className="conteudo-principal eventos-pagina">
        <h1 className="titulo-principal">
          <span className="texto-gradiente">Meus</span> eventos
        </h1>

        <p className="subtitulo">
          Gerencie e cadastre seus eventos.
        </p>

        <div className="abas">
          <button
            onClick={() => { setAba("lista"); setEventoEditando(null); }}
            className={`aba ${aba === "lista" || aba === "editar" ? "aba-ativa" : ""}`}
          >
            Meus Eventos
          </button>
          <button
            onClick={() => { setAba("cadastrar"); setEventoEditando(null); }}
            className={`aba ${aba === "cadastrar" ? "aba-ativa" : ""}`}
          >
            Cadastrar
          </button>
        </div>

        {aba === "editar" && eventoEditando ? (
          <FormularioEvento
            token={token!}
            aoCadastrar={aoEditarEvento}
            evento={eventoEditando}
            aoCancelar={() => { setAba("lista"); setEventoEditando(null); }}
          />
        ) : aba === "cadastrar" ? (
          <FormularioEvento token={token!} aoCadastrar={aoCadastrarEvento} />
        ) : (
          <>
            <FiltrosEventos
              busca={busca}
              aoMudarBusca={setBusca}
              categoria={categoria}
              aoMudarCategoria={setCategoria}
              categorias={categorias}
            />

            {loading ? (
              <div className="eventos-vazio">
                <p>Carregando eventos...</p>
              </div>
            ) : eventosFiltrados.length > 0 ? (
              <div className="grade-eventos">
                {eventosFiltrados.map((evento) => (
                  <div key={evento.id} onClick={() => setEventoSelecionado(evento)} className="cursor-pointer">
                    <CartaoEvento evento={evento} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="eventos-vazio">
                <Calendar className="w-12 h-12 text-muted" />
                <p>Você ainda não cadastrou nenhum evento.</p>
              </div>
            )}
          </>
        )}
      </main>

      <footer className="rodape">BeatManager &copy; 2026</footer>

      {eventoSelecionado && (
        <ModalEvento
          evento={eventoSelecionado}
          aoFechar={() => setEventoSelecionado(null)}
          aoEditar={abrirEdicao}
          aoExcluir={aoExcluirEvento}
        />
      )}
    </div>
  );
}
