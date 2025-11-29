"use client";

import { useEffect, useState } from "react";

const LOGGED_IN_KEY = "nb_logged_in";
const STUDIO_ACCESS_KEY = "nb_studio_access";
const USER_KEY = "nb_user";

export function useAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [hasStudioAccess, setHasStudioAccess] = useState(false);
  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
    try {
      const li = localStorage.getItem(LOGGED_IN_KEY) === "true";
      const sa = localStorage.getItem(STUDIO_ACCESS_KEY) === "true";
      const u = localStorage.getItem(USER_KEY);
      setIsLoggedIn(li);
      setHasStudioAccess(li && sa);
      setUser(u || null);
    } catch {
      setIsLoggedIn(false);
      setHasStudioAccess(false);
      setUser(null);
    }
  }, []);

  const loginDev = (username: string, password: string) => {
    const ok = username === "creator" && password === "admin";
    if (ok) {
      try {
        localStorage.setItem(LOGGED_IN_KEY, "true");
        localStorage.setItem(STUDIO_ACCESS_KEY, "true");
        localStorage.setItem(USER_KEY, username);
      } catch {}
      setIsLoggedIn(true);
      setHasStudioAccess(true);
      setUser(username);
    }
    return ok;
  };

  const setAuthState = (opts: { loggedIn: boolean; studioAccess: boolean; user?: string }) => {
    try {
      localStorage.setItem(LOGGED_IN_KEY, opts.loggedIn ? "true" : "false");
      localStorage.setItem(STUDIO_ACCESS_KEY, opts.studioAccess ? "true" : "false");
      if (opts.user) localStorage.setItem(USER_KEY, opts.user);
      if (!opts.user) localStorage.removeItem(USER_KEY);
    } catch {}
    setIsLoggedIn(opts.loggedIn);
    setHasStudioAccess(opts.loggedIn && opts.studioAccess);
    setUser(opts.user ?? null);
  };

  const logout = () => {
    try {
      localStorage.removeItem(LOGGED_IN_KEY);
      localStorage.removeItem(STUDIO_ACCESS_KEY);
      localStorage.removeItem(USER_KEY);
    } catch {}
    setIsLoggedIn(false);
    setHasStudioAccess(false);
    setUser(null);
  };

  return { isLoggedIn, hasStudioAccess, user, loginDev, setAuthState, logout };
}
