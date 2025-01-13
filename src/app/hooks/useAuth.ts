import { useEffect, useState } from "react";
import { useCookie } from "../utils/useCookie";
import { UserService } from "../services/userService";
import { useLocalStorage } from "../utils/useLocalStorage";

interface Auth {
  isAuthenticated?: boolean;
  token: string | null;
  user: any;
}

export const useAuth = (): {
  auth: Auth;
  Login: (email: string, password: string) => Promise<Auth | undefined>;
  Register: (data: any) => Promise<any | null>;
  getUser: (id: string) => Promise<any | null>;
  Logout: () => Promise<any | null>;
  findUser: (searchKey: string) => Promise<any | null>;
  getCurrentUser: () => Promise<any | null>;
  isAuthenticated: boolean;
} => {
  const { setCookie } = useCookie();
  const { removeLocal } = useLocalStorage();
  const userService = new UserService();
  const [auth, setAuth] = useState<Auth>({
    isAuthenticated: false,
    token: null,
    user: null,
  });
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    isCurrentUser();
  }, []);

  const isCurrentUser = async () => {
    try {
      const result = await getCurrentUser();
      setIsAuthenticated(result ? true : false);
      // console.log(result);
      setAuth({
        isAuthenticated: result ? true : false,
        token: result.token,
        user: result.user,
      });
    } catch (error) {
      setIsAuthenticated(false);
      setAuth({ isAuthenticated: false, token: null, user: null });
    }
  };

  const Login = async (
    email: string,
    password: string
  ): Promise<Auth | undefined> => {
    try {
      const credentials = { email, password };
      const result: any = await userService.login(credentials);

      if (result && result.token && result.user) {
        const newAuth: Auth = {
          isAuthenticated: true,
          token: result.token,
          user: result.user,
        };
        setAuth(newAuth);
        setCookie("token", result.token);

        return newAuth;
      } else {
        console.error("Invalid credentials");
        setAuth({ isAuthenticated: false, token: null, user: null });
        return undefined;
      }
    } catch (error) {
      console.error("Login failed:", error);
      setAuth({ isAuthenticated: false, token: null, user: null });
      setCookie("token", "");
      return undefined;
    }
  };

  const Register = async (data: any) => {
    try {
      const result = await userService.register(data);
      return result;
    } catch (error) {
      console.error("Register failed:", error);
      return null;
    }
  };

  const Logout = async () => {
    try {
      const result: any = await userService.logout();
      console.log(result);
      if (result) {
        setAuth({ isAuthenticated: false, token: null, user: null });
        setCookie("token", "");
        removeLocal("auth");
        isCurrentUser();
        return result;
      }
    } catch (error) {
      console.error("Logout failed:", error);
      return null;
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

  const getUser = async (id: string) => {
    try {
      const result = await userService
        .select(["id", "firstname", "email"])
        .get(id);
      return result;
    } catch (error) {
      console.error("Get user failed:", error);
      return null;
    }
  };

  const findUser = async (searchKey: any) => {
    try {
      const result = await userService.search(searchKey);
      return result;
    } catch (error) {
      console.error("Find user failed:", error);
      return null;
    }
  };

  return {
    auth,
    Login,
    Register,
    getUser,
    Logout,
    findUser,
    getCurrentUser,
    isAuthenticated,
  };
};
