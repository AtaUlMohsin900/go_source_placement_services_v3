"use client";

import { useRouter } from "next/navigation";
import { useState, useSyncExternalStore } from "react";

const AUTH_TOKEN_KEY = "token";
const SERVER_AUTH_SNAPSHOT = "__server_auth_snapshot__";

const subscribeToAuthToken = (onStoreChange: () => void) => {
  window.addEventListener("storage", onStoreChange);
  window.addEventListener("session-storage", onStoreChange);

  return () => {
    window.removeEventListener("storage", onStoreChange);
    window.removeEventListener("session-storage", onStoreChange);
  };
};

const getAuthTokenSnapshot = () =>
  window.sessionStorage.getItem(AUTH_TOKEN_KEY);
const getServerAuthTokenSnapshot = () => SERVER_AUTH_SNAPSHOT;

const updateAuthToken = (token: string | null) => {
  if (token === null) {
    window.sessionStorage.removeItem(AUTH_TOKEN_KEY);
  } else {
    window.sessionStorage.setItem(AUTH_TOKEN_KEY, JSON.stringify(token));
  }

  window.dispatchEvent(new Event("session-storage"));
};

export const useAuth = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const tokenSnapshot = useSyncExternalStore(
    subscribeToAuthToken,
    getAuthTokenSnapshot,
    getServerAuthTokenSnapshot,
  );
  const isInitialized = tokenSnapshot !== SERVER_AUTH_SNAPSHOT;
  const isAuthenticated = isInitialized && Boolean(tokenSnapshot);

  const dummyUser = {
    email: "admin@example.com",
    password: "password",
    token: "auth-token",
  };

  const login = (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);

      if (email === dummyUser.email && password === dummyUser.password) {
        updateAuthToken(dummyUser.token);
        router.replace("/dashboard/gosource");
      } else {
        throw new Error("Invalid email or password");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    updateAuthToken(null);
    router.replace("/auth/sign-in");
  };

  return {
    login,
    logout,
    isAuthenticated,
    isInitialized,
    loading,
    error,
  };
};
