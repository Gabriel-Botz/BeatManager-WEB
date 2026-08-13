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
      <Link href="/" className="botao-nav botao-nav-texto">Início</Link>
      <Link href={estaEmMeusEventos ? "/eventos" : "/eventos/meus"} className="botao-nav botao-nav-texto">
        {estaEmMeusEventos ? "Eventos" : "Meus Eventos"}
      </Link>
      <button onClick={aoSair} className="botao-sair">
        <LogOut className="w-4 h-4" />
        Sair
      </button>
    </nav>
  );
}
