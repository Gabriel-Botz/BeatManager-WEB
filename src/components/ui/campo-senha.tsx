import { InputHTMLAttributes, useState } from "react";
import { Eye, EyeOff } from "lucide-react";

interface CampoSenhaProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  rotulo: string;
}

export function CampoSenha({ rotulo, ...props }: CampoSenhaProps) {
  const [visivel, setVisivel] = useState(false);

  return (
    <div className="campo-grupo">
      <label className="rotulo-formulario">{rotulo}</label>
      <div className="campo-com-icone">
        <input
          type={visivel ? "text" : "password"}
          className="campo-formulario"
          {...props}
        />
        <button
          type="button"
          onClick={() => setVisivel(!visivel)}
          className="botao-icone"
        >
          {visivel ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
        </button>
      </div>
    </div>
  );
}
