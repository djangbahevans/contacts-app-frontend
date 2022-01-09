import { Box, Button, Grid, TextField, Typography } from "@mui/material"
import { useState } from "react"
import { useAuth } from "../contexts"

const LoginPage = () => {
    let [email, setEmail] = useState<string>("")
    let [password, setPassword] = useState<string>("")
    let [error, setError] = useState<string>("")

    const { login } = useAuth()

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
                            helperText={!email && "Email is required"}
                            sx={{ paddingBottom: '10px' }}
                            onChange={(e) => { setEmail(e.target.value) }}
                            error={!email}
                            autoComplete="email"
                            required
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Password"
                            variant="outlined"
                            type="password"
                            helperText={!password && "Password is required"}
                            sx={{ paddingBottom: '10px' }}
                            onChange={(e) => { setPassword(e.target.value) }}
                            error={!password}
                            autoComplete="current-password"
                            required
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            variant="contained"
                            disabled={!email || !password}
                            onClick={async () => {
                                if (!email)
                                    return
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
                        <Button sx={{ marginTop: '5px' }} variant="text" fullWidth>Don't have an account?</Button>
                    </Grid>
                </Grid>
            </Box>
        </div>
    )
}

export { LoginPage }
