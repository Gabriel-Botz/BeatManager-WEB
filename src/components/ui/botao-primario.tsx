import { ButtonHTMLAttributes, ReactNode } from "react";

interface BotaoPrimarioProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export function BotaoPrimario({ children, ...props }: BotaoPrimarioProps) {
  return (
    <button type="submit" className="botao-primario" {...props}>
      {children}
    </button>
  );
}
