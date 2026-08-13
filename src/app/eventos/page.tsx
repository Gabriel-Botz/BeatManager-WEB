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
import { Calendar } from "lucide-react";

const categorias = ["Todas", ...Object.values(TipoEvento)];

export default function EventosPage() {
  const router = useRouter();
  const { admin, token, logout } = useAuth();
  const [eventos, setEventos] = useState<Evento[]>([]);
  const [loading, setLoading] = useState(true);
  const [busca, setBusca] = useState("");
  const [categoria, setCategoria] = useState("Todas");
  const [eventoSelecionado, setEventoSelecionado] = useState<Evento | null>(null);

  useEffect(() => {
    if (!admin || !token) {
      router.push("/login");
      return;
    }

    api.listarEventos(token, 0, 100)
      .then((res) => setEventos(res.content))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [admin, token, router]);

  const eventosFiltrados = eventos.filter((evento) => {
    const buscaMatch =
      evento.nome.toLowerCase().includes(busca.toLowerCase()) ||
      evento.localizacao.toLowerCase().includes(busca.toLowerCase());
    const categoriaMatch =
      categoria === "Todas" || evento.tipo === categoria;
    return buscaMatch && categoriaMatch;
  });

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
          Encontre seu <span className="texto-gradiente">evento</span>
        </h1>

        <p className="subtitulo">
          Explore os melhores eventos de música eletrônica do Brasil.
        </p>

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
            <p>Nenhum evento encontrado.</p>
          </div>
        )}
      </main>

      <footer className="rodape">BeatManager &copy; 2026</footer>

      {eventoSelecionado && (
        <ModalEvento
          evento={eventoSelecionado}
          aoFechar={() => setEventoSelecionado(null)}
        />
      )}
    </div>
  );
}
