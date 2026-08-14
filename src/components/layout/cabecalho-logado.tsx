import Link from "next/link";
import { LogOut } from "lucide-react";
import { usePathname } from "next/navigation";

interface CabecalhoLogadoProps {
  aoSair: () => void;
}

export function CabecalhoLogado({ aoSair }: CabecalhoLogadoProps) {
  const pathname = usePathname();
  const estaEmMeusEventos = pathname === "/eventos/meus";

  return (
    <nav className="navegacao">
      <Link href="/" className="botao-nav botao-nav-texto">Inicio</Link>
      <Link href={estaEmMeusEventos ? "/eventos" : "/eventos/meus"} className="botao-nav botao-nav-texto">
        {estaEmMeusEventos ? "Eventos" : "Meus Eventos"}
      </Link>
      <button onClick={aoSair} className="botao-sair">
        <LogOut className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        <span className="hidden sm:inline">Sair</span>
      </button>
    </nav>
  );
}
