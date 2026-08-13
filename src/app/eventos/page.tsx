"use client";

import { useState, useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import { eventos } from "@/lib/mock-data";
import { Evento } from "@/lib/types";
import { FundoEfeitoBrilho } from "@/components/layout/fundo-efeito-brilho";
import { Cabecalho } from "@/components/layout/cabecalho";
import { CabecalhoLogado } from "@/components/layout/cabecalho-logado";
import { CartaoEvento } from "@/components/ui/cartao-evento";
import { ModalEvento } from "@/components/ui/modal-evento";
import { FiltrosEventos } from "@/components/ui/filtros-eventos";
import { Calendar, Music } from "lucide-react";
import Image from "next/image";

const categorias = ["Todas", ...new Set(eventos.map((e) => e.categoria))];

export default function EventosPage() {
  const router = useRouter();
  const { admin, logout } = useAuth();
  const [busca, setBusca] = useState("");
  const [categoria, setCategoria] = useState("Todas");
  const [eventoSelecionado, setEventoSelecionado] = useState<Evento | null>(null);

  useEffect(() => {
    if (!admin) {
      router.push("/login");
    }
  }, [admin, router]);

  const eventosFiltrados = useMemo(() => {
    return eventos.filter((evento) => {
      const buscaMatch =
        evento.nome.toLowerCase().includes(busca.toLowerCase()) ||
        evento.local.toLowerCase().includes(busca.toLowerCase());
      const categoriaMatch =
        categoria === "Todas" || evento.categoria === categoria;
      return buscaMatch && categoriaMatch;
    });
  }, [busca, categoria]);

  if (!admin) return null;

  return (
    <div className="pagina">
      <FundoEfeitoBrilho />

      <Cabecalho>
        <Image src="/logo-header.png" alt="BeatManager" width={240} height={80} style={{ objectFit: "contain" }} />
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
