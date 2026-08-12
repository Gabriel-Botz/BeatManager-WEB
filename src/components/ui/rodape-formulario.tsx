import Link from "next/link";

interface RodapeFormularioProps {
  texto: string;
  textoLink: string;
  href: string;
}

export function RodapeFormulario({ texto, textoLink, href }: RodapeFormularioProps) {
  return (
    <p className="formulario-rodape">
      {texto}{" "}
      <Link href={href} className="formulario-link">{textoLink}</Link>
    </p>
  );
}
