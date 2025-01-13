import { useCallback } from "react";

export const useSessionStorage = () => {
  const saveToken = useCallback((token: string) => {
    sessionStorage.setItem("authToken", token);
  }, []);

  const getToken = useCallback((): string | null => {
    return sessionStorage.getItem("authToken");
  }, []);

  const removeToken = useCallback(() => {
    sessionStorage.removeItem("authToken");
  }, []);

  const saveSession = useCallback((key: string, data: any) => {
    sessionStorage.setItem(key, JSON.stringify(data));
  }, []);

  const getSession = useCallback((key: string) => {
    const data = sessionStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  }, []);

  const removeSession = useCallback((key: string) => {
    sessionStorage.removeItem(key);
  }, []);

  return {
    saveSession,
    getSession,
    removeSession,
    getToken,
    saveToken,
    removeToken,
  };
};
