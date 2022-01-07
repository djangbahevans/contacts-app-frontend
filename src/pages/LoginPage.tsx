import { Box, Button, Grid, TextField, Typography } from "@mui/material"
import { useState } from "react"

const LoginPage = () => {
    let [email, setEmail] = useState("")
    let [password, setPassword] = useState("")
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
                                let formBody: any = [];
                                formBody.push(`${encodeURIComponent("username")}=${encodeURIComponent(email)}`)
                                formBody.push(`${encodeURIComponent("password")}=${encodeURIComponent(password)}`)
                                formBody = formBody.join('&')

                                try {
                                    const response = await fetch('http://127.0.0.1:8000/login', {
                                        method: 'post',
                                        mode: 'cors',
                                        headers: {
                                            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
                                        },
                                        body: formBody
                                    })
                                    const data = await response.json()
                                    if (data.access_token) localStorage.setItem("token", data.access_token)
                                    else setError(data.detail)
                                } catch (e: any) {
                                    setError(e.message)
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
