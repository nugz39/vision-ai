"use client";

import { useEffect, useState } from "react";

const AUTH_KEY = "nb_dev_logged_in";

export function useAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(localStorage.getItem(AUTH_KEY) === "1");
  }, []);

  const loginDev = (username: string, password: string) => {
    const ok = username === "creator" && password === "admin";
    if (ok) {
      localStorage.setItem(AUTH_KEY, "1");
      setIsLoggedIn(true);
    }
    return ok;
    };

  const logout = () => {
    localStorage.removeItem(AUTH_KEY);
    setIsLoggedIn(false);
  };

  return { isLoggedIn, loginDev, logout };
}
