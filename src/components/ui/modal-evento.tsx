import { Evento } from "@/lib/types";
import { Calendar, MapPin, Pencil, Trash2, X } from "lucide-react";

interface ModalEventoProps {
  evento: Evento;
  aoFechar: () => void;
  aoEditar?: (evento: Evento) => void;
  aoExcluir?: (evento: Evento) => void;
}

export function ModalEvento({ evento, aoFechar, aoEditar, aoExcluir }: ModalEventoProps) {
  return (
    <div className="modal-overlay" onClick={aoFechar}>
      <div className="modal-conteudo" onClick={(e) => e.stopPropagation()}>
        <button className="modal-fechar" onClick={aoFechar}>
          <X className="w-5 h-5" />
        </button>

        <div className="modal-capa">
          <img src={evento.capa} alt={evento.nome} />
        </div>

        <div className="modal-info">
          <span className="modal-categoria">{evento.categoria}</span>
          <h2 className="modal-titulo">{evento.nome}</h2>

          <div className="modal-detalhes">
            <span className="modal-detalhe">
              <Calendar className="w-4 h-4" />
              {new Date(evento.data).toLocaleDateString("pt-BR", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
            <span className="modal-detalhe">
              <MapPin className="w-4 h-4" />
              {evento.local}
            </span>
          </div>

          <p className="modal-descricao">{evento.descricao}</p>

          {(aoEditar || aoExcluir) && (
            <div className="modal-acoes">
              {aoEditar && (
                <button onClick={() => aoEditar(evento)} className="modal-botao-editar">
                  <Pencil className="w-4 h-4" />
                  Editar
                </button>
              )}
              {aoExcluir && (
                <button onClick={() => aoExcluir(evento)} className="modal-botao-excluir">
                  <Trash2 className="w-4 h-4" />
                  Excluir
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
