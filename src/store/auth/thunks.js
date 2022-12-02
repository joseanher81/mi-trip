import { loginWithGoogle, loginWithEmailPassword, registerUserWithEmailPassword, logoutFirebase } from './../../firebase/providers';
import { onChecking, onLogin, onLogout } from './';

// TODO We are not using this JS anymore, it has been replaced by a hook (useAuthStore)

export const startCheckingCredentials = () => {
    return async ( dispatch ) => {
        dispatch( onChecking() );
    }
}

export const startGoogleLogIn = () => {
    return async ( dispatch ) => {
        dispatch( onChecking() );

        const resp = await loginWithGoogle();

        // in case of ERROR -> logout
        if( !resp.ok ) dispatch( onLogout( resp.errorMessage ) );

        // everything ok -> login
        dispatch( onLogin( resp ) );
    }
}

export const startLoginWithEmailAndPassword = ( { email, password } ) => {
    return async ( dispatch ) => {
        dispatch( onChecking() );

        const resp = await loginWithEmailPassword( { email, password });

        // in case of ERROR -> logout
        if( !resp.ok ) dispatch( onLogout( resp.errorMessage ) );

        // everything ok -> login
        dispatch( onLogin( resp ) );
    }
}

export const startCreatingUserWithEmailAndPassword = ( { email, password, displayName } ) => {
    return async ( dispatch ) => {
        dispatch( onChecking() );

        const resp = await registerUserWithEmailPassword( { email, password, displayName } );

        // in case of ERROR -> logout
        if( !resp.ok ) dispatch( onLogout( resp.errorMessage ));

        // everything ok -> login
        dispatch( onLogin( resp ) );
    }
}

export const startLogOut = () => {
    return async ( dispatch ) => {
        await logoutFirebase();
        dispatch( onLogout() );
    }
}

