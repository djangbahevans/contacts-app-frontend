import { Alert, Backdrop, Box, Button, CircularProgress, Grid, Paper, Snackbar, TextField, Typography } from "@mui/material"
import { useState } from "react"
import { useMutation } from "react-query"
import { useAuth } from "../contexts"
import { createUser } from "../services/api"
import { IError } from "../utils/sharedInterfaces"
const approve = require("approvejs")

const SignupPage = () => {
  const [firstName, setFirstName] = useState("")
  const [firstNameError, setFirstNameError] = useState("")
  const [lastName, setLastName] = useState("")
  const [lastNameError, setLastNameError] = useState("")
  const [email, setEmail] = useState("")
  const [emailError, setEmailError] = useState("")
  const [password, setPassword] = useState("")
  const [passwordError, setPasswordError] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [confirmPasswordError, setConfirmPasswordError] = useState("")
  const [error, setError] = useState("")

  const { login } = useAuth()

  const validateFirstName = () => {
    const rules = { title: 'First name', required: true }
    const result = approve.value(firstName, rules)
    let value: string
    if (!result.approved) value = result.errors[0]
    else value = ""
    setFirstNameError(value)
    return value
  }

  const validateLastName = () => {
    const rules = { title: 'Last name', required: true }
    const result = approve.value(lastName, rules)
    let value: string
    if (!result.approved) value = result.errors[0]
    else value = ""
    setLastNameError(value)
    return value
  }

  const validateEmail = () => {
    const rules = { title: 'Email', required: true, email: true }
    const result = approve.value(email, rules)
    let value: string
    if (!result.approved) value = result.errors[0]
    else value = ""
    setEmailError(value)
    return value
  }

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

  const mutation = useMutation(createUser, { onSuccess: () => { login({email, password}) } })

  return (
    <div style={{ position: 'relative', height: '100vh' }}>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={mutation.isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Box sx={{
        maxWidth: '400px',
        minWidth: '250px',
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)'
      }}><Paper sx={{ padding: 3 }}>
          <Typography align="center" variant="h5" sx={{ paddingBottom: '10px' }}>
            Sign up
          </Typography>
          <Grid spacing={1} container>
            <Grid item xs={12}>
              <Typography color="error">{error}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="First name"
                variant="outlined"
                type="text"
                helperText={firstNameError}
                onChange={e => { setFirstName(e.target.value) }}
                error={!!firstNameError}
                autoComplete="given-name"
                onBlur={validateFirstName}
                required
                fullWidth />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Last name"
                variant="outlined"
                type="text"
                helperText={lastNameError}
                onChange={e => setLastName(e.target.value)}
                error={!!lastNameError}
                autoComplete="family-name"
                onBlur={validateLastName}
                required
                fullWidth />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                label="Email"
                variant="outlined"
                type="email"
                helperText={emailError}
                onChange={(e) => { setEmail(e.target.value) }}
                error={!!emailError}
                autoComplete="email"
                onBlur={validateEmail}
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="New Password"
                variant="outlined"
                type="password"
                helperText={passwordError}
                onChange={(e) => { setPassword(e.target.value) }}
                error={!!passwordError}
                autoComplete="new-password"
                onBlur={validatePassword}
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Confirm Password"
                variant="outlined"
                type="password"
                helperText={confirmPasswordError}
                onChange={(e) => { setConfirmPassword(e.target.value) }}
                error={!!confirmPasswordError}
                autoComplete="new-password"
                onBlur={validatePasswordConfirm}
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <Button
                variant="contained"
                onClick={async () => {
                  const firstNameError = validateFirstName()
                  const lastNameError = validateLastName()
                  const emailError = validateEmail()
                  const passwordError = validatePassword()
                  const confirmPasswordError = validatePasswordConfirm()
                  if (firstNameError || lastNameError || emailError || passwordError || confirmPasswordError) return

                  if (password !== confirmPassword) return setError("Passwords do not match")

                  mutation.mutateAsync({
                    firstname: firstName,
                    lastname: lastName,
                    email,
                    password
                  })

                }}
                fullWidth>
                Create account
              </Button>
            </Grid>
          </Grid>
        </Paper>
        <Button href="/login" sx={{ marginTop: 1 }} variant="text" fullWidth>Already have an account?</Button>
      </Box>
      <Snackbar autoHideDuration={6000} open={mutation.isError} onClose={() => { mutation.reset() }}>
        <Alert severity="error" sx={{ width: '100%' }} onClose={() => { mutation.reset() }}>
          {mutation.error ? (mutation.error as IError).detail : ""}
        </Alert>
      </Snackbar>
    </div >
  )
}

export { SignupPage }
