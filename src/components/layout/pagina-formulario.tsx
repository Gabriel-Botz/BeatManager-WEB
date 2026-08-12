import { ReactNode } from "react";
import { FundoEfeitoBrilho } from "./fundo-efeito-brilho";
import { Logo } from "../identidade/logo";

interface PaginaFormularioProps {
  children: ReactNode;
}

export function PaginaFormulario({ children }: PaginaFormularioProps) {
  return (
    <div className="pagina-formulario">
      <FundoEfeitoBrilho />
      <div className="formulario-container">
        <Logo />
        {children}
      </div>
    </div>
  );
}
