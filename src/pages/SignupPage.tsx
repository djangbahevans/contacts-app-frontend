import { Box, Button, Grid, TextField, Typography } from "@mui/material"
import { useState } from "react"

const SignupPage = () => {
    let [firstName, setFirstName] = useState("")
    let [lastName, setLastName] = useState("")
    let [email, setEmail] = useState("")
    let [password, setPassword] = useState("")
    let [confirmPassword, setConfirmPassword] = useState("")
    let [error, setError] = useState("")

    return (
        <div style={{ position: 'relative', height: '100vh' }}>
            <Box sx={{
                width: '400px',
                position: 'absolute',
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)'
            }}>
                <Typography variant="h5" sx={{ paddingBottom: '10px' }}>
                    Sign up
                </Typography>
                <Grid spacing={1} container>
                    <Grid item xs={12}>
                        <Typography color="error">{error}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            label="First name"
                            variant="outlined"
                            type="text"
                            helperText={!firstName && "First name is required"}
                            onChange={e => { setFirstName(e.target.value) }}
                            error={!firstName}
                            autoComplete="given-name"
                            required
                            fullWidth />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            label="Last name"
                            variant="outlined"
                            type="text"
                            helperText={!lastName && "Last name is required"}
                            onChange={e => setLastName(e.target.value)}
                            error={!lastName}
                            autoComplete="family-name"
                            required
                            fullWidth />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Email"
                            variant="outlined"
                            type="email"
                            helperText={!email && "Email is required"}
                            onChange={(e) => { setEmail(e.target.value) }}
                            error={!email}
                            autoComplete="email"
                            required
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            label="Password"
                            variant="outlined"
                            type="password"
                            helperText={!password && "Password is required"}
                            onChange={(e) => { setPassword(e.target.value) }}
                            error={!password}
                            autoComplete="new-password"
                            required
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            label="Confirm Password"
                            variant="outlined"
                            type="password"
                            helperText={!confirmPassword && "Password is required"}
                            onChange={(e) => { setConfirmPassword(e.target.value) }}
                            error={!password}
                            autoComplete="new-password"
                            required
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            variant="contained"
                            disabled={!firstName || !lastName || !email || !password || !confirmPassword}
                            onClick={async () => {
                                if (!firstName || !lastName || !email || !password || !confirmPassword) return

                                if (password !== confirmPassword) return setError("Passwords do not match")

                                try {
                                    const response = await fetch(`${process.env.REACT_APP_API_URL}/users`, {
                                        method: 'post',
                                        mode: 'cors',
                                        headers: {
                                            'Content-Type': 'application/json;charset=UTF-8'
                                        },
                                        body: JSON.stringify({
                                            firstname: firstName,
                                            lastname: lastName,
                                            email,
                                            password
                                        })
                                    })
                                    const data = await response.json()
                                    if (response.status !== 201) setError(data.detail)
                                } catch (e: any) {
                                    setError(e.message)
                                }
                            }}
                            fullWidth>
                            Login
                        </Button>
                        <Button href="/login" sx={{ marginTop: '5px' }} variant="text" fullWidth>Already have an account?</Button>
                    </Grid>
                </Grid>
            </Box>
        </div>
    )
}

export { SignupPage }
