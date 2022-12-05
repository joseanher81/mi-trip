import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './../store';

// Define a type for the slice state
interface AuthState {
    status?: 'authenticated' | 'not-authenticated',
    uid?: string | null,
    email?: string | null,
    displayName?: string | null,
    photoURL?: string | null,
    errorMessage?: string | null,
    checking?: boolean
}
  
// Define the initial state using that type
const initialState: AuthState = {
    status: 'not-authenticated',
    uid: null,
    email: null,
    displayName: null,
    photoURL: null,
    errorMessage: null,
    checking: false
}
  
export const authSlice = createSlice({
   name: 'auth',
   initialState,
   reducers: {
        onLogin: (state, action: PayloadAction<AuthState> ) => {
            state.status = 'authenticated';
            state.uid = action.payload.uid;
            state.email = action.payload.email;
            state.displayName = action.payload.displayName;
            state.photoURL = action.payload.photoURL;
            state.checking = false;
            state.errorMessage = null;
        },
        onLogout: (state, action?: PayloadAction<string> ) => {
            state.status = 'not-authenticated';
            state.uid = null;
            state.email = null;
            state.displayName = null;
            state.photoURL = null;
            state.checking = false;
            state.errorMessage = action?.payload;
        },
        onChecking: ( state ) => {
            state.checking = true;
        },
        clearErrorMessage: ( state ) => {
            state.errorMessage = undefined;
        }
   }
});


// Action creators are generated for each case reducer function
export const { onLogin, onLogout, onChecking, clearErrorMessage } = authSlice.actions;

// Not sure if we will use this yet
export const selectUser = (state: RootState) => state.auth;