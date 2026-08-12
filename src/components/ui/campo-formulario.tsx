import { InputHTMLAttributes } from "react";

interface CampoFormularioProps extends InputHTMLAttributes<HTMLInputElement> {
  rotulo: string;
}

export function CampoFormulario({ rotulo, ...props }: CampoFormularioProps) {
  return (
    <div className="campo-grupo">
      <label className="rotulo-formulario">{rotulo}</label>
      <input className="campo-formulario" {...props} />
    </div>
  );
}
