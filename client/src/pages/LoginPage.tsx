import { useAuth } from "@/context/AuthContext";
import { useHandleChangeFactory } from "@/hooks/useFormHooks";
import { Container, Box, Typography, TextField, Button } from "@mui/material";
import Grid from '@mui/material/Grid2'
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const style = {
  color: 'red',
  textAlign: 'center'
}

const LoginPage: React.FC = () => {
  const handleChange = useHandleChangeFactory()
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login, error } = useAuth(); // Utilisez le contexte d'authentification
  const navigate = useNavigate(); // Pour la redirection après connexion

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await login(username, password)
    if (success) {
      navigate('/food-facts')
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box sx={{ mt: 8, display: "flex", flexDirection: "column", alignItems: "center" }}>
        <Typography component="h1" variant="h5">Login in into your account</Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid size={12}>
              <TextField required fullWidth id="username" label="Username" name="username" variant="filled" value={username} onChange={handleChange(setUsername)} />
            </Grid>
            <Grid size={12}>
              <TextField required fullWidth id="password" label="Password" type="password" name="password" variant="filled" value={password} onChange={handleChange(setPassword)} />
            </Grid>
          </Grid>
          <Button type="submit" fullWidth variant="contained" disabled={username.length < 1 || password.length < 1} sx={{ mt: 3, mb: 2 }}>
            Log in
          </Button>
          {error && <Typography sx={style}>{error}</Typography>}
          <Link to="/register">Create an account</Link>
        </Box>
      </Box>
    </Container>
  )
}

export default LoginPage
