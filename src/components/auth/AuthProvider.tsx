"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { AuthModal } from "@/components/auth/AuthModal";

type AuthUser = { email: string };

type AuthCtx = {
  user: AuthUser | null;
  openLogin: () => void;
  openSignup: () => void;
  logout: () => void;
};

const Ctx = createContext<AuthCtx | null>(null);

const LS_KEY = "nb_user_v1";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [modal, setModal] = useState<null | "login" | "signup">(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(LS_KEY);
      if (raw) setUser(JSON.parse(raw));
    } catch {}
  }, []);

  const login = (email: string) => {
    const u = { email };
    setUser(u);
    localStorage.setItem(LS_KEY, JSON.stringify(u));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(LS_KEY);
  };

  const value = useMemo<AuthCtx>(
    () => ({
      user,
      openLogin: () => setModal("login"),
      openSignup: () => setModal("signup"),
      logout,
    }),
    [user]
  );

  return (
    <Ctx.Provider value={value}>
      {children}
      <AuthModal
        mode={modal}
        onClose={() => setModal(null)}
        onAuthed={(email) => {
          login(email);
          setModal(null);
        }}
        switchTo={(m) => setModal(m)}
      />
    </Ctx.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
