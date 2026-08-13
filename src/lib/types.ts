export enum TipoEvento {
  RAVE = "RAVE",
  FESTIVAL = "FESTIVAL",
  SHOW = "SHOW",
  CLUBNIGHT = "CLUBNIGHT",
  POOLPARTY = "POOLPARTY",
  AFTER = "AFTER",
}

export interface Administrador {
  id: number;
  nome: string;
  email: string;
}

export interface Evento {
  id: number;
  nome: string;
  data: string;
  localizacao: string;
  descricao: string;
  imagemUrl: string;
  tipo: TipoEvento;
  administradorId: number;
  administradorNome: string;
}

export interface LoginRequest {
  email: string;
  senha: string;
}

export interface CadastroRequest {
  nome: string;
  email: string;
  senha: string;
}

export interface AuthResponse {
  token: string;
  id: number;
  nome: string;
  email: string;
}

export interface EventoRequest {
  nome: string;
  data: string;
  localizacao: string;
  descricao: string;
  imagemUrl: string;
  tipo: TipoEvento;
}

export interface EventoUpdateRequest {
  data: string;
  localizacao: string;
}

export interface PageResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}
