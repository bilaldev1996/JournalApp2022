import { TurnedInNot, TurnedInRounded } from "@mui/icons-material"
import { Drawer, Box, Toolbar, Typography, Divider, List, ListItem, ListItemButton, ListItemIcon, Grid, ListItemText, Avatar } from "@mui/material"
import { deepOrange } from "@mui/material/colors"
import { useDispatch, useSelector } from "react-redux"
import moment from "moment"
import { setActiveNote } from "../../store/journal"

export const SideBar = ({ drawerWidth = 240 }) => {


    const { displayName, photoURL } = useSelector(state => state.auth)

    const { notes, active } = useSelector(state => state.journal)

    const dispatch = useDispatch()

    const activeNote = ( note )=>{
        dispatch(setActiveNote(note))
    }

    return (
        <Box
            component='nav'
            sx={{
                width: { sm: drawerWidth, xs: '42%' },
                flexShrink : { sm : 0 },
            }}
        >
            <Drawer
                variant="permanent"
                open
                sx={{
                    display: { xs: 'block' },
                    '& .MuiDrawer-paper' : {
                        boxSizing: 'border-box',
                        width: drawerWidth,
                        width : { xs : '40%', md : '18%'  } 
                    },

                }}
            >
                <Toolbar>
                    {
                        photoURL !==null ? (
                            <Avatar
                                src={'https://lh3.googleusercontent.com/a-/AOh14GhPcH_bKzkoppQTr4RNOPL4rEZu0-2sdYm5ua-hpw=s96-c'}
                            />
                        ) : (
                            <Avatar sx={{ bgcolor: deepOrange[500] }}>{
                                displayName !== null ? displayName.charAt(0).toUpperCase() : ''
                            }</Avatar>
                        )
                    }
                    <Typography
                        sx={{ml:1}}
                        variant="h6"
                        nowrap="nowrap"
                        component='div'
                    >{ displayName }</Typography>
                </Toolbar>
                <Divider />

                <List>
                    {
                        // ['Enero','Febrero','Marzo','Abril','Mayo'].map(item => (
                        notes.map(note => (
                            <ListItem 
                                onClick={()=>{
                                    activeNote(note)
                                }}
                                key={note.id} 
                                disablePadding
                            >
                                <ListItemButton>
                                    <ListItemIcon>
                                        {
                                            active?.id === note?.id ? (
                                                <TurnedInRounded
                                                    sx={{
                                                        color: 'error.main',
                                                    }}
                                                />
                                            ) : (
                                                <TurnedInNot />
                                            )
                                        }
                                    </ListItemIcon>
                                    <Grid container>
                                            <ListItemText primary={note.title} />
                                            <ListItemText secondary={note.body} />
                                        </Grid>
                                </ListItemButton>
                            </ListItem>
                        ))

                    }
                </List>
            </Drawer>
        </Box>
    )
}

export default SideBar
