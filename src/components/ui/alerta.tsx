import { ReactNode } from "react";

interface AlertaProps {
  tipo: "erro" | "sucesso";
  children: ReactNode;
}

export function Alerta({ tipo, children }: AlertaProps) {
  return <div className={tipo === "erro" ? "erro-alerta" : "sucesso-alerta"}>{children}</div>;
}
