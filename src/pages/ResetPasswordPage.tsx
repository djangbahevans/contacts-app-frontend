import { KeyboardBackspace } from "@mui/icons-material"
import { AlertTitle, Alert, Box, Button, Grid, Paper, TextField, Typography } from "@mui/material"
import { useState } from "react"
const approve = require("approvejs")

const ResetPasswordPage = () => {
  const [password, setPassword] = useState("")
  const [passwordError, setPasswordError] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [confirmPasswordError, setConfirmPasswordError] = useState("")
  const [error, setError] = useState("")

  const queryParams = new URLSearchParams(window.location.search)
  const user_id = queryParams.get("user_id")
  const token = queryParams.get("token")

  const validatePassword = () => {
    const rules = { title: 'Password', required: true, equal: { value: confirmPassword, field: 'Confirm password', message: 'Passwords do not match' }, stop: true }
    const result = approve.value(password, rules)
    let value: string
    if (!result.approved) value = result.errors[0]
    else value = ""
    setPasswordError(value)
    return value
  }

  const validatePasswordConfirm = () => {
    const rules = { title: 'Confirm password', required: true, equal: { value: password, field: 'Password', message: 'Passwords do not match' }, stop: true }
    const result = approve.value(confirmPassword, rules)
    let value: string
    if (!result.approved) value = result.errors[0]
    else value = ""
    setConfirmPasswordError(value)
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
      }}><Paper sx={{ padding: 3 }}>
          <Typography align="center" variant="h5" sx={{ paddingBottom: '10px' }}>
            Change password
          </Typography>
          <Grid spacing={1} container>
            <Grid item xs={12}>
              <Typography align="center" color="error">{error}</Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="New Password"
                variant="outlined"
                type="password"
                helperText={passwordError}
                onChange={e => { setPassword(e.target.value) }}
                error={!!passwordError}
                autoComplete="new-password"
                onBlur={validatePassword}
                required
                fullWidth />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Re-enter Your New Password"
                variant="outlined"
                type="password"
                helperText={confirmPasswordError}
                onChange={e => setConfirmPassword(e.target.value)}
                error={!!confirmPasswordError}
                autoComplete="new-password"
                onBlur={validatePasswordConfirm}
                required
                fullWidth />
            </Grid>
            <Grid item xs={12} sm={12}>
              <Button
                variant="contained"
                onClick={async () => {
                  const passwordError = validatePassword()
                  const confirmPasswordError = validatePasswordConfirm()
                  if (passwordError || confirmPasswordError) return

                  if (password !== confirmPassword) return setError("Passwords do not match")

                  try {
                    const response = await fetch(`${process.env.REACT_APP_API_URL}/users/${user_id}/reset-password`, {
                      method: 'put',
                      mode: 'cors',
                      headers: {
                        'Content-Type': 'application/json;charset=UTF-8'
                      },
                      body: JSON.stringify({
                        password,
                        token
                      })
                    })
                    const data = await response.json()
                    if (response.status !== 200) setError(data.detail)
                    else {
                        setError(data.data)
                    }
                  } catch (e: any) {
                    setError(e.message)
                  }
                }}
                fullWidth>
                Change password
              </Button>
            </Grid>
          </Grid>
        </Paper>
        <Button href="/login" sx={{ marginTop: 1 }} variant="text" fullWidth>{<KeyboardBackspace />} Back to login page?</Button>
      </Box>
      {/* <Alert sx={{ bottom: 0 }} onClose={() => { }}>
        <AlertTitle>Success</AlertTitle>
        Password changed successfully
      </Alert> */}
    </div >
  )
}

export { ResetPasswordPage }
