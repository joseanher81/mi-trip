import { FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { Grid, TextField, Button, Typography } from '@mui/material';
import { AuthLayout } from '../layout/AuthLayout';
import { useAuthStore, useForm } from '../../hooks';

const initState = {
    displayName: '',
    email: '',
    password: ''
}

const formValidations = {
    displayName: [ ( value: string ) => value.length >= 6, 'The name must have at least 6 characters'],
    email: [ (value: string ) => {
        const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return regex.test(value);
        }, 'The email is not valid'],
    password: [ ( value: string ) => value.length >= 6, 'The password must have at least 6 characters']

}

export const SignUpPage = () => {

    const { startCreatingUserWithEmailAndPassword } = useAuthStore();

    const { displayName, email, password, displayNameValid, emailValid, passwordValid, onChange, isFormValid } = useForm(initState, formValidations);

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

                <Grid container>
                    <Grid item xs={ 12 }>
                        <Button disabled={ !isFormValid } type='submit' fullWidth>
                            Create account
                        </Button>
                    </Grid>
                </Grid>

                <Grid container direction='row' justifyContent='end'>
                    <Typography sx={{ mr: 1 }}>Already have an account?</Typography>
                    <Link color='inherit' to="/auth/login">
                        Log In
                    </Link>
                </Grid>

            </form>

        </AuthLayout>
    )
}
