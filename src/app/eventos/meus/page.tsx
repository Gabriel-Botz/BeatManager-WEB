"use client";

import { useState, useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import { eventos as mockEventos } from "@/lib/mock-data";
import { Evento } from "@/lib/types";
import { FundoEfeitoBrilho } from "@/components/layout/fundo-efeito-brilho";
import { Cabecalho } from "@/components/layout/cabecalho";
import { CabecalhoLogado } from "@/components/layout/cabecalho-logado";
import { CartaoEvento } from "@/components/ui/cartao-evento";
import { ModalEvento } from "@/components/ui/modal-evento";
import { FiltrosEventos } from "@/components/ui/filtros-eventos";
import { FormularioEvento } from "@/components/ui/formulario-evento";
import { Calendar, Music } from "lucide-react";
import Image from "next/image";

const categorias = ["Todas", ...new Set(mockEventos.map((e) => e.categoria))];

export default function MeusEventosPage() {
  const router = useRouter();
  const { admin, logout } = useAuth();
  const [aba, setAba] = useState<"lista" | "cadastrar" | "editar">("lista");
  const [busca, setBusca] = useState("");
  const [categoria, setCategoria] = useState("Todas");
  const [eventoSelecionado, setEventoSelecionado] = useState<Evento | null>(null);
  const [eventoEditando, setEventoEditando] = useState<Evento | null>(null);
  const [listaEventos, setListaEventos] = useState<Evento[]>(mockEventos);

  useEffect(() => {
    if (!admin) {
      router.push("/login");
    }
  }, [admin, router]);

  const meusEventos = useMemo(() => {
    if (!admin) return [];
    return listaEventos.filter((evento) => evento.adminId === admin.id);
  }, [admin, listaEventos]);

  const eventosFiltrados = useMemo(() => {
    return meusEventos.filter((evento) => {
      const buscaMatch =
        evento.nome.toLowerCase().includes(busca.toLowerCase()) ||
        evento.local.toLowerCase().includes(busca.toLowerCase());
      const categoriaMatch =
        categoria === "Todas" || evento.categoria === categoria;
      return buscaMatch && categoriaMatch;
    });
  }, [meusEventos, busca, categoria]);

  function aoCadastrarEvento(evento: Evento) {
    setListaEventos((prev) => [...prev, evento]);
    setAba("lista");
  }

  function aoEditarEvento(evento: Evento) {
    setListaEventos((prev) => prev.map((e) => (e.id === evento.id ? evento : e)));
    setEventoEditando(null);
    setEventoSelecionado(null);
    setAba("lista");
  }

  function aoExcluirEvento(evento: Evento) {
    setListaEventos((prev) => prev.filter((e) => e.id !== evento.id));
    setEventoSelecionado(null);
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
            adminId={admin.id}
            aoCadastrar={aoEditarEvento}
            evento={eventoEditando}
            aoCancelar={() => { setAba("lista"); setEventoEditando(null); }}
          />
        ) : aba === "cadastrar" ? (
          <FormularioEvento adminId={admin.id} aoCadastrar={aoCadastrarEvento} />
        ) : (
          <>
            <FiltrosEventos
              busca={busca}
              aoMudarBusca={setBusca}
              categoria={categoria}
              aoMudarCategoria={setCategoria}
              categorias={categorias}
            />

            {eventosFiltrados.length > 0 ? (
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
