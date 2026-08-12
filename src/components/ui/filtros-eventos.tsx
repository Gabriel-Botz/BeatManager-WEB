import { Search } from "lucide-react";

interface FiltrosEventosProps {
  busca: string;
  aoMudarBusca: (valor: string) => void;
  categoria: string;
  aoMudarCategoria: (categoria: string) => void;
  categorias: string[];
}

export function FiltrosEventos({
  busca,
  aoMudarBusca,
  categoria,
  aoMudarCategoria,
  categorias,
}: FiltrosEventosProps) {
  return (
    <div className="eventos-filtros">
      <div className="eventos-busca">
        <Search className="w-5 h-5 text-muted" />
        <input
          type="text"
          placeholder="Buscar por nome ou local..."
          value={busca}
          onChange={(e) => aoMudarBusca(e.target.value)}
          className="eventos-busca-input"
        />
      </div>

      <div className="eventos-categorias">
        {categorias.map((cat) => (
          <button
            key={cat}
            onClick={() => aoMudarCategoria(cat)}
            className={`eventos-categoria-botao ${
              categoria === cat ? "eventos-categoria-ativa" : ""
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
}
