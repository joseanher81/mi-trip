import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthRoutes } from '../auth/routes/AuthRoutes';
import { useAuthStore } from './../hooks';
import { TripsPage } from '../trips/pages/TripsPage';
import { useEffect } from 'react';


export const AppRouter = () => {

  const { status, checkAuth } = useAuthStore();

  useEffect( () => {
    checkAuth();
  }, []);

  if( status === 'checking' ) {
    return (
      <h3>Loading...</h3>
    );
  }

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
