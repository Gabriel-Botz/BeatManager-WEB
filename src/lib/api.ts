import {
  AuthResponse,
  Administrador,
  Evento,
  LoginRequest,
  CadastroRequest,
  EventoRequest,
  EventoUpdateRequest,
  PageResponse,
} from "./types";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8081";

let onUnauthorized: (() => void) | null = null;

export function setOnUnauthorized(callback: () => void) {
  onUnauthorized = callback;
}

async function request<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  if (res.status === 401) {
    onUnauthorized?.();
    throw new Error("Sessão expirada. Faça login novamente.");
  }

  if (!res.ok) {
    const body = await res.json().catch(() => null);
    const message = body?.mensagem || body?.message || `Erro ${res.status}`;
    throw new Error(message);
  }

  if (res.status === 204) return undefined as T;
  return res.json();
}

function authHeaders(token: string): Record<string, string> {
  return { Authorization: `Bearer ${token}` };
}

export function login(dto: LoginRequest): Promise<AuthResponse> {
  return request<AuthResponse>("/auth/login", {
    method: "POST",
    body: JSON.stringify(dto),
  });
}

export function cadastrar(dto: CadastroRequest): Promise<Administrador> {
  return request<Administrador>("/auth/cadastro", {
    method: "POST",
    body: JSON.stringify(dto),
  });
}

export function buscarPerfil(token: string): Promise<Administrador> {
  return request<Administrador>("/auth/me", {
    headers: authHeaders(token),
  });
}

export function listarEventos(
  token: string,
  page: number = 0,
  size: number = 10,
  tipo?: string
): Promise<PageResponse<Evento>> {
  const params = new URLSearchParams({ page: String(page), size: String(size) });
  if (tipo && tipo !== "Todas") params.append("tipo", tipo);
  return request<PageResponse<Evento>>(
    `/eventos?${params.toString()}`,
    { headers: authHeaders(token) }
  );
}

export function listarMeusEventos(
  token: string,
  administradorId: number,
  page: number = 0,
  size: number = 10,
  tipo?: string
): Promise<PageResponse<Evento>> {
  const params = new URLSearchParams({ page: String(page), size: String(size) });
  if (tipo && tipo !== "Todas") params.append("tipo", tipo);
  return request<PageResponse<Evento>>(
    `/eventos/administrador/${administradorId}?${params.toString()}`,
    { headers: authHeaders(token) }
  );
}

export function buscarEventoPorId(id: number): Promise<Evento> {
  return request<Evento>(`/eventos/${id}`);
}

export function criarEvento(
  token: string,
  dto: EventoRequest
): Promise<Evento> {
  return request<Evento>("/eventos", {
    method: "POST",
    headers: authHeaders(token),
    body: JSON.stringify(dto),
  });
}

export function atualizarEvento(
  token: string,
  id: number,
  dto: EventoUpdateRequest
): Promise<Evento> {
  return request<Evento>(`/eventos/${id}`, {
    method: "PUT",
    headers: authHeaders(token),
    body: JSON.stringify(dto),
  });
}

export function deletarEvento(token: string, id: number): Promise<void> {
  return request<void>(`/eventos/${id}`, {
    method: "DELETE",
    headers: authHeaders(token),
  });
}

export async function uploadImagem(
  token: string,
  file: File
): Promise<{ url: string }> {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch(`${BASE_URL}/upload`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: formData,
  });

  if (res.status === 401) {
    onUnauthorized?.();
    throw new Error("Sessão expirada. Faça login novamente.");
  }

  if (!res.ok) {
    const body = await res.json().catch(() => null);
    const message = body?.mensagem || `Erro ${res.status}`;
    throw new Error(message);
  }

  return res.json();
}

export function deletarImagem(
  token: string,
  imageUrl: string
): Promise<void> {
  return request<void>(`/upload?imageUrl=${encodeURIComponent(imageUrl)}`, {
    method: "DELETE",
    headers: authHeaders(token),
  });
}
