import { AppBar, Grid, IconButton, Modal, Toolbar, Typography } from '@mui/material'
import { LogoutOutlined, MenuOutlined } from '@mui/icons-material'
import React from 'react'
import { useDispatch } from 'react-redux'
import { startLogout } from '../../store/auth/thunks'
import swal from 'sweetalert'
import { setActiveNote, setNotes } from '../../store/journal'

export const NavBar = ({ drawerWidth = 240 }) => {

    const dispatch = useDispatch()

    //Hacer logout del usuario
    const handleLogout = async() => {
        //dispatch(startLogout())
        const resp = await swal({
            title: "Are you sure to logout?",
            closeOnClickOutside: false,
            buttons: {
                cancel: true,
                confirm: true,
            },
        })

        if(resp) {
            dispatch(startLogout())
            /* dispatch(setActiveNote({}))
            dispatch(setNotes({})) */
        }

    }

    return (
        <AppBar
            position="fixed"
            sx={{
                width: { xs : '60%', md:'82%'  },
                ml: { sm: drawerWidth }
            }}

        >

            <Toolbar>
                <IconButton
                    color="inherit"
                    edge="start"
                    sx={{ mr:2 , display: { sm : 'none' } }}
                >
                    <MenuOutlined />
                </IconButton>

                <Grid 
                    container 
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <Typography
                        variant="h6"
                        color="inherit"
                        nowrap="nowrap"
                        component='div'
                    > JournalApp </Typography>
                    <IconButton
                        onClick={ handleLogout}
                        color="error"
                    >
                        <LogoutOutlined />
                    </IconButton>
                </Grid>
            </Toolbar>

        </AppBar>
    )
}

