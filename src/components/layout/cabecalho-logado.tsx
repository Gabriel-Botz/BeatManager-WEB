import Link from "next/link";
import { LogOut } from "lucide-react";

interface CabecalhoLogadoProps {
  aoSair: () => void;
}

export function CabecalhoLogado({ aoSair }: CabecalhoLogadoProps) {
  return (
    <nav className="navegacao">
      <Link href="/" className="botao-nav botao-nav-texto">Início</Link>
      <Link href="/eventos" className="botao-nav botao-nav-texto">Eventos</Link>
      <button onClick={aoSair} className="botao-sair">
        <LogOut className="w-4 h-4" />
        Sair
      </button>
    </nav>
  );
}
