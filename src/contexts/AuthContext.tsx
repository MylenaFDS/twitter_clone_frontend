import { createContext } from "react";

export interface AuthContextType {
  isAuthenticated: boolean;
  loginUser: (token: string) => void;
  logoutUser: () => void;
}

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType
);
