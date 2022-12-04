import { Grid, Typography } from '@mui/material';

interface Props {
    children: JSX.Element,
    title?: string,
}

export const AuthLayout = ({ children, title = '' }: Props) => {
  return (
    <Grid container
        spacing={ 0 }
        direction='column'
        alignItems='center'
        justifyContent='center'
        mt={ 2 }
    >
        <Grid item>

            <Typography variant='h5'>{ title }</Typography>

            { children }

        </Grid>
    
    </Grid>
  )
}
