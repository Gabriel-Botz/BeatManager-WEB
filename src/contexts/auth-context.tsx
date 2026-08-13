"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
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

export function AuthProvider({ children }: { children: ReactNode }) {
  const [admin, setAdmin] = useState<Administrador | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const savedToken = localStorage.getItem(STORAGE_KEY);
    const savedAdmin = localStorage.getItem(ADMIN_KEY);

    if (savedToken && savedAdmin) {
      setToken(savedToken);
      setAdmin(JSON.parse(savedAdmin));

      api.buscarPerfil(savedToken).catch(() => {
        localStorage.removeItem(STORAGE_KEY);
        localStorage.removeItem(ADMIN_KEY);
        setToken(null);
        setAdmin(null);
      });
    }
  }, []);

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
