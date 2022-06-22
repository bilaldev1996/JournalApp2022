import { onAuthStateChanged } from "firebase/auth"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { FirebaseAuth } from "../firebase/config"
import { login, logout } from "../store/auth/authSlice"
import { startLodingNotes } from "../store/journal"


export const useCheckOut = () => {


    const { status } = useSelector(state => state.auth)
    const dispatch = useDispatch()
    
    useEffect(() => {

        //Para saber que usuario esta logueado
        onAuthStateChanged(FirebaseAuth, async(user)=>{
            if(!user) return dispatch(logout())

            const { uid, email, displayName, photoURL } = user

            if(user){
                dispatch(login({ uid, email, displayName, photoURL }))
                dispatch(startLodingNotes())
            }
        })

    }, [])

    return { status }

}