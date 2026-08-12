import Image from "next/image";

export function Logo() {
  return (
    <div className="formulario-logo">
      <Image src="/logo-header.png" alt="BeatManager" fill sizes="(max-width: 28rem) 100vw, 28rem" style={{ objectFit: "contain" }} />
    </div>
  );
}
