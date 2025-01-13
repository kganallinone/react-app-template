import { createContext, useState, ReactNode, useEffect } from "react";
import { User } from "../models/userModels";
import { UserService } from "../services/userService";
import { CONNECTION } from "../config/config";

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

interface AuthProviderProps {
  children: ReactNode;
}

// const SERVICE_ACCOUNT_EMAIL =
//   import.meta.env.VITE_PISARA_BOOKING_APP_SERVICE_ACCOUNT_EMAIL ||
//   APP_ACCOUNT;
// const SERVICE_ACCOUNT_PASSWORD =
//   import.meta.env.VITE_PISARA_BOOKING_APP_SERVICE_ACCOUNT_PASSWORD || "";

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const userService = new UserService();

  useEffect(() => {
    if (loading) {
      setLoading(false);
    } else {
      (async () => {
        try {
          const response = await userService.login({
            email: CONNECTION.APP,
          });

          const { token: newToken } = response;

          if (newToken) {
          }
        } catch (error) {
          console.error("Error during service account login:", error);
        } finally {
          setLoading(false);
        }
      })();
    }
  }, []);

  useEffect(() => {
    isCurrentUser();
  }, []);

  const isCurrentUser = async () => {
    try {
      const result = await getCurrentUser();
      setUser(result.user);
      setToken(result.token);
    } catch (error) {
      setUser(null);
      setToken(null);
    }
  };

  const getCurrentUser = async () => {
    try {
      const result = await userService.currentUser();
      return result;
    } catch (error) {
      console.error("Get current user failed:", error);
      return null;
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await userService.login({ email, password });
      const { user: loggedInUser, token: newToken } = response;

      if (loggedInUser && newToken) {
        setUser(loggedInUser);
        setToken(newToken);

        return true;
      } else {
        console.error("Login failed: User or token is missing");
        return false;
      }
    } catch (error) {
      console.error("Error during login:", error);
      return false;
    }
  };

  const logout = async () => {
    if (!token) return;
    try {
      await userService.logout();
    } catch (error) {
      console.error("Error during logout:", error);
    } finally {
      setUser(null);
      setToken(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
