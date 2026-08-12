import { LucideIcon } from "lucide-react";

interface CartaoRecursoProps {
  icone: LucideIcon;
  cor: string;
  titulo: string;
  descricao: string;
}

export function CartaoRecurso({ icone: Icone, cor, titulo, descricao }: CartaoRecursoProps) {
  return (
    <div className="cartao-recurso">
      <Icone className={`w-8 h-8 mx-auto mb-3 ${cor}`} />
      <h3 className="cartao-recurso-titulo">{titulo}</h3>
      <p className="cartao-recurso-descricao">{descricao}</p>
    </div>
  );
}
