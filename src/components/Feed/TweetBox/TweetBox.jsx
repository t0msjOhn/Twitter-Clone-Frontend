import React, { useState } from 'react'
import axios from 'axios'
import {Avatar,Button} from '@mui/material'
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate'
import './TweetBox.css'
import useLoggedInUser from '../../Hooks/useLoggedInUser'
import { useAuthState } from 'react-firebase-hooks/auth'
import auth from '../../../auth/firebase.init'
import Alert from '@mui/material/Alert';
//import CheckIcon from '@mui/icons-material/Check';

function TweetBox() {
    const [post,setPost] = useState("")
    const [imageURL,setImageURL] = useState("")
    const [isLoading,setIsLoading] = useState("")
    //const [tweeted,setTweeting] = useState(null)
    const [name,setName] = useState('')
    const [username,setUsername] = useState('')
    const [loggedInUser] = useLoggedInUser()  
    const [user] = useAuthState(auth)  
    const email = user?.email

    const userProfilePic = loggedInUser[0]?.profileImage ? loggedInUser[0]?.profileImage : 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png'

    

    const handleImageUpload = async (e) => {
        setIsLoading(true)
        const imgUrl = e.target.files[0]
        const formData = new FormData();
        formData.append('image', imgUrl)

        try {
            const response = await axios.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_APP_IMGBB_API_KEY}`, formData);
            const url = response.data.data.url;
            setImageURL(url);
            console.log("Image URL:", url);
            setIsLoading(false)
        } catch (error) {
            console.error("Error uploading image:", error)
            setIsLoading(false)
        }
    }

    const handleTweet = (e) =>{

        e.preventDefault();

        //setTweeting(true)

        if(user.providerData[0].providerId === "password"){
            fetch(`https://twitter-clone-backend-ywdx.onrender.com/loggedInUser?email=${email}`)
            .then(res => res.json())
            .then(data => {
                setName(data[0]?.name)
                setUsername(data[0]?.username)
            })
            .catch(error => {
                console.error("Error fetching logged in user:", error);
            });
        }else{
            setName(user?.displayName)
            setUsername(email?.split('@')[0])
        }

        if(name){
            const userPost = {
                profileImage:userProfilePic?userProfilePic:"",
                post:post,
                photo:imageURL?imageURL:"",
                username:username,
                name:name,
                email:email
            }

            console.log(userPost);
            
            setImageURL('')
            setPost("") 
            //setTweeting(false)
           
            fetch("https://twitter-clone-backend-ywdx.onrender.com/post",{
                method:"POST",
                headers:{
                    'content-type':'application/json'
                },
                body: JSON.stringify(userPost)
            })
            .then(res=>res.json())
            .then(data=>{
                console.log(data)
            })   
        }
    }

  return (
    <div className='tweetBox'>
        <form id="form" onSubmit={handleTweet}>
            <div className='tweetBox__input'>
                <Avatar src={userProfilePic}/>
                <input type='text'
                placeholder="What's happening?"
                onChange={(e)=>setPost(e.target.value)}
                value={post}
                required
                />
            </div>
            <div className='imageIcon_tweetButton'>
                <label htmlFor='image' className='imageIcon'>
                    {isLoading?<p>Uploading Image</p>:isLoading?<p>Image Uploaded</p>:<AddPhotoAlternateIcon/>}
                </label>
                <input 
                type='file' 
                id='image' 
                className='imageInput'
                onChange={handleImageUpload}
                />
                <Button className='tweetBox__tweetButton' type='submit'>
                    Tweet
                </Button>
            </div>
        </form>
    
            {/* tweeted?
            <Alert severity="success">
            Successfully tweeted your post
            </Alert>
            :
            <Alert  severity="error">
            Couldn't tweet
            </Alert>
          */}
    </div>
  )
}

export default TweetBox