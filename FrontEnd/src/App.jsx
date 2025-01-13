import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Start'
import Usersignup from './pages/Usersignup'
import Userlogin from './pages/Userlogin'
import Captainlogin from './pages/Captainlogin'
import Captainsignup from './pages/Captainsignup'
import Start from './pages/Start'
import Userprotectedw from './pages/Userprotectedw'
import Userlogout from './pages/Userlogout'
import CaptainHome from './pages/CaptainHome'
import CaptainProtectedw from './pages/Captainprotectedw'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Start/>}/>
        <Route path='/login' element={<Userlogin/>}/>
        <Route path='/signup' element={<Usersignup/>}/>
        <Route path='/captain-login' element={<Captainlogin/>}/>
        <Route path='/captain-signup' element={<Captainsignup/>}/>
        <Route path='/home' element={
          <Userprotectedw>
            <Home />
          </Userprotectedw>
        }/>
        <Route path='/user/logout' element={
          <Userprotectedw>
            <Userlogout/>
          </Userprotectedw>}/>
        <Route path='/captain-home' element={
          <CaptainProtectedw>
            <CaptainHome/>
          </CaptainProtectedw>
        }/>
      </Routes>
    </div>
  )
}

export default App
