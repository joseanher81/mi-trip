import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthRoutes } from '../auth/routes/AuthRoutes';
import { CircularProgress, Grid } from '@mui/material';
import { useAuthStore } from './../hooks';
import { TripsPage } from '../trips/pages/TripsPage';



export const AppRouter = () => {

  const { status, checkAuth } = useAuthStore();

  // useEffect( () => {
  //   checkAuth();
  // }, []);

  // if( status === 'checking' ) {
  //   return (
  //     <Grid 
  //       container 
  //       direction="row"
  //       justifyContent="center"
  //       mt={ 2 }
  //     >
  //       <CircularProgress />
  //     </Grid>
  //   );
  // }

  return (
    <Routes>
      {
        ( status === 'not-authenticated')
        ?
          (
            <>
              <Route path='/auth/*' element={ <AuthRoutes /> } />
              <Route path='/*' element={ <Navigate to="/auth/login" /> } />
            </>
          )
        :
          (
            <>
              <Route path='/' element={ <TripsPage /> } />
              <Route path='/*' element={ <Navigate to='/' /> } />
            </>
          )  
      }
    </Routes>
  )
}
