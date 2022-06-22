import { Google, VisibilityOffOutlined, VisibilityOutlined } from "@mui/icons-material"
import { Button, Grid, Link, TextField, Typography, InputAdornment, IconButton, Alert } from "@mui/material"
import { Link as RouterLink } from 'react-router-dom'
//import AuthLayout from "../layout/AuthLayout"
import AuthSign from "../layout/AuthSign"
import { useForm } from "react-hook-form";
import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkingAuth, startGoogleSignIn, startSignInWithEmailAndPassword } from "../../store/auth/thunks";

//regex email
export const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

//regex password : min 8 caractères, 1 majuscule, 1 minuscule, 1 chiffre, 1 caractère spécial
export const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;


export const LoginPage = () => {

    /* const apiKey = 'AIzaSyBY81i4L_KyQHqfzZSzzXV3UcYw2vfERIs'

    //Recuperar contraseña con firebase
    const url =  `https://react-cursos-1a064.firebaseapp.com/__/auth/action?mode=action&oobCode=${oobCode}&apiKey=${apiKey}`; */

    const [showPassword, setShowPassword] = useState(false);

    const dispatch = useDispatch();

    const { status, errorMessage } = useSelector(state => state.auth)

    const isAuthenticated = useMemo(() => status === 'checking', [status])

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const onSubmit = ({ email, password }) => {
        //dispatch(checkingAuth(email, password))
        dispatch(startSignInWithEmailAndPassword(email, password))
        //reset();
    }

    const onGoogleLogin = () => {
        dispatch(startGoogleSignIn())
    }

    return (
        <AuthSign title="Sign In">
            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sx={{mt:2}}>
                        <TextField 
                            label="Email" 
                            type="email" 
                            placeholder="email@google.com"
                            fullWidth
                            {...register("email", { 
                                required: 'Email is required', 
                                pattern: {
                                    value: emailRegex,
                                    message: 'Email is not valid'
                                } 
                            })}
                            error={ errors.hasOwnProperty('email') }
                            helperText={ errors.email && errors.email.message }
                        />
                    </Grid> 
                    <Grid item xs={12}>
                        <TextField
                            label="password" 
                            type={showPassword ? 'text' : 'password'}
                            placeholder="********"
                            fullWidth
                            InputProps={{
                                endAdornment: <InputAdornment position="start">
                                    <IconButton onClick={() => setShowPassword(!showPassword)}>
                                        {showPassword ? <VisibilityOffOutlined />  : <VisibilityOutlined />}
                                    </IconButton>
                                </InputAdornment>,
                            }}
                            {...register("password", { 
                                required: 'Password is required', 
                                pattern: {
                                    value: passwordRegex,
                                    message: 'Password must be at least 8 characters, contain at least one number, one uppercase and one special character'
                                }
                            })}
                            error={ errors.hasOwnProperty('password') }
                            helperText={ errors.password && errors.password.message }
                        />
                    </Grid>

                    <Grid item xs={12} display={ !!errorMessage ? '' : 'none' }>
                        <Alert severity="error">{errorMessage}</Alert>
                    </Grid>

                    <Grid container spacing={2} sx={{ mb:2 , mx:0.1, mt:1 }}>
                        <Grid item xs={12} sm={6}>
                            <Button 
                                disabled={ isAuthenticated }
                                type="submit"
                                variant="contained" color="primary" 
                                fullWidth
                            >
                                Sign In
                            </Button>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Button 
                                disabled={ isAuthenticated }
                                onClick={ onGoogleLogin }
                                variant="contained" color="primary" 
                                fullWidth
                            >
                                <Google />
                                <Typography sx={{ml:1}}>
                                    Google
                                </Typography>
                            </Button>
                        </Grid>
                    </Grid> {/* Buttons */}
                    <Grid container sx={{ mx:3 }}>
                        <Grid item xs>
                        </Grid>
                        <Grid item>
                            <Link component={ RouterLink } to="/auth/register">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </Grid>
                </form>
        </AuthSign>
    )
}

