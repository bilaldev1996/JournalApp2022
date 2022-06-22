import { LockClockRounded } from '@mui/icons-material'
import { Avatar, Box, Grid, Paper, Typography } from '@mui/material'
import React from 'react'



const AuthSign = ({ children, title }) => {
    return (
        <Grid container component="main" sx={{ height: '100vh' }} className="animate__animated animate__fadeIn animate__delay-1
        s">
            <Grid
                item
                xs={false}
                sm={4}
                md={7}
                sx={{
                backgroundImage: 'url(https://source.unsplash.com/random)',
                backgroundRepeat: 'no-repeat',
                backgroundColor: (t) =>
                    t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                }}
            />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <Box
                sx={{
                    my: 8,
                    mx: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
                >
                <Avatar sx={{ m: 2, bgcolor: 'secondary.main' }}>
                    <LockClockRounded />
                </Avatar>

                <Typography component="h1" variant="h5">
                    {title}
                </Typography>
                {children}
                </Box>
                </Grid>
        </Grid>
    )
}

export default AuthSign
