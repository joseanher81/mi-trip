import { onAuthStateChanged } from "firebase/auth";
import { FirebaseAuth } from "../firebase/config";
import { loginWithGoogle, loginWithEmailPassword, registerUserWithEmailPassword, logoutFirebase } from './../firebase/providers';
import { onChecking, onLogin, onLogout, clearErrorMessage } from './../store';
import { useAppDispatch, useAppSelector } from './reduxTypedHooks';

export const useAuthStore = () => {

    const { status, uid, displayName, photoURL, errorMessage, checking } = useAppSelector( state => state.auth );
    const dispatch = useAppDispatch();

    // Checking credentials
/*     const startCheckingCredentials = async() => {
        dispatch( onChecking() );
    } */
  
    // Login with password and email
    const startLoginWithEmailAndPassword = async( { email, password }: { email: string, password: string } ) => {
    
        dispatch( onChecking() );

        try {
            const resp = await loginWithEmailPassword( { email, password });
            
            // in case of ERROR -> logout
            if( !resp.ok ) return dispatch( onLogout( resp.errorMessage ) );

            // everything ok -> login
            dispatch( onLogin( resp ) );

        } catch (error) {
            console.log(error);
            dispatch( onLogout('Login error') );
        }
    }

    // Login with Google
    const startGoogleLogIn = async() => {

        dispatch( onChecking() );

        try {
            const resp = await loginWithGoogle();

            // in case of ERROR -> logout
            if( !resp.ok ) return dispatch( onLogout( resp.errorMessage ) );

            // everything ok -> login
            dispatch( onLogin( resp ) );

        } catch (error) {
            console.log(error);
            dispatch( onLogout('Login error') );
        }
    }

    // Create new user
    const startCreatingUserWithEmailAndPassword = async( { email, password, displayName }: {email: string, password: string, displayName: string} ) => {
    
        dispatch( onChecking() );

        try {
            const resp = await registerUserWithEmailPassword( { email, password, displayName } );

            // in case of ERROR -> logout
            if( !resp.ok ) dispatch( onLogout( resp.errorMessage ));

            // everything ok -> login
            dispatch( onLogin( resp ) );

        } catch (error) {
            console.log(error);
            dispatch( onLogout('Error creating new user') );
        }
    }

    // Check token validation NOT NEEDED
/*     const checkAuthToken = async() => {
        console.log('Cheking token');
        const token = localStorage.getItem('token');
        if( !token ) return dispatch( onLogout );

        try {
            
        } catch (error) {
            
        }
    } */

    // Log out
    const startLogOut = async() => {
        await logoutFirebase();
        dispatch( onLogout('') ); //TODO mejorarlo
    }

    // Check if user is logged
    const checkAuth = () => {
        onAuthStateChanged( FirebaseAuth, async(user) => {
            if( !user ) return dispatch( onLogout('') );

            const {uid, displayName, email, photoURL} = user; //TODO dejarlo mas bonito
            dispatch( onLogin( {uid, displayName, email} ));

        });
    }

    // Clear error messages
    const clearErrors = () => {
        dispatch( clearErrorMessage() );
    }

    return {
        // Properties
        status,
        uid,
        photoURL,
        displayName,
        errorMessage,
        checking,

        // Methods
        startLoginWithEmailAndPassword,
        startGoogleLogIn,
        startCreatingUserWithEmailAndPassword,
        startLogOut,
        checkAuth,
        clearErrors
    }
}
