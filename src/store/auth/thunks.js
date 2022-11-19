import { loginWithGoogle, loginWithEmailPassword, registerUserWithEmailPassword, logoutFirebase } from './../../firebase/providers';
import { checkingCredentials, login, logout } from './';

export const startCheckingCredentials = () => {
    return async ( dispatch ) => {
        dispatch( checkingCredentials() );
    }
}

export const startGoogleLogIn = () => {
    return async ( dispatch ) => {
        dispatch( checkingCredentials() );

        const resp = await loginWithGoogle();

        // in case of ERROR -> logout
        if( !resp.ok ) dispatch( logout( resp.errorMessage ) );

        // everything ok -> login
        dispatch( login( resp ) );
    }
}

export const startLoginWithEmailAndPassword = ( { email, password } ) => {
    return async ( dispatch ) => {
        dispatch( checkingCredentials() );

        const resp = await loginWithEmailPassword( { email, password });

        // in case of ERROR -> logout
        if( !resp.ok ) dispatch( logout( resp.errorMessage ) );

        // everything ok -> login
        dispatch( login( resp ) );
    }
}

export const startCreatingUserWithEmailAndPassword = ( { email, password, displayName } ) => {
    return async ( dispatch ) => {
        dispatch( checkingCredentials() );

        const resp = await registerUserWithEmailPassword( { email, password, displayName } );

        // in case of ERROR -> logout
        if( !resp.ok ) dispatch( logout( resp.errorMessage ));

        // everything ok -> login
        dispatch( login( resp ) );
    }
}

export const startLogOut = () => {
    return async ( dispatch ) => {
        await logoutFirebase();
        dispatch( logout );
    }
}

