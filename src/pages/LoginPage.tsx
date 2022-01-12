import { Box, Button, Grid, TextField, Typography } from "@mui/material"
import { useState } from "react"
import { useAuth } from "../contexts"
const approve = require("approvejs")

const LoginPage = () => {
  const [email, setEmail] = useState<string>("")
  const [emailError, setEmailError] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [passwordError, setPasswordError] = useState<string>("")
  const [error, setError] = useState<string>("")

  const { login } = useAuth()

  const validateEmail = () => {
    const rules = { required: true, email: true }
    const result = approve.value(email, rules)
    let value: string
    if (!result.approved) value = `Email ${result.errors[0]}`
    else value = ""
    setEmailError(value)
    return value
  }

  const validatePassword = () => {
    const rules = { required: true }
    const result = approve.value(password, rules)
    let value: string
    if (!result.approved) value = `Password ${result.errors[0]}`
    else value = ""
    setPasswordError(value)
    return value
  }

  return (
    <div style={{ position: 'relative', height: '100vh' }}>
      <Box sx={{
        maxWidth: '400px',
        minWidth: '250px',
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)'
      }}>
        <Typography variant="h5" sx={{ paddingBottom: '10px' }}>
          Log In
        </Typography>
        <Grid container>
          <Grid item xs={12}>
            <Typography color="error">{error}</Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Email"
              variant="outlined"
              type="email"
              helperText={emailError}
              sx={{ paddingBottom: '10px' }}
              onChange={(e) => { setEmail(e.target.value) }}
              error={!!emailError}
              autoComplete="email"
              onBlur={validateEmail}
              required
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Password"
              variant="outlined"
              type="password"
              helperText={passwordError}
              sx={{ paddingBottom: '10px' }}
              onChange={(e) => { setPassword(e.target.value) }}
              error={!!passwordError}
              autoComplete="current-password"
              onBlur={validatePassword}
              required
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              onClick={async () => {
                const emailError = validateEmail()
                const passwordError = validatePassword()
                if (passwordError || emailError) return

                try {
                  const { access_token } = await login(email, password)
                  localStorage.setItem("access_token", access_token)
                } catch (error: any) {
                  setError(error.detail)
                }
              }}
              fullWidth>
              Login
            </Button>
            <Button href="/signup" sx={{ marginTop: '5px' }} variant="text" fullWidth>Don't have an account?</Button>
          </Grid>
        </Grid>
      </Box>
    </div>
  )
}

export { LoginPage }
