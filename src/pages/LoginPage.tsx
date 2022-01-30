import { Box, Button, Divider, Grid, Paper, TextField, Typography } from "@mui/material"
import { useState } from "react"
import { useAuth } from "../contexts"
const approve = require("approvejs")

const LoginPage = () => {
  const [email, setEmail] = useState<string>("")
  const [emailError, setEmailError] = useState<string>("")
  const [forgotEmail, setForgotEmail] = useState<string>("")
  const [forgotEmailError, setForgotEmailError] = useState<string>("")
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

  const validateForgotEmail = () => {
    const rules = { required: true, email: true }
    const result = approve.value(forgotEmail, rules)
    let value: string
    if (!result.approved) value = `Email ${result.errors[0]}`
    else value = ""
    setForgotEmailError(value)
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
        <Paper sx={{ padding: 3 }}>
          <Typography align="center" variant="h5" sx={{ paddingBottom: 2 }}>
            Log In
          </Typography>
          <Grid container>
            <Grid item xs={12}>
              <Typography color="error" paragraph>{error}</Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Email"
                variant="outlined"
                type="email"
                helperText={emailError}
                sx={{ paddingBottom: 2 }}
                onChange={(e) => { setEmail(e.target.value) }}
                value={email}
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
                sx={{ paddingBottom: 2 }}
                onChange={(e) => { setPassword(e.target.value) }}
                value={password}
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
                    await login(email, password)
                    // localStorage.setItem("access_token", access_token)
                  } catch (error: any) {
                    setError(error.detail)
                  }
                }}
                fullWidth>
                Login
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Divider sx={{ marginTop: 2, marginBottom: 2 }} />
            </Grid>
            <Grid item xs={12}>
              <Typography align="center" sx={{ color: 'rgba(0, 0, 0, 0.6)', paddingBottom: 2 }}>
                Forgot your password?
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Enter your email address"
                variant="outlined"
                type="email"
                helperText={forgotEmailError}
                sx={{ paddingBottom: 2 }}
                onChange={(e) => { setForgotEmail(e.target.value) }}
                value={forgotEmail}
                error={!!forgotEmailError}
                autoComplete="email"
                onBlur={validateForgotEmail}
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                sx={{ marginTop: 1 }}
                variant="outlined"
                onClick={async () => {
                  const error = validateForgotEmail()
                  if (error) return

                  try {
                    const response = await fetch(`${process.env.REACT_APP_API_URL}/forgot-password`, {
                      method: 'post',
                      mode: 'cors',
                      headers: {
                        'Content-Type': 'application/json;charset=UTF-8'
                      },
                      body: JSON.stringify({
                        email: forgotEmail
                      })
                    })
                    const data = await response.json()
                    console.log(data.data)
                    if (response.status !== 200) setError(data.detail)
                    else setError(data.data)
                  } catch (error: any) {
                    setError(error.message)
                  }
                }}
                fullWidth>
                Reset my password</Button>
            </Grid>
          </Grid>
        </Paper>
        <Button sx={{ marginTop: 1 }} href="/signup" variant="text" fullWidth>Don't have an account?</Button>
      </Box>
    </div>
  )
}

export { LoginPage }
