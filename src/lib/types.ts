export interface Admin {
  id: string;
  nome: string;
  email: string;
  senha: string;
}

export interface Evento {
  id: string;
  adminId: string;
  nome: string;
  data: string;
  local: string;
  descricao: string;
  capa: string;
  categoria: string;
}
