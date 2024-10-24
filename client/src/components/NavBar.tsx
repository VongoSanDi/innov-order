import { Button } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

const NavBar: React.FC = () => {
  const { isAuthenticated } = useAuth()
  const location = useLocation()
  return (
    <>
      <nav className="navbar">
        {(isAuthenticated && location.pathname === "/") && <Button component={Link} to="/food-facts">Search</Button>}
        {isAuthenticated && (
          <Button component={Link} to="/logout">Logout
          </Button>)}
        {!isAuthenticated && <Button component={Link} to="/register">Register</Button>}
        {isAuthenticated && <Button component={Link} to="/profil">Edit Profil</Button>}
      </nav>
    </>
  );
}

export default NavBar;
