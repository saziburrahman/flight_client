import Cookies from "js-cookie";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { AUTH_API } from "../api";

const VITE_JWT_TOKEN_KEY = import.meta.env.VITE_JWT_TOKEN_KEY || "";
const VITE_AUTH_USER_KEY = import.meta.env.VITE_AUTH_USER_KEY || "";
const USER_TYPE = import.meta.env.VITE_AUTH_USER_TYPE || "";

// initial state
const initialState: IAuthContext = {
  isLoading: true,
  auth: undefined,
  register: () => undefined,
  login: () => undefined,
  logout: () => undefined,
  updateAuth: () => undefined,
  refreshAuth: async () => undefined,
};
// create context
export const AuthContext = createContext(initialState);

// auth provider
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [auth, setAuth] = useState<IAuth>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // registration
  const register = async (data: object) => {
    const response = await AUTH_API.registration({
      ...data,
      type: USER_TYPE,
    });
    if (response && response?.type.includes(USER_TYPE)) {
      Cookies.set(VITE_JWT_TOKEN_KEY, response?.token);
      await refreshAuth();
      window.location.reload();
    }
    setIsLoading(false);
    return;
  };

  // login
  const login = async (body: object) => {
    const response = await AUTH_API.login(body);

    if (response && response?.token) {
      Cookies.set(VITE_JWT_TOKEN_KEY, response?.token);
      await refreshAuth();
    }
    setIsLoading(false);
    return;
  };

  // logout
  const logout = () => {
    setAuth(undefined);
    Cookies.remove(VITE_AUTH_USER_KEY);
    window.location.reload();
  };

  // updateAuth
  const updateAuth = (newAuth: IAuth) => {
    Cookies.set(VITE_AUTH_USER_KEY, JSON.stringify(newAuth));
    setAuth(newAuth);
  };

  // refreshAuth
  const refreshAuth = async () => {
    const data = await AUTH_API.getProfile();
    if (data) {
      const user: IAuth = {
        ...data,
        // fullName: data?.fullName,
        // mobileNumber: data.mobileNumber,
        role: data?.role,
        email: data?.email,
      };
      setAuth(user);
      Cookies.set(VITE_AUTH_USER_KEY, JSON.stringify(user));
    } else {
      toast.error("Invalid User");
    }
  };

  useEffect(() => {
    const currentUser = Cookies.get(VITE_AUTH_USER_KEY);
    if (currentUser) {
      const _auth = JSON.parse(currentUser) as IAuth;
      setAuth(_auth);
    }
    setIsLoading(false);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        auth,
        isLoading,
        register,
        login,
        logout,
        refreshAuth,
        updateAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
