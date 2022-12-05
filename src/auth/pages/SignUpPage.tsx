import { FormEvent, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Grid, TextField, Button, Typography } from '@mui/material';
import { AuthLayout } from '../layout/AuthLayout';
import { useAuthStore, useForm } from '../../hooks';
import { displayName, email, password }  from './../../validators';
import { ErrorAlert, Spinner } from "./../../components";

const validations = { displayName, email, password }

const initState = {
    displayName: '',
    email: '',
    password: ''
}

export const SignUpPage = () => {

    const { startCreatingUserWithEmailAndPassword, clearErrors, errorMessage, checking } = useAuthStore();

    const { displayName, email, password, displayNameValid, emailValid, passwordValid, onChange, isFormValid } = useForm(initState, validations);

    // Clean all possible error messages
    useEffect(() => {
        clearErrors();
    }, []);

    const onSubmit = ( event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if( !isFormValid ) return;

        console.log("IS" + isFormValid)

        //TODO aquí el dispatch
        startCreatingUserWithEmailAndPassword( {email, displayName, password} );

        console.log('Sign up form submited');
    }

    return (
        <AuthLayout title='Sign Up'>

            <form onSubmit={ onSubmit }>
                <Grid container>
                    <Grid item xs={ 12 } sx={{ mt: 2 }}>
                        <TextField
                            label='Name'
                            type='text'
                            placeholder='Your name'
                            fullWidth
                            name='displayName'
                            value={ displayName }
                            onChange={ onChange }
                            helperText={ displayNameValid }
                        />
                    </Grid>

                    <Grid item xs={ 12 } sx={{ mt: 2 }}>
                        <TextField
                            label='Email'
                            type='email'
                            placeholder='email@gmail.com'
                            fullWidth
                            name='email'
                            value={ email }
                            onChange={ onChange }
                            helperText={ emailValid }
                        />
                    </Grid>

                    <Grid item xs={ 12 } sx={{ mt: 2 }}>
                        <TextField
                            label='Password'
                            type='password'
                            placeholder='Password'
                            fullWidth
                            name='password'
                            value={ password }
                            onChange={ onChange }
                            helperText={ passwordValid }
                        />
                    </Grid>

                </Grid>

                <Grid container mt={ 2 }>
                    <Grid item xs={ 12 }>
                        <Button 
                            disabled={ !isFormValid } 
                            type='submit' 
                            variant='contained'
                            fullWidth
                        >
                            Create account
                        </Button>
                    </Grid>
                </Grid>

                <Grid container direction='row' justifyContent='end' mt={ 1 }>
                    <Typography sx={{ mr: 1 }}>Already have an account?</Typography>
                    <Link color='inherit' to="/auth/login">
                        Log In
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
