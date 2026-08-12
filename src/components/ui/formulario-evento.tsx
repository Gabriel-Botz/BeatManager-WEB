"use client";

import { useState, useRef, useEffect } from "react";
import { CampoFormulario } from "@/components/ui/campo-formulario";
import { BotaoPrimario } from "@/components/ui/botao-primario";
import { Alerta } from "@/components/ui/alerta";
import { Evento } from "@/lib/types";
import { Upload, X } from "lucide-react";

interface FormularioEventoProps {
  adminId: string;
  aoCadastrar: (evento: Evento) => void;
  evento?: Evento | null;
  aoCancelar?: () => void;
}

const categoriasDisponiveis = ["Festival", "Show", "Rave"];

export function FormularioEvento({ adminId, aoCadastrar, evento, aoCancelar }: FormularioEventoProps) {
  const [nome, setNome] = useState("");
  const [data, setData] = useState("");
  const [local, setLocal] = useState("");
  const [descricao, setDescricao] = useState("");
  const [categoria, setCategoria] = useState(categoriasDisponiveis[0]);
  const [capa, setCapa] = useState("");
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const editando = !!evento;

  useEffect(() => {
    if (evento) {
      setNome(evento.nome);
      setData(evento.data);
      setLocal(evento.local);
      setDescricao(evento.descricao);
      setCategoria(evento.categoria);
      setCapa(evento.capa);
    }
  }, [evento]);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5000000) {
      setErro("A imagem deve ter no máximo 5MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setCapa(reader.result as string);
    };
    reader.readAsDataURL(file);
  }

  function limparImagem() {
    setCapa("");
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErro("");

    if (!nome || !data || !local || !descricao) {
      setErro("Preencha todos os campos.");
      return;
    }

    const eventoData: Evento = {
      id: editando ? evento.id : String(Date.now()),
      adminId,
      nome,
      data,
      local,
      descricao,
      capa: capa || "/eventos/default.jpg",
      categoria,
    };

    aoCadastrar(eventoData);
    setSucesso(true);
    setTimeout(() => setSucesso(false), 2000);

    if (!editando) {
      setNome("");
      setData("");
      setLocal("");
      setDescricao("");
      setCategoria(categoriasDisponiveis[0]);
      setCapa("");
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
        value={local}
        onChange={(e) => setLocal(e.target.value)}
        placeholder="Ex: São Paulo, SP"
      />

      <div className="campo-grupo">
        <label className="rotulo-formulario">Categoria</label>
        <select
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
          className="campo-formulario"
        >
          {categoriasDisponiveis.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

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

      <div className="campo-grupo">
        <label className="rotulo-formulario">Capa do evento</label>

        {capa ? (
          <div className="upload-preview">
            <img src={capa} alt="Preview" className="upload-preview-img" />
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
          >
            <Upload className="w-5 h-5" />
            Escolher imagem
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
