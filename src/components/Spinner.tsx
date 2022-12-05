import { CircularProgress, Grid } from "@mui/material"

interface Props {
    display: boolean
}

export const Spinner = ( { display } : Props ) => {
  return (
    <Grid 
        container 
        direction="row"
        justifyContent="center"
        mt={ 2 }
        display={ display ? '' : 'none' }
    >
            <CircularProgress />
    </Grid>
  )
}
