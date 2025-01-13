// useAsyncFetch.ts
import { useLocalStorage } from "./useLocalStorage";

type AsyncFetchProps = {
  get: (url: string, init?: RequestInit) => Promise<any>;
  post: (url: string, init?: RequestInit) => Promise<any>;
  put: (url: string, init?: RequestInit) => Promise<any>;
  patch: (url: string, init?: RequestInit) => Promise<any>;
  delete: (url: string, init?: RequestInit) => Promise<any>;
};

export const useAsyncFetch = (): AsyncFetchProps => {
  const { getLocal } = useLocalStorage();

  const methods = ["get", "post", "put", "patch", "delete"] as const;

  const asyncFetch = methods.reduce((acc, method) => {
    return {
      ...acc,
      [method]: async (url: string, init: RequestInit = {}) => {
        const auth = getLocal("auth");
        const headers = auth?.token
          ? {
              Authorization: `Bearer ${auth.token}`,
              ...init.headers,
            }
          : {
              ...init.headers,
            };

        const response = await fetch(url, {
          ...init,
          method: method.toUpperCase(),
          headers,
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
      },
    };
  }, {} as AsyncFetchProps);

  return asyncFetch;
};
