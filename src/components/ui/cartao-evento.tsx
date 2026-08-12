import { Evento } from "@/lib/types";
import { Calendar, MapPin } from "lucide-react";

interface CartaoEventoProps {
  evento: Evento;
}

export function CartaoEvento({ evento }: CartaoEventoProps) {
  return (
    <div className="cartao-evento">
      <div className="cartao-evento-capa">
        <img src={evento.capa} alt={evento.nome} />
        <span className="cartao-evento-categoria">{evento.categoria}</span>
      </div>
      <div className="cartao-evento-info">
        <h3 className="cartao-evento-titulo">{evento.nome}</h3>
        <div className="cartao-evento-detalhes">
          <span className="cartao-evento-detalhe">
            <Calendar className="w-4 h-4" />
            {new Date(evento.data).toLocaleDateString("pt-BR")}
          </span>
          <span className="cartao-evento-detalhe">
            <MapPin className="w-4 h-4" />
            {evento.local}
          </span>
        </div>
        <p className="cartao-evento-descricao">{evento.descricao}</p>
      </div>
    </div>
  );
}
