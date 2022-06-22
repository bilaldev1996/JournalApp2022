import { StarOutline } from '@mui/icons-material'
import { Grid, Typography } from '@mui/material'

export const NothingSelectedView = () => {

    return (
        <>
            <Grid 
                className="animate__animated animate__fadeIn"
                container
                direction="column"
                spacing={0}
                justifyContent="center"
                alignItems="center"
                sx={{ 
                    minHeight: 'calc(100vh - 10px)',
                    backgroundColor: "primary.main", 
                    padding : 4,
                    borderRadius : 3,
                }}
            >
                <Grid item xs={12}>
                    <StarOutline sx={{ fontSize: 100, color: 'white'}}/>
                </Grid>
                <Grid item xs={12}>
                    <Typography color="white" variant="h5">
                        Select or create a note to get started.
                    </Typography>
                </Grid>
            </Grid>
            
        </>
    )
}

