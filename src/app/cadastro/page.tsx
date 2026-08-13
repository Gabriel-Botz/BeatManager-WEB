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

export default function CadastroPage() {
  const router = useRouter();
  const { register } = useAuth();
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!nome || !email || !senha || !confirmarSenha) {
      setError("Preencha todos os campos.");
      return;
    }

    if (senha !== confirmarSenha) {
      setError("As senhas não conferem.");
      return;
    }

    if (senha.length < 6) {
      setError("A senha deve ter no mínimo 6 caracteres.");
      return;
    }

    const registered = await register(nome, email, senha);
    if (!registered) {
      setError("Este e-mail já está cadastrado.");
      return;
    }

    setSuccess(true);
    setTimeout(() => router.push("/login"), 1500);
  }

  return (
    <PaginaFormulario>
      <form onSubmit={handleSubmit} className="cartao-formulario">
        <Link href="/" className="botao-fechar">X</Link>
        {error && <Alerta tipo="erro">{error}</Alerta>}
        {success && <Alerta tipo="sucesso">Cadastro realizado com sucesso! Redirecionando...</Alerta>}

        <CampoFormulario
          rotulo="Nome completo"
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Seu nome"
        />

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
          placeholder="Mínimo 6 caracteres"
        />

        <CampoSenha
          rotulo="Confirmar senha"
          value={confirmarSenha}
          onChange={(e) => setConfirmarSenha(e.target.value)}
          placeholder="Repita a senha"
        />

        <BotaoPrimario>Cadastrar</BotaoPrimario>

        <RodapeFormulario
          texto="Já tem uma conta?"
          textoLink="Entrar"
          href="/login"
        />
      </form>
    </PaginaFormulario>
  );
}
