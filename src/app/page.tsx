"use client";

import Link from "next/link";
import { useAuth } from "@/contexts/auth-context";
import { Calendar, Music, Headphones, LogOut } from "lucide-react";
import { FundoEfeitoBrilho } from "@/components/layout/fundo-efeito-brilho";
import { Cabecalho, CabecalhoNavegacao } from "@/components/layout/cabecalho";
import { CartaoRecurso } from "@/components/ui/cartao-recurso";

export default function Home() {
  const { admin, logout } = useAuth();

  return (
    <div className="pagina">
      <FundoEfeitoBrilho />

      <Cabecalho>
        <img src="/logo-header2.png" alt="BeatManager" className="logo-cabecalho" />
        {admin ? (
          <nav className="navegacao">
            <button onClick={logout} className="botao-sair">
              <LogOut className="w-4 h-4" />
              Sair
            </button>
          </nav>
        ) : (
          <CabecalhoNavegacao
            itens={[
              { href: "/login", rotulo: "Entrar" },
              { href: "/cadastro", rotulo: "Cadastrar", primario: true },
            ]}
          />
        )}
      </Cabecalho>

      <main className="conteudo-principal">
        <h1 className="titulo-principal">
          Gerencie seus <span className="texto-gradiente">eventos</span>
        </h1>

        <p className="subtitulo">
          Planeje, organize e administre seus eventos de música eletrônica em um só lugar.
        </p>

        <div className="botoes-acao">
          {admin ? (
            <Link href="/eventos" className="botao-primario-grande">
              Eventos
            </Link>
          ) : (
            <>
              <Link href="/cadastro" className="botao-primario-grande">
                Começar Agora
              </Link>
              <Link href="/login" className="botao-secundario-grande">
                Já tenho conta
              </Link>
            </>
          )}
        </div>

        <div className="grade-recursos">
          <CartaoRecurso
            icone={Calendar}
            cor="text-primary"
            titulo="Agendamento"
            descricao="Organize seus eventos com facilidade"
          />
          <CartaoRecurso
            icone={Music}
            cor="text-accent"
            titulo="Catálogo"
            descricao="Mantenha seu catálogo atualizado"
          />
          <CartaoRecurso
            icone={Headphones}
            cor="text-primary-light"
            titulo="Controle"
            descricao="Gerencie tudo em um painel"
          />
        </div>
      </main>

      <footer className="rodape">BeatManager &copy; 2026</footer>
    </div>
  );
}
