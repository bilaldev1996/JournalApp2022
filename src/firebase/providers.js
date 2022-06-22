import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";
import { FirebaseAuth } from "./config";


const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {

    try{
        const result = await signInWithPopup(FirebaseAuth, googleProvider);
        //const credential = GoogleAuthProvider.credentialFromResult(result);
        const { displayName, email, photoURL, uid } = result.user;

        return {
            ok:true,
            //user info
            displayName,
            email,
            photoURL,
            uid
        }
        
    }catch(error){
        console.log(error);
        return {
            ok:false,
            errorMessage: error.message
        }
    }
}

export const signUpWithEmailAndPassword = async ({ email, password, displayName }) => {
    try{
        const result = await createUserWithEmailAndPassword(FirebaseAuth, email, password);
        const {  uid, photoURL} = result.user;

        //TODO: update displayName in firebase
        await updateProfile( FirebaseAuth.currentUser,{ displayName });


        return {
            ok:true,
            //user info
            uid,
            photoURL,
            displayName,
            email
        }
        
    }catch(error){
        if(error.code === "auth/email-already-in-use"){
            return {
                ok:false,
                errorMessage: "Email already in use"
            }
        }
    }
}

export const loginWithEmailPassword = async (email,password) => {
    try{
        const result = await signInWithEmailAndPassword(FirebaseAuth, email, password);
        const {  uid, photoURL, displayName} = result.user;

        return {
            ok:true,
            //user info
            uid,
            photoURL,
            displayName,
            email
        }
        
    }catch(error){
        if(error.code === "auth/user-not-found"){
            return {
                ok:false,
                errorMessage: "User not found"
            }
        }
        if(error.code === "auth/wrong-password"){
            return {
                ok:false,
                errorMessage: "Wrong password"
            }
        }
    }
}

export const logoutFirebase = async () => {
    try{
        await FirebaseAuth.signOut();
        return {
            ok:true
        }
    }catch(error){
        return {
            ok:false,
            errorMessage: error.message
        }
    }
}
