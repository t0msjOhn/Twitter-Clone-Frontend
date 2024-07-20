import {React,useState,useEffect} from 'react'
import './MainPage.css'
import axios from 'axios';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CenterFocusWeakIcon from '@mui/icons-material/CenterFocusWeak';
import LockResetIcon from '@mui/icons-material/LockReset';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import AddLinkIcon from '@mui/icons-material/AddLink';
import {useNavigate} from 'react-router-dom'
import useLoggedInUser from '../../Hooks/useLoggedInUser'
import Posts from '../../Feed/Posts/Posts';
import EditProfile from '../EditProfile/EditProfile';

function MainPage({user}) {
    const navigate = useNavigate();
    const [loggedInUser] = useLoggedInUser()
    const username = user?.email?.split('@')[0]
    const [imageURL,setImageURL] = useState("");
    const [isLoading,setIsLoading] = useState('')
    const [posts,setPosts] = useState([])
    useEffect(()=>{
      fetch(`https://twitter-clone-backend-ywdx.onrender.com/userPost?email=${user?.email}`)
      .then(res=>res.json())
      .then(data=>{
        setPosts(data)
      },[posts])
    })
  

    const handleUploadCoverImage = async(e) =>{
        setIsLoading(true)
        const imgUrl = e.target.files[0]
        const formData = new FormData();
        formData.set('image', imgUrl)

        try {
            const response = await axios.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_APP_IMGBB_API_KEY}`, formData);
            const imageURL = response.data.data.url;
            //setImageURL(imageURL);
            //console.log("Image URL:", imageURL);
            const userCoverImage = {
                email: user?.email,
                coverImage:imageURL
            }
            setIsLoading(false)
            if(imageURL){
                axios.patch(`https://twitter-clone-backend-ywdx.onrender.com/userUpdates/${user?.email}`,userCoverImage)
            }
        } catch (error) {
            console.error("Error uploading image:", error);
        }
    }
    const handleUploadProfileImage = async(e) =>{
        setIsLoading(true)
        const imgUrl = e.target.files[0]
        const formData = new FormData();
        formData.set('image', imgUrl)

        try {
            const response = await axios.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_APP_IMGBB_API_KEY}`, formData);
            const imageURL = response.data.data.url;
            //setImageURL(imageURL);
            //console.log("Image URL:", imageURL);
            const userProfileImage = {
                email: user?.email,
                profileImage:imageURL
            }
            setIsLoading(false)
            if(imageURL){
                axios.patch(`https://twitter-clone-backend-ywdx.onrender.com/userUpdates/${user?.email}`,userProfileImage)
            }
        } catch (error) {
            console.error("Error uploading image:", error);
        }
    }
  return (
    <div>
        <ArrowBackIcon className='arrow-icon' onClick={()=>{navigate('/')}}/>
        <h4 className='heading-4'>@{username}</h4>
        <div className='mainProfile'>
            <div className='profile-bio'>
                {
                    <div>
                        <div className='coverImageContainer'>
                            <img src={loggedInUser[0]?.coverImage ? loggedInUser[0]?.coverImage
                            :"https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"} alt='' className='coverImage'/>
                            <div className='hoverCoverImage'>
                                <label htmlFor="image" className='imageIcon'>
                                    {
                                        isLoading?
                                        <LockResetIcon className='photoIcon photoIconDisabled'/>
                                        :
                                        <CenterFocusWeakIcon className='photoIcon'/>
                                    }
                                </label>
                                    <input type="file" id='image' className='imageInput' onChange={handleUploadCoverImage}/>
                            </div>
                        </div>
                        <div className='avatar-img'>
                            <div className='avatarContainer'>
                            <img src={loggedInUser[0]?.profileImage ? loggedInUser[0]?.profileImage
                            :"https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"} alt='' className='avatar'/>
                            <div className='hoverAvatarImage'>
                                <div className='imageIcon_tweetButton'>
                                <label htmlFor="profileImage" className='imageIcon'>
                                {
                                        isLoading?
                                        <LockResetIcon className='photoIcon photoIconDisabled'/>
                                        :
                                        <CenterFocusWeakIcon className='photoIcon'/>
                                    }
                                </label>
                                    <input type="file" id='profileImage' className='imageInput' onChange={handleUploadProfileImage}/>                           
                                </div>
                            </div>
                            </div>
                            <div className='userInfo'>
                                <div>
                                    <h3 className='heading-3'>
                                        {loggedInUser[0]?.name ? loggedInUser[0]?.name:user && user?.displayName}
                                    </h3>
                                    <p className='usernameSection'>@{username}</p>
                                </div>
                                <EditProfile user={user} loggedInUser={loggedInUser}/>
                                </div>
                                <div className='infoContainer'>
                                    {loggedInUser[0]?.bio ? loggedInUser[0]?.bio:''}
                                    <div className='locationAndLink'>
                                        {loggedInUser[0]?.location ? <p className='subInfo'><MyLocationIcon/>{loggedInUser[0]?.location}</p> : ''}
                                        {loggedInUser[0]?.website ? <p className='subInfo link'><AddLinkIcon/>{loggedInUser[0]?.website}</p> : ''}
                                    </div>
                                </div>
                                <h4 className='tweetsText'>Tweets</h4>

                                <hr/>
                            </div>
                            {
                                posts.map((p,index) => <Posts key={p.id || index} p={p}/>)
                            }
                        </div>
                }
            </div>
        </div>
    </div>
  )
}

export default MainPage