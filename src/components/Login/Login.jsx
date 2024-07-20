import React, { useState } from 'react'
import { twitterImg } from '../../assets'
import TwitterIcon from '@mui/icons-material/Twitter';
import { useSignInWithEmailAndPassword, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import auth from '../../auth/firebase.init';
import GoogleButton from 'react-google-button';
import {Link,useNavigate} from 'react-router-dom'
import './Login.css'

function Login() {
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const navigate = useNavigate()
    const handleSubmit = (e)=>{
        e.preventDefault()
        signInWithEmailAndPassword(email, password)
    }

    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
      ] = useSignInWithEmailAndPassword(auth);

    const [signInWithGoogle, googleUser, googleLoading, googleError] = useSignInWithGoogle(auth);

    const handleGoogleSignIn = () => {
      signInWithGoogle().catch(console.error);
    };

    if (error || googleError) {
        return (
          <div>
            <p>Error: {error.message}</p>
          </div>
        );
      }
    if (loading || googleLoading) {
        return <p>Loading...</p>;
      }
    if (user) {
      navigate('/')
      return(
        alert(`User Registered Successfully! ${user.user.email}`)
      )
    }

  if (googleUser) {
    navigate('/')
    return(
      alert(`User Registered Successfully! ${googleUser.user.email}`)
    )
  }

  return (
    <div className="login-container">
      <div className="image-container ">
        <img className="image Twitter-img" src={twitterImg} alt="twitterImage" />
      </div>
      <div className="form-container ">
        <div className="form-box" >
          <TwitterIcon style={{ color: "skyblue"}} />
            <h1 className="heading">Happening now</h1>
              {error && <p>{error.message}</p>}
                <form onSubmit={handleSubmit}>
                  <input
                  type="email" className="email-input"
                  placeholder="Email address"
                  onChange={(e) => setEmail(e.target.value)}
                  />
                  <input className="password-input"
                  type="password"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                  />
                  <div className="btn-login">
                    <button type="submit" className="btn" >Log In</button>
                  </div>
                </form>
                <hr/>
            <div className="google-button">
              <GoogleButton
                className="g-btn"
                type='light'
                onClick={handleGoogleSignIn}
              />
            </div>
            <br/>
            <div>
              Don't have an account
              <Link
              to='/signup'
              style={{
                textDecoration:'None',
                color:'skyblue',
                fontWeight:'600',
                marginLeft: '5px'
              }}
              >
              Sign up
              </Link>
            </div>
        </div>
    </div>
    </div>
  )
}

export default Login