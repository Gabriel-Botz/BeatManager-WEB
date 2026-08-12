"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { Admin } from "@/lib/types";
import { admins as mockAdmins } from "@/lib/mock-data";

interface AuthContextType {
  admin: Admin | null;
  login: (email: string, senha: string) => boolean;
  register: (nome: string, email: string, senha: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [adminsList, setAdminsList] = useState<Admin[]>(mockAdmins);

  function login(email: string, senha: string): boolean {
    const found = adminsList.find((a) => a.email === email && a.senha === senha);
    if (found) {
      setAdmin(found);
      return true;
    }
    return false;
  }

  function register(nome: string, email: string, senha: string): boolean {
    const exists = adminsList.find((a) => a.email === email);
    if (exists) return false;

    const newAdmin: Admin = {
      id: String(adminsList.length + 1),
      nome,
      email,
      senha,
    };
    setAdminsList((prev) => [...prev, newAdmin]);
    return true;
  }

  function logout() {
    setAdmin(null);
  }

  return (
    <AuthContext.Provider value={{ admin, login, register, logout }}>
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
