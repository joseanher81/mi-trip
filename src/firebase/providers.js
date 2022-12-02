import { GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword } from 'firebase/auth';
import { FirebaseAuth } from './config';

const googleProvider = new GoogleAuthProvider();

export const loginWithGoogle = async () => {

    try {
        const { user, _tokenResponse } = await signInWithPopup( FirebaseAuth, googleProvider );
        const { displayName, email, photoURL, uid } = user;

        // Save auth token to local storage
        const token = _tokenResponse.idToken;
        localStorage.setItem('token', token);
        

        return {
            ok: true,
            displayName, 
            email, 
            photoURL, 
            uid
        }

    } catch (error) {
        console.log(`error ${error}`); // TODO Delete
        return {
            ok: false,
            errorMessage: error.message
        }
    }

}

export const registerUserWithEmailPassword = async ( { email, password, displayName } ) => {

    try {
        const { user, _tokenResponse } = await createUserWithEmailAndPassword( FirebaseAuth, email, password );
        const { uid, photoURL } = user;

        // Save auth token to local storage
        const token = _tokenResponse.idToken;
        localStorage.setItem('token', token);

        await updateProfile( FirebaseAuth.currentUser, { displayName });

        return {
            ok: true,
            displayName,
            email,
            photoURL,
            uid
        }
        
    } catch (error) {
        console.log(`error ${error}`); // TODO Delete
        return {
            ok: false,
            errorMessage: error.message
        }
    }
}

export const loginWithEmailPassword = async ( { email, password }) => {

    try {
        const {user, _tokenResponse} = await signInWithEmailAndPassword( FirebaseAuth, email, password);
        const { displayName, photoURL, uid } = user;

        // Save auth token to local storage
        const token = _tokenResponse.idToken;
        localStorage.setItem('token', token);

        return {
            ok: true,
            displayName,
            email,
            photoURL,
            uid
        }

    } catch (error) {
        console.log(`error ${error}`); // TODO Delete
        return {
            ok: false,
            errorMessage: error.message
        }
    }

}

export const logoutFirebase = async () => {
    return await FirebaseAuth.signOut();
}