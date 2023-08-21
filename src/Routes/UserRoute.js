import React from 'react'
import {Routes,Route} from 'react-router-dom'
import UserHome from '../Pages/User/UserHome'
import JoinUs from '../Components/User/JoinUs/JoinUs'
import UserTariff from '../Pages/User/UserTariff'
// import UserOtpPage from '../Pages/User/UserOtpPage'
import UserRegisterPage from '../Pages/User/UserRegisterPage'
import UserLoginPage from '../Pages/User/UserLoginPage'
import RegisterOtpPage from '../Pages/User/RegisterOtpPage'
import UserViewBikesPage from '../Pages/User/UserViewBikesPage'

function User() {
  return (
    <Routes>
        <Route path='/' element={<UserHome/>} />
        <Route path='/join-us'element={<JoinUs/>}/>
        <Route path='/tariff' element={<UserTariff/>}/>
        {/* <Route path='/otp' element={<UserOtpPage/>}/> */}
        <Route path='/login' element={<UserLoginPage/>}/>
        <Route path='/register' element={<UserRegisterPage/>}/>
        <Route path='/otp' element={<RegisterOtpPage/>}/>
        <Route path='/viewBikes' element={<UserViewBikesPage/>}/>

    </Routes>
    
  )
}

export default User