import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginacaoProps {
  paginaAtual: number;
  totalPaginas: number;
  aoMudarPagina: (pagina: number) => void;
}

export function Paginacao({ paginaAtual, totalPaginas, aoMudarPagina }: PaginacaoProps) {
  if (totalPaginas <= 1) return null;

  return (
    <div className="paginacao">
      <button
        onClick={() => aoMudarPagina(paginaAtual - 1)}
        disabled={paginaAtual === 0}
        className="paginacao-botao"
      >
        <ChevronLeft className="w-4 h-4" />
        Anterior
      </button>

      <span className="paginacao-info">
        {paginaAtual + 1} / {totalPaginas}
      </span>

      <button
        onClick={() => aoMudarPagina(paginaAtual + 1)}
        disabled={paginaAtual >= totalPaginas - 1}
        className="paginacao-botao"
      >
        Proximo
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
}
