"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { Administrador } from "@/lib/types";
import * as api from "@/lib/api";

interface AuthContextType {
  admin: Administrador | null;
  token: string | null;
  login: (email: string, senha: string) => Promise<boolean>;
  register: (nome: string, email: string, senha: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY = "beatmanager_token";
const ADMIN_KEY = "beatmanager_admin";

function loadInitialToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(STORAGE_KEY);
}

function loadInitialAdmin(): Administrador | null {
  if (typeof window === "undefined") return null;
  const saved = localStorage.getItem(ADMIN_KEY);
  return saved ? JSON.parse(saved) : null;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [admin, setAdmin] = useState<Administrador | null>(loadInitialAdmin);
  const [token, setToken] = useState<string | null>(loadInitialToken);

  useEffect(() => {
    api.setOnUnauthorized(() => {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(ADMIN_KEY);
      setToken(null);
      setAdmin(null);
      router.push("/login");
    });
  }, [router]);

  useEffect(() => {
    if (token && admin) {
      api.buscarPerfil(token).catch(() => {
        localStorage.removeItem(STORAGE_KEY);
        localStorage.removeItem(ADMIN_KEY);
        setToken(null);
        setAdmin(null);
      });
    }
  }, [token, admin]);

  async function login(email: string, senha: string): Promise<boolean> {
    try {
      const res = await api.login({ email, senha });
      const administrador: Administrador = { id: res.id, nome: res.nome, email: res.email };

      setToken(res.token);
      setAdmin(administrador);
      localStorage.setItem(STORAGE_KEY, res.token);
      localStorage.setItem(ADMIN_KEY, JSON.stringify(administrador));
      return true;
    } catch {
      return false;
    }
  }

  async function register(nome: string, email: string, senha: string): Promise<boolean> {
    try {
      await api.cadastrar({ nome, email, senha });
      return true;
    } catch {
      return false;
    }
  }

  function logout() {
    setToken(null);
    setAdmin(null);
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(ADMIN_KEY);
  }

  return (
    <AuthContext.Provider value={{ admin, token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
}
