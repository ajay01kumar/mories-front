import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';




const theme = createTheme();

export default function SignIn() {



    const {
        register,
        handleSubmit,
        
        formState: { errors },
    } = useForm();

    const navigate = useNavigate()

    const onSubmit = async (data) => {
        console.log(data)
        const body = {
            "USER_NAME": data.name,
            "PASSWORD": data.password
        }

        try {
            const response = await fetch(
                `http://localhost:5001/login`,

                {
                    method: "POST",
                    headers: {
                        // "x-access-token": token,
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(body),
                }
            );
            const result = await response.json();
            console.log(result);
            localStorage.setItem("shop-info", JSON.stringify(result));
            // localStorage.setItem("role", JSON.stringify(result.data[0].userType));
            // roleId,EsID
            if (result.status === 200) {
                navigate('/App/Dashboard');
                // const userType = result.data[0].userType;
                // setValue(userType);
                // console.log(userType);
            } else {
                alert(result.message);
            }
        } catch (error) {
            console.log(error.message);
        }

    };

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        mt: 1
                    }}
                >
                    <Grid item style={{ display: "flex", justifyContent: "center" }}>
                        {/* <img src={logo} alt="evaidya" width="150" /> */}
                    </Grid>
                    {/* <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar> */}
                    <Typography component="h1" variant="h5">
                        Log in to
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
                        <TextField

                            margin="normal"
                            required
                            fullWidth
                            id="Name"
                            label="Name Address"
                            name="name"
                            autoComplete="name"
                            autoFocus
                            {...register("name", {
                                required: "Ṇame is required",
                                // pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                            })}
                            error={Boolean(errors.Ṇame)}
                            helperText={errors.Ṇame?.message}
                        />
                        {errors.Ṇame?.required}
                        {errors?.Ṇame?.type === "pattern" && <h7 style={{ color: "red" }}>Email  only Ex:abc@gmail.com</h7>}

                        <TextField
                            margin="normal"
                            required

                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            {...register("password", {
                                required: "password is required",
                                minLength: 4,
                                // pattern: /^(0|[+91]{3})?[7-9][0-9]{9}$/,
                            })}
                            error={Boolean(errors.password)}
                            helperText={errors.password?.message}
                        />
                        {errors?.password?.type === "minLength" && (
                            <h7 style={{ color: "red" }} >password must be longer than or equal to 4 characters</h7>
                        )}
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Login In
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="/Registration" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}