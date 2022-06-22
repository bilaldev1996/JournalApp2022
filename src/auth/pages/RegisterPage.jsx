import { Alert, Button, Grid, IconButton, InputAdornment, Link, TextField } from "@mui/material"
import {  useMemo, useState } from "react"
import { useForm } from "react-hook-form"
import { Link as RouterLink, useLocation } from 'react-router-dom'
import AuthSign from "../layout/AuthSign"
import { emailRegex, passwordRegex } from "./LoginPage"
import {  VisibilityOffOutlined, VisibilityOutlined } from "@mui/icons-material"
import { useDispatch, useSelector } from "react-redux"
import { startCreateUserWithEmailAndPassword } from "../../store/auth/thunks"

export const RegisterPage = () => {

    const [showPassword, setShowPassword] = useState(false);

    const dispatch = useDispatch();

    const { status, errorMessage } = useSelector(state => state.auth)

    const isCheckingAuthentication = useMemo(() => status === 'checking', [status])

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const onSubmit = ( data ) => {
        //console.log( data )
        dispatch(startCreateUserWithEmailAndPassword(data))
    }



    return (
        <AuthSign title="Sign Up">
            <form onSubmit={ handleSubmit(onSubmit) }>
                <Grid container spacing={2}>
                    <Grid item xs={12} sx={{mt:2}}>
                        <TextField
                            id="fullName"
                            label="Full Name *" 
                            type="name" 
                            placeholder="Bilal al messaoui"
                            fullWidth
                            {...register("displayName", { 
                                required: 'Name is required', 
                                pattern: {
                                    value:  /([A-Za-z]){2,}\w/, //minim length 3
                                    message: 'Name should be at least 3 characters'
                                } 
                            })}
                            error={ errors.hasOwnProperty('displayName')}
                            helperText={ errors.displayName && errors.displayName.message }
                        />
                    </Grid> 
                    <Grid item xs={12}>
                        <TextField 
                            label="Email *" 
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
                    <Grid item  xs={12} sx={{mt:1}}>
                        <TextField 
                            id="outlined-adornment-password"
                            label="Password *" 
                            type={showPassword ? 'text' : 'password'}
                            placeholder="********"
                            fullWidth
                            InputProps={{
                                endAdornment: <InputAdornment position="start">
                                    <IconButton onClick={() => setShowPassword(!showPassword)}>
                                        {showPassword ?  <VisibilityOffOutlined /> : <VisibilityOutlined /> }
                                    </IconButton>
                                </InputAdornment>,
                            }}
                            {...register("password", {
                                required: 'Password is required',
                                pattern: {
                                    value: passwordRegex,
                                    message: 'Password should be at least 8 characters, 1 uppercase, 1 lowercase, 1 number, 1 special character'
                                }
                            })}
                            error={ errors.hasOwnProperty('password') }
                            helperText={ errors.password && errors.password.message }
                        />
                    </Grid>
                    {/* Mostrar error de firebase */}
                    <Grid item xs={12} display={ !!errorMessage ? '' : 'none' }>
                        <Alert severity="error">{errorMessage}</Alert>
                    </Grid>
                    <Grid container spacing={2} sx={{ mb:2, mt:1, mx:0.1 }}>
                        <Grid item xs={12}>
                                <Button 
                                    disabled={ isCheckingAuthentication }
                                    type="submit"
                                    variant="contained" 
                                    color="primary" 
                                    fullWidth
                                >
                                    Sign Up
                                </Button>
                            </Grid>
                        </Grid> {/* Buttons */}
                        <Grid container direction="row" justifyContent="end" >
                            <Link component={ RouterLink } to="/auth/login">
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </form>
        </AuthSign>
    )
}

