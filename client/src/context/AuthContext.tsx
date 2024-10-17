import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { authProvider } from "@/apis/auth";
import { User } from "@/types";

interface AuthContextType {
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<boolean>
  logout: () => void
  error: string | null;
  register: (username: string, password: string) => Promise<boolean>;
  user: User | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!localStorage.getItem('token'))
  const [error, setError] = useState<string | null>(null)
  const [user, setUser] = useState<User | null>(null)

  // We check at te start of the app if the user is already logged in
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) localStorage.removeItem('token')
  }, []);

  const login = async (username: string, password: string) => {
    try {
      const result = await authProvider.signIn(username, password)
      setIsAuthenticated(true);
      setUser(result.data.user)
      setError(null)
      return true
    } catch (e: any) {
      setError(e.message)
      return false
    }
  }

  const logout = () => {
    try {
      authProvider.signOut()
      setIsAuthenticated(false);
      setUser(null)
      setError(null)
    } catch (e: any) {
      setError(e.message)
    }
  }

  const register = async (username: string, password: string) => {
    try {
      const result = await authProvider.createUser(username, password)
      if (result.statusCode === 201) {
        setError(null)
        return true
      } else {
        setError(result.message)
        return false
      }
    } catch (e: any) {
      setError(e.message)
      return false
    }
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, error, register, user }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('Issue with the auth context')
  return context;
}
