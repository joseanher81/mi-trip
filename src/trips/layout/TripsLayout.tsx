import { Box } from '@mui/system';
import { NavBar } from '../components';

interface Props {
    children: JSX.Element
}

export const TripsLayout = ({ children }: Props) => {
  return (
    <Box>
        <NavBar />

        { children }
    </Box>
  )
}
