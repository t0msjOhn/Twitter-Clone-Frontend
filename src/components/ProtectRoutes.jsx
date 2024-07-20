import {React,useEffect} from 'react'
import {useAuthState} from 'react-firebase-hooks/auth'
//import {onAuthStateChanged} from 'firebase/auth'
import auth from '../auth/firebase.init'
import {Navigate} from 'react-router-dom'
import Home from './Home'
import LoadingPage from './LoadingPage'


function ProtectRoutes({children}) {
    const [user,isLoading] = useAuthState(auth)

    if(isLoading){
        return(
            <LoadingPage/>
        )
    }

    if(!user){
        return(
            <Navigate to='/login'/>
        )
    }
    return children
}

// function ProtectRoutes({children}){
//     const navigate = useNavigate()

//     useEffect(()=>{
//         const notUser = onAuthStateChanged(auth,(user)=>{
//             if(!user){
//                 //Redirect unauthorised user to login page
//                 navigate('/login')
//             }
//         })
//         return notUser
//     },[navigate])

//     return children
// }

export default ProtectRoutes