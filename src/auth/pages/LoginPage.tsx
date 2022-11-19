import { FormEvent } from "react";
import { Button, Grid, TextField } from "@mui/material"
import { AuthLayout } from "../layout/AuthLayout"
import { useForm } from '../../hooks/useForm';


export const LoginPage = () => {

    const initState = {
        displayName: '',
        password: ''
    }

    const { displayName, password, onChange } = useForm( initState );

    const onSubmit = ( event: FormEvent<HTMLFormElement> ) => {
        event.preventDefault();
        console.log("Submitting loging")
    }

    return (
        <AuthLayout title='Login'>

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

                    <Grid container>
                        <Grid item xs={ 12 }>
                            <Button type='submit' fullWidth>
                                Login
                            </Button>
                        </Grid>
                    </Grid>
                </form>

        </AuthLayout>
  )
}
