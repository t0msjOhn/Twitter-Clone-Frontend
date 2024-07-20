import React from 'react'
import '../Page.css'
import { useAuthState } from "react-firebase-hooks/auth"
import MainPage from './MainPage/MainPage'
import auth from '../../auth/firebase.init'

function Profile() {
  const [user] = useAuthState(auth);

  return (
    <div className='profilePage'>
        <MainPage user={user}/>
    </div>
  )
}

export default Profile