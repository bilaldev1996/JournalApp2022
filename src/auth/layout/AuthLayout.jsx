import { Grid, Typography } from '@mui/material'
import React from 'react'
import { PropTypes } from 'prop-types'

const AuthLayout = ({ children,title='' }) => {
    return (
        <Grid 
            container
            direction="column"
            spacing={0}
            justifyContent="center"
            alignItems="center"
            sx={{ 
                minHeight: "100vh", 
                backgroundColor: "primary.main", padding : 4 
            }}
        >
            <Grid item 
                className="box-shadow"
                xs={3} // xs is for mobile, sm is for tablet, md is for desktop, lg is for large desktops, xl is for laptops and desktops
                sx={{ 
                    width: { sm:450 },
                    backgroundColor: "white", 
                    padding: 3, 
                    borderRadius: 2 
                }} //styling for the box
            >
                <Typography variant='h5' sx={{ mb:1 }}>
                    {title}
                </Typography>

                {children}
            </Grid>
        </Grid>
    )
}

AuthLayout.prototype = {
    title: PropTypes.string.isRequired,
}

export default AuthLayout
