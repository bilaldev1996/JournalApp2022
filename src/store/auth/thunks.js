import { loginWithEmailPassword, logoutFirebase, signInWithGoogle, signUpWithEmailAndPassword } from "../../firebase/providers";
import { clearNotesLogout } from "../journal";
import { checkingCredential, login, logout } from "./authSlice"


export const checkingAuth = ( email, password ) => {
    return async(dispatch) => {
        dispatch(checkingCredential());
        
    }
}

export const startGoogleSignIn = () => {
    return async(dispatch) => {
        dispatch(checkingCredential());

        const result = await signInWithGoogle();
        
        if(!result.ok) return dispatch(logout(result.errorMessage));

        dispatch(login(result));
    }
}

export const startCreateUserWithEmailAndPassword = ({email, password,displayName}) => {
    return async(dispatch) => {
        dispatch(checkingCredential());

        const result = await signUpWithEmailAndPassword({email, password, displayName});

        if(!result.ok) return dispatch(logout(result.errorMessage));

        dispatch(login(result));
    }
}

export const startSignInWithEmailAndPassword = (email, password) =>{
    return async(dispatch) => {
        dispatch(checkingCredential());

        const result = await loginWithEmailPassword(email, password);

        if(!result.ok) return dispatch(logout(result.errorMessage));

        dispatch(login(result));
    }
}

export const startLogout = () => {
    return async(dispatch) => {
        const result = await logoutFirebase()

        if(!result.ok) return dispatch(logout(result.errorMessage));

        dispatch(clearNotesLogout());
        dispatch(logout());
    }
}

