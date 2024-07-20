import React, { useState} from 'react'
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box'
import './EditProfile.css'
import { Button, IconButton, TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import axios from 'axios';

const style={
  positiom:'absolute',
  top:'50%',
  left:'50%',
  transform:'translate(90%,5%)',
  width:600,
  height:650,
  bgcolor:'background.paper',
  boxShadow:24,
  borderRadius:8
}

const EditChild = ({dob,setDob})=>{
  const [open,setOpen] = useState(false)

  const handleOpen = () =>{
    setOpen(!false)
  }

  const handleClose = () =>{
    setOpen(false)
  }

  return (
    <React.Fragment>
      <div className='birthdate-section' onClick={handleOpen}>
        <text>Edit</text>
      </div>
      <Modal
        hideBackdrop
        open={open}  
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"        
      >
        <Box sx={{...style,width: 300,height:350}}>
          <div className='text'>
            <h2>Edit date of birth?</h2>
            <p>This can only be changed a few times. <br/>
                Make sure you enter the age of the 
                person using account</p>
            <input 
              type='date'
              onChange={e=>setDob(e.target.value)}
            />
            <Button className='e-button' onClick={()=>{setOpen(false)}}>Cancel</Button>
          </div>
        </Box>
      </Modal>
    </React.Fragment>
  )
}

function EditProfile({user,loggedInUser}) {
  const [open,setOpen] = useState(false)
  const [name,setName] = useState('');
  const [bio,setBio] = useState('');
  const [location,setLocation] = useState('');
  const [website,setWebsite] = useState('');
  const [dob,setDob] = useState('');

  const HandleSave = async() => {
    const editedInfo = {
      name,
      bio,
      location,
      website,
      dob
    }
    if(editedInfo){
      await axios.patch(`https://twitter-clone-backend-ywdx.onrender.com/userUpdates/${user?.email}`,editedInfo)
      setOpen(!true)
    }
  }

  return (
    <div>
      <button className='Edit-profile-btn' onClick={()=>setOpen(true)}>Edit Profile</button>
      <Modal
        open={open}  
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className='modal'>
          <div className='header'> 
            <IconButton onClick={(prev)=>{setOpen(!prev)}}><CloseIcon/></IconButton>
            <h2 className='header-title'>Edit Profile</h2>
            <button className='save-btn' onClick={HandleSave}>Save</button>
          </div>
          <form className='fill-content'>
            <TextField className='text-field' fullWidth label='Name' id="fullWidth" variant='filled' onChange={(e)=>{
              setName(e.target.value)}} defaultValue = {loggedInUser[0]?.name?loggedInUser[0]?.name:'' }/>
            <TextField className='text-field' fullWidth label='Bio' id="fullWidth" variant='filled' onChange={(e)=>{
              setBio(e.target.value)}} defaultValue = {loggedInUser[0]?.bio?loggedInUser[0]?.bio:'' }/>
            <TextField className='text-field' fullWidth label='Location' id="fullWidth" variant='filled' onChange={(e)=>{
              setLocation(e.target.value)}} defaultValue = {loggedInUser[0]?.location?loggedInUser[0]?.location:'' }/>
            <TextField className='text-field' fullWidth label='Website' id="fullWidth" variant='filled' onChange={(e)=>{
              setWebsite(e.target.value)}} defaultValue = {loggedInUser[0]?.website?loggedInUser[0]?.website:'' }/>
          </form>
          <div className='birthdate-section'>
            <p>Birth Date</p>
            <p>.</p>
            <EditChild dob={dob} setDob={setDob}/>
          </div>
          <div className='last-section'>
            {
              loggedInUser[0]?.dob?
              <h2>{loggedInUser[0]?.dob}</h2>:
              <h2>
                {
                  dob?dob:'Add your date of birth'
                }
              </h2>
            }
            <div className='last-btn'>
              <h2>Switch to professional</h2>
              <ChevronRightIcon/>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  )
}

export default EditProfile