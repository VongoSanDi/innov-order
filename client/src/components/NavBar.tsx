import { Button } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

const NavBar: React.FC = () => {
  const { isAuthenticated } = useAuth()
  const location = useLocation()
  return (
    <>
      <nav className="navbar">
        <Button component={Link} to="/">Home</Button>
        {(isAuthenticated && location.pathname === "/") && <Button component={Link} to="/food-facts">Search</Button>}
        {isAuthenticated ? (
          <Button component={Link} to="/logout">Logout
          </Button>) : (<Button component={Link} to="/login">Login</Button>)}
        {!isAuthenticated && <Button component={Link} to="/register">Register</Button>}
        {isAuthenticated && <Button component={Link} to="/profil">Edit Profil</Button>}
      </nav>
    </>
  );
}

export default NavBar;
