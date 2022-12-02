import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './../store';

// Define a type for the slice state
interface AuthState {
    status?: 'checking' | 'authenticated' | 'not-authenticated',
    uid?: string | null,
    email?: string | null,
    displayName?: string | null,
    errorMessage?: string | null,
}
  
// Define the initial state using that type
const initialState: AuthState = {
    status: 'checking',
    uid: null,
    email: null,
    displayName: null,
    errorMessage: null
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
            state.errorMessage = null;
        },
        onLogout: (state, action?: PayloadAction<string> ) => {
            state.status = 'not-authenticated';
            state.uid = null;
            state.email = null;
            state.displayName = null;
            state.errorMessage = action?.payload;
        },
        onChecking: ( state ) => {
            state.status = 'checking';
        },
   }
});


// Action creators are generated for each case reducer function
export const { onLogin, onLogout, onChecking } = authSlice.actions;

// Not sure if we will use this yet
export const selectUser = (state: RootState) => state.auth;