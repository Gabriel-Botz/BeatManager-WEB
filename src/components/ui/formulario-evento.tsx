"use client";

import { useState, useRef } from "react";
import { CampoFormulario } from "@/components/ui/campo-formulario";
import { BotaoPrimario } from "@/components/ui/botao-primario";
import { Alerta } from "@/components/ui/alerta";
import { Evento, TipoEvento, EventoRequest } from "@/lib/types";
import * as api from "@/lib/api";
import { Upload, X } from "lucide-react";

interface FormularioEventoProps {
  token: string;
  aoCadastrar: (evento: Evento) => void;
  evento?: Evento | null;
  aoCancelar?: () => void;
}

const categoriasDisponiveis = Object.values(TipoEvento);

export function FormularioEvento({ token, aoCadastrar, evento, aoCancelar }: FormularioEventoProps) {
  const [nome, setNome] = useState(evento?.nome ?? "");
  const [data, setData] = useState(evento?.data.split("T")[0] ?? "");
  const [localizacao, setLocalizacao] = useState(evento?.localizacao ?? "");
  const [descricao, setDescricao] = useState(evento?.descricao ?? "");
  const [tipo, setTipo] = useState<TipoEvento>(evento?.tipo ?? TipoEvento.SHOW);
  const [imagemUrl, setImagemUrl] = useState(evento?.imagemUrl ?? "");
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const editando = !!evento;

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5000000) {
      setErro("A imagem deve ter no máximo 5MB.");
      return;
    }

    setEnviando(true);
    try {
      const res = await api.uploadImagem(token, file);
      setImagemUrl(res.url);
    } catch {
      setErro("Erro ao fazer upload da imagem.");
    } finally {
      setEnviando(false);
    }
  }

  function limparImagem() {
    setImagemUrl("");
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErro("");

    if (!nome || !data || !localizacao || !descricao) {
      setErro("Preencha todos os campos.");
      return;
    }

    if (editando) {
      try {
        const res = await api.atualizarEvento(token, evento.id, {
          data: data + "T20:00:00",
          localizacao,
        });
        aoCadastrar(res);
      } catch {
        setErro("Erro ao atualizar evento.");
        return;
      }
    } else {
      if (!imagemUrl) {
        setErro("Faça o upload de uma imagem.");
        return;
      }

      const dto: EventoRequest = {
        nome,
        data: data + "T20:00:00",
        localizacao,
        descricao,
        imagemUrl,
        tipo,
      };

      try {
        const res = await api.criarEvento(token, dto);
        aoCadastrar(res);
      } catch {
        setErro("Erro ao cadastrar evento.");
        return;
      }
    }

    setSucesso(true);
    setTimeout(() => setSucesso(false), 2000);

    if (!editando) {
      setNome("");
      setData("");
      setLocalizacao("");
      setDescricao("");
      setTipo(TipoEvento.SHOW);
      setImagemUrl("");
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  return (
    <form onSubmit={handleSubmit} className="formulario-evento">
      {erro && <Alerta tipo="erro">{erro}</Alerta>}
      {sucesso && (
        <Alerta tipo="sucesso">
          {editando ? "Evento atualizado com sucesso!" : "Evento cadastrado com sucesso!"}
        </Alerta>
      )}

      <CampoFormulario
        rotulo="Nome do evento"
        type="text"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        placeholder="Ex: Festival Eletrônico"
        disabled={editando}
      />

      <CampoFormulario
        rotulo="Data"
        type="date"
        value={data}
        onChange={(e) => setData(e.target.value)}
      />

      <CampoFormulario
        rotulo="Local"
        type="text"
        value={localizacao}
        onChange={(e) => setLocalizacao(e.target.value)}
        placeholder="Ex: São Paulo, SP"
      />

      {!editando && (
        <div className="campo-grupo">
          <label className="rotulo-formulario">Categoria</label>
          <select
            value={tipo}
            onChange={(e) => setTipo(e.target.value as TipoEvento)}
            className="campo-formulario"
          >
            {categoriasDisponiveis.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      )}

      {!editando && (
        <div className="campo-grupo">
          <label className="rotulo-formulario">Descrição</label>
          <textarea
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            placeholder="Descreva o evento..."
            className="campo-formulario campo-textarea"
            rows={3}
          />
        </div>
      )}

      {!editando && (
        <div className="campo-grupo">
          <label className="rotulo-formulario">Capa do evento</label>

          {imagemUrl ? (
            <div className="upload-preview">
              <img src={imagemUrl} alt="Preview" className="upload-preview-img" />
              <button
                type="button"
                onClick={limparImagem}
                className="upload-remover"
              >
                <X className="w-4 h-4" />
                Remover
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="upload-botao"
              disabled={enviando}
            >
              <Upload className="w-5 h-5" />
              {enviando ? "Enviando..." : "Escolher imagem"}
            </button>
          )}

          <input
            ref={inputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>
      )}

      <div className="formulario-botoes">
        {aoCancelar && (
          <button type="button" onClick={aoCancelar} className="botao-cancelar">
            Cancelar
          </button>
        )}
        <BotaoPrimario>{editando ? "Salvar Alterações" : "Cadastrar Evento"}</BotaoPrimario>
      </div>
    </form>
  );
}
