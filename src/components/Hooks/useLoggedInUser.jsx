import { useEffect, useState } from 'react'
import {useAuthState} from 'react-firebase-hooks/auth'
import auth from '../../auth/firebase.init'

function useLoggedInUser() {
    const [user] = useAuthState(auth);
    //console.log(user)
    const email = user?.email
    //console.log(email)
    const [loggedInUser,setLoggedInUser] = useState({})

    useEffect( ()=>{
        if (email) {
            fetch(`https://twitter-clone-backend-ywdx.onrender.com/loggedInUser?email=${email}`)
                .then(res => res.json())
                .then(data => {
                    //console.log(data);
                    setLoggedInUser(data);
                })
                .catch(error => {
                    console.error("Error fetching logged in user:", error);
                });
            }
    },[email])

    return [loggedInUser,setLoggedInUser]
}

export default useLoggedInUser