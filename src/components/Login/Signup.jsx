import React, { useState } from 'react'
import { twitterImg } from '../../assets'
import TwitterIcon from '@mui/icons-material/Twitter';
import { useCreateUserWithEmailAndPassword, useSignInWithGoogle} from 'react-firebase-hooks/auth';
import GoogleButton from 'react-google-button' 
import auth from '../../auth/firebase.init';
import {Link,useNavigate} from 'react-router-dom'
import axios from 'axios'
import './Login.css'

function Signup() {
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate()

  const [signInWithGoogle, googleUser, googleLoading, googleError] = useSignInWithGoogle(auth);

  const [createUserWithEmailAndPassword, user, loading, error] = useCreateUserWithEmailAndPassword(auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(email, password);
      const user ={
        username:username,
        name:name,
        email:email
      }
      axios.post('https://twitter-clone-backend-ywdx.onrender.com/register',user)
    } catch (err) {
      console.error(err);
    }
  };

  const handleGoogleSignIn = () => {
    signInWithGoogle().catch(console.error);
  };

  if (error || googleError) {
    return <div><p>Error: {error?.message || googleError?.message}</p></div>;
  }
  if (loading || googleLoading) {
    return <p>Loading...</p>;
  }
  if (user) {
    navigate('/login')
    return alert(`User Registered Successfully! ${user.user.email}`)
  }

  if(googleUser){
    navigate('/login')
    return (
      alert(`User Registered Successfully! ${googleUser.user.email}`)
    )
  }

  return (
    <div className="login-container">
        <div className="image-container">
            <img className="image Twitter-img" src={twitterImg} alt="twitterImage"/>
        </div>
        <div className="form-container">
          <div className='form-box '>
            <TwitterIcon  style={{color:'skyblue'}}/>
            <h3 className='heading1'>Join twitter today</h3>
            <form onSubmit={handleSubmit}>
                <input
                type='text'
                className="display-name"
                placeholder='@username'
                onChange={(e)=>setUsername(e.target.value)}
                />
                <input
                type='text'
                className="display-name"
                placeholder='Enter Full Name'
                onChange={(e)=>setName(e.target.value)}
                />
                <input
                type='email'
                className="email-input"
                placeholder='Email address'
                onChange={(e)=>setEmail(e.target.value)}
                />
                <input
                type='password'
                className="password-input"
                placeholder='Password'
                onChange={(e)=>setPassword(e.target.value)}
                />
                <div className='btn-login'>
                  <button type='submit' className='btn'>Sign Up</button>
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
            <div>
            <br/>
              Already have an account
              <Link
              to='/login'
              style={{
                textDecoration:'None',
                color:'skyblue',
                fontWeight:'600',
                marginLeft: '5px'
              }}
              >
              Login
              </Link>
            </div>
        </div>
    </div>
  </div>  
  )
}

export default Signup