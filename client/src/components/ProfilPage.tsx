import { Box, Button, Container, TextField, Typography } from "@mui/material"
import Grid from '@mui/material/Grid2'
import React, { useState } from "react"
import { editProfil } from '@/apis/user'
import { useAuth } from "@/context/AuthContext"
import { useHandleChangeFactory } from "@/hooks/useFormHooks"

const ProfilPage: React.FC = () => {
  const handleChange = useHandleChangeFactory()
  const [username, setUsername] = useState("")
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const { user } = useAuth()
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const credentials = { username: username, currentPassword: currentPassword, newPassword: newPassword }
      await editProfil(credentials)
    } catch (e) {
    }
  }

  const isFormValid = username.length > 0 && currentPassword.length > 0 && newPassword.length > 0

  return (
    <Container component="main" maxWidth="xs">
      <Box sx={{ mt: 8, display: "flex", flexDirection: "column", alignItems: "center" }}>
        <Typography component="h1" variant="h5">Edit your profile</Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid size={12}>
              <TextField required fullWidth id="username" label="Username" name="username" variant="filled" value={username} onChange={handleChange(setUsername)} />
            </Grid>
            <Grid size={12}>
              <TextField required fullWidth id="password" label="Current password" type="password" name="password" variant="filled" value={currentPassword} onChange={handleChange(setCurrentPassword)} />
            </Grid>
            <Grid size={12}>
              <TextField required fullWidth id="password" label="New password" type="password" name="password" variant="filled" value={newPassword} onChange={handleChange(setNewPassword)} />
            </Grid>

          </Grid>
          <Button type="submit" fullWidth variant="contained" disabled={!isFormValid} sx={{ mt: 3, mb: 2 }}>
            Update profile
          </Button>
        </Box>
      </Box>
    </Container>

  )
}

export default ProfilPage;
