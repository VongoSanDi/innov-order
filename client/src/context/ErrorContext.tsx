import { createContext, ReactNode, useContext, useState } from "react";

interface ErrorContextType {
  error: string | null;
  setError: (error: string | null) => void
}

const ErrorContext = createContext<ErrorContextType | undefined>(undefined)

export const ErrorProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [error, setError] = useState<string | null>(null)

  return (
    <ErrorContext.Provider value={{ error, setError }}>
      {children}
    </ErrorContext.Provider>
  )
}

export const useError = () => {
  const context = useContext(ErrorContext);
  if (!context) throw new Error('Issue with error context')
  return context
}
