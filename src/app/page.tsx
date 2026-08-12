"use client";

import Link from "next/link";
import { useAuth } from "@/contexts/auth-context";
import { Zap, Calendar, Music, Headphones } from "lucide-react";
import { FundoEfeitoBrilho } from "@/components/layout/fundo-efeito-brilho";
import { Cabecalho, CabecalhoNavegacao } from "@/components/layout/cabecalho";
import { CartaoRecurso } from "@/components/ui/cartao-recurso";
import Image from "next/image";

export default function Home() {
  const { admin } = useAuth();

  return (
    <div className="pagina">
      <FundoEfeitoBrilho />

      <Cabecalho>
        <Image src="/logo-header.png" alt="BeatManager" width={240} height={80} style={{ objectFit: "contain" }} />
        <CabecalhoNavegacao
          itens={
            admin
              ? [{ href: "/dashboard", rotulo: "Painel", primario: true }]
              : [
                  { href: "/login", rotulo: "Entrar" },
                  { href: "/cadastro", rotulo: "Cadastrar", primario: true },
                ]
          }
        />
      </Cabecalho>

      <main className="conteudo-principal">
        <div className="badge">
          <Zap className="w-4 h-4 text-primary" />
          <span className="badge-texto">Música Eletrônica</span>
        </div>

        <h1 className="titulo-principal">
          Gerencie seus <span className="texto-gradiente">eventos</span>
        </h1>

        <p className="subtitulo">
          Planeje, organize e administre seus eventos de música eletrônica em um só lugar.
        </p>

        <div className="botoes-acao">
          {admin ? (
            <Link href="/dashboard" className="botao-primario-grande">
              Ir para o Painel
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
