import { useAuth } from "@/context/AuthContext"
import { useHandleChangeFactory } from "@/hooks/useFormHooks"
import { TextField, Button, Container, Typography, Box } from "@mui/material"
import Grid from "@mui/material/Grid2"
import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

const style = {
  color: 'red',
  textAlign: 'center'
}

const RegisterPage: React.FC = () => {
  const handleChange = useHandleChangeFactory()
  const [username, setUsername] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const navigate = useNavigate()
  const { register, error } = useAuth()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const success = await register(username, password)
    if (success) {
      navigate("/")
    }
  }

  const isFormValid = username.length > 0 && password.length > 0

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Create an account
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid size={12}>
              <TextField required fullWidth id="username" label="Username" name="username" variant="filled" value={username} onChange={handleChange(setUsername)} />
            </Grid>
            <Grid size={12}>
              <TextField required fullWidth id="password" label="Password" type="password" name="password" variant="filled" value={password} onChange={handleChange(setPassword)}
              />
            </Grid>
          </Grid>
          <Button type="submit" fullWidth variant="contained" disabled={!isFormValid} sx={{ mt: 3, mb: 2 }}>
            Register
          </Button>
          {error && <Typography sx={style}>{error}</Typography>}
          <Link to='/'>Already got an account ?</Link>
        </Box>
      </Box>
    </Container>
  )
}

export default RegisterPage
