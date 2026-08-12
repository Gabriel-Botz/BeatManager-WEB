import Link from "next/link";
import { ReactNode } from "react";

interface CabecalhoProps {
  children?: ReactNode;
}

export function Cabecalho({ children }: CabecalhoProps) {
  return (
    <header className="cabecalho">
      {children}
    </header>
  );
}

interface NavegacaoItem {
  href: string;
  rotulo: string;
  primario?: boolean;
}

interface CabecalhoNavegacaoProps {
  itens: NavegacaoItem[];
}

export function CabecalhoNavegacao({ itens }: CabecalhoNavegacaoProps) {
  return (
    <nav className="navegacao">
      {itens.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={`botao-nav ${item.primario ? "botao-nav-primario" : "botao-nav-texto"}`}
        >
          {item.rotulo}
        </Link>
      ))}
    </nav>
  );
}
