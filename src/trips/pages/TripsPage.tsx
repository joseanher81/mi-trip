import { Button, Grid, Typography } from '@mui/material';
import { useAuthStore } from '../../hooks/useAuthStore';


export const TripsPage = () => {

  const { displayName, startLogOut } = useAuthStore();

  return (
    <>
      <Typography>Pagina principal</Typography>

      <Grid container>
        <Grid item xs={ 12 }>
          <Typography>Name: { displayName }</Typography>
        </Grid>

        <Grid item xs={ 12 } sm={ 6 }>
          <Button 
              onClick={ startLogOut } 
              variant='contained' 
              fullWidth>
              <Typography>Logout</Typography>
          </Button>
        </Grid>
      </Grid>

    </>
  )
}
