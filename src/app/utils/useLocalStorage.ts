import { useCallback } from "react";

export const useLocalStorage = () => {
  const saveLocal = useCallback((key: string, data: any) => {
    localStorage.setItem(key, JSON.stringify(data));
  }, []);

  const getLocal = useCallback((key: string) => {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  }, []);

  const removeLocal = useCallback((key: string) => {
    localStorage.removeItem(key);
  }, []);

  return {
    saveLocal,
    getLocal,
    removeLocal,
  };
};
