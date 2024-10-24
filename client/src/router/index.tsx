import RegisterPage from "@/pages/RegisterPage";
import LoginPage from "@/pages/LoginPage";
import { createBrowserRouter, Navigate, Outlet } from "react-router-dom";
import Recherche from '@/pages/Recherche';
import App from '@/App';
import Logout from '@/pages/LogoutPage';
import { useAuth } from '@/context/AuthContext';
import ProfilPage from '@/components/ProfilPage';

const ProtectedLayout = () => {
  const { isAuthenticated } = useAuth()

  if (!isAuthenticated) return <Navigate to="/login" replace />
  return <Outlet />
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        element: <ProtectedLayout />, // All pages are children of the protected route
        children: [
          {
            index: true,
            element: <Navigate to="/food-facts" replace />
          },
          {
            path: "food-facts",
            element: <Recherche />
          },
          {
            path: 'logout',
            element: <Logout />,
          },
        ]
      },
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: "register",
        element: <RegisterPage />,
      },
      {
        path: 'profil',
        element: <ProfilPage />,
      }
    ]
  },
]);

export default router;

