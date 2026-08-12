"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import { PaginaFormulario } from "@/components/layout/pagina-formulario";
import { Alerta } from "@/components/ui/alerta";
import { CampoFormulario } from "@/components/ui/campo-formulario";
import { CampoSenha } from "@/components/ui/campo-senha";
import { BotaoPrimario } from "@/components/ui/botao-primario";
import { RodapeFormulario } from "@/components/ui/rodape-formulario";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!email || !senha) {
      setError("Preencha todos os campos.");
      return;
    }

    const logged = login(email, senha);
    if (!logged) {
      setError("E-mail ou senha inválidos.");
      return;
    }

    router.push("/dashboard");
  }

  return (
    <PaginaFormulario>
      <form onSubmit={handleSubmit} className="cartao-formulario">
        <Link href="/" className="botao-fechar">X</Link>
        {error && <Alerta tipo="erro">{error}</Alerta>}

        <CampoFormulario
          rotulo="E-mail"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="admin@email.com"
        />

        <CampoSenha
          rotulo="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          placeholder="Sua senha"
        />

        <BotaoPrimario>Entrar</BotaoPrimario>

        <RodapeFormulario
          texto="Não tem conta?"
          textoLink="Cadastre-se"
          href="/cadastro"
        />
      </form>
    </PaginaFormulario>
  );
}
