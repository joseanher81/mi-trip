import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthRoutes } from '../auth/routes/AuthRoutes';


export const AppRouter = () => {
  return (
    <Routes>

      {/* TODO logged route */}

      <Route path='/*' element={ <div>Logged</div> } />
      <Route path='/auth/*' element={ <AuthRoutes /> } />
    </Routes>
  )
}
