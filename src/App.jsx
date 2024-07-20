import { useState } from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import {Login,Signup} from './components/index'
import Home from './components/Home'
import './App.css'
import ProtectRoutes from './components/ProtectRoutes'
import LoadingPage from './components/LoadingPage'
import Feed from './components/Feed/Feed'
import Explore from './components/Explore/Explore'
import Notifications from './components/Notifications/Notifications'
import Messages from './components/Messages/Messages'
import Bookmarks from './components/Bookmarks/Bookmarks'
import Lists from './components/Lists/Lists'
import Profile from './components/Profile/Profile'
import More from './components/More/More'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<ProtectRoutes><Home/></ProtectRoutes>}>
            <Route index element={<Feed/>}/>
          </Route>
          <Route path='/home' element={<ProtectRoutes><Home/></ProtectRoutes>}>
            <Route path='feed' element={<Feed/>}/>
            <Route path='explore' element={<Explore/>}/>
            <Route path='notifications' element={<Notifications/>}/>
            <Route path='messages' element={<Messages/>}/>
            <Route path='bookmarks' element={<Bookmarks/>}/>
            <Route path='lists' element={<Lists/>}/>
            <Route path='profile' element={<Profile/>}/>
            <Route path='more' element={<More/>}/>
          </Route>
          <Route path='/login' element={<Login/>}/>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/loading' element={<LoadingPage/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
