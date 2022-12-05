import { FormEvent, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Grid, TextField, Typography } from "@mui/material"
import { AuthLayout } from "../layout/AuthLayout"
import { useAuthStore, useForm } from './../../hooks';
import { Google } from "@mui/icons-material";
import { ErrorAlert, Spinner } from "./../../components";
import { email, password } from './../../validators';

const validations = { email, password }

const initState = {
    email: '',
    password: ''
}


export const LoginPage = () => {

    const { startLoginWithEmailAndPassword, startGoogleLogIn, clearErrors, checking, errorMessage } = useAuthStore();

    const { email, password, onChange, isFormValid } = useForm( initState, validations );

    // Clean all possible error messages
    useEffect(() => {
      clearErrors();
    }, []);
    

    // Normal Login
    const onSubmit = ( event: FormEvent<HTMLFormElement> ) => {
        event.preventDefault();
        console.log("Submitting loging")
        startLoginWithEmailAndPassword( { email, password } );
    }

    // Google Login
    const onGoogleSignIn = () => {
        startGoogleLogIn();
    }

    return (
        <AuthLayout title='Login'>

            <form onSubmit={ onSubmit }>
                    <Grid container>
                        <Grid item xs={ 12 } sx={{ mt: 2 }}>
                            <TextField
                                label='Email'
                                type='email'
                                placeholder='Your email'
                                fullWidth
                                name='email'
                                value={ email }
                                onChange={ onChange }
                            />
                        </Grid>
                        <Grid item xs={ 12 } sx={{ mt: 2 }}>
                            <TextField
                                label='Password'
                                type='password'
                                placeholder='Your password'
                                fullWidth
                                name='password'
                                value={ password }
                                onChange={ onChange }
                            />
                        </Grid>
                    </Grid>

                    <Grid 
                        container 
                        direction="row"
                        justifyContent="center"
                        mt={ 2 }
                    >
                        <Grid item xs={ 12 } sm={ 6 }>
                            <Button 
                                disabled={ !isFormValid } 
                                type='submit' 
                                variant='contained' 
                                fullWidth>
                                Login
                            </Button>
                        </Grid>
                    </Grid>

                    <Grid 
                        container 
                        direction="row"
                        justifyContent="center"
                        mt={ 2 }
                    >
                        <Grid item xs={ 12 } sm={ 6 } >
                            <Button 
                                onClick={ onGoogleSignIn } 
                                variant='contained' 
                                fullWidth
                            >
                                <Google />
                                <Typography sx={{ ml: 1 }}> Google</Typography>
                            </Button>
                        </Grid>
                    </Grid>

                    <Grid container direction='row' justifyContent='end' mt={ 1 } mb={1}>
                        <Typography sx={{ mr: 1 }}>Don't have an account?</Typography>
                        <Link color='inherit' to="/auth/signup">
                            Sign Up
                        </Link>
                    </Grid>

                    <Grid container display={ Boolean(errorMessage) ? '' : 'none' }>
                        <ErrorAlert message={ errorMessage } />
                    </Grid>

                    <Spinner display={ checking! } />

                </form>

        </AuthLayout>
  )
}
