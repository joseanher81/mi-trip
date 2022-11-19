import { GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword } from 'firebase/auth';
import { FirebaseAuth } from './config';

const googleProvider = new GoogleAuthProvider();

export const loginWithGoogle = async () => {

    try {
        const resp = await signInWithPopup( FirebaseAuth, googleProvider );
        const { displayName, email, photoURL, uid } = resp.user;

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
        const resp = await createUserWithEmailAndPassword( FirebaseAuth, email, password );
        const { uid, photoURL } = resp.user;

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
        const resp = await signInWithEmailAndPassword( FirebaseAuth, email, password);
        const { displayName, photoURL, uid } = resp.user;

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