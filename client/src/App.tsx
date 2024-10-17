import React from "react";
import { Outlet } from "react-router-dom";
import { NavBar } from "./components";
import { AuthProvider } from "./context/AuthContext";
import { ErrorProvider } from "./context/ErrorContext";
import ErrorModal from "./components/ErrorModal";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <ErrorProvider>
        <NavBar />
        <Outlet />
        <ErrorModal />
      </ErrorProvider>
    </AuthProvider>
  );
};

export default App;
