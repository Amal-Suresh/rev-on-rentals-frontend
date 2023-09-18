import React,{useEffect} from 'react'
import {Routes,Route} from 'react-router-dom'
import UserHome from '../Pages/User/UserHome'
import JoinUs from '../Components/User/JoinUs/JoinUs'
import UserTariff from '../Pages/User/UserTariff'
import UserRegisterPage from '../Pages/User/UserRegisterPage'
import UserLoginPage from '../Pages/User/UserLoginPage'
import RegisterOtpPage from '../Pages/User/RegisterOtpPage'
import UserViewBikesPage from '../Pages/User/UserViewBikesPage'
import UserProfilePage from '../Pages/User/UserProfilePage'
import { useDispatch,useSelector } from 'react-redux'
import { addUser } from '../utils/userSlice'
import CheckOutPage from '../Pages/User/CheckOutPage'
import UserNewPasswordPage from '../Pages/User/UserNewPasswordPage'
import UserForgotPassOtpPage from '../Pages/User/UserForgotPassOtpPage'
import PaymentSuccessPage from '../Pages/User/PaymentSuccessPage'
import OrderRatingPage from '../Pages/User/OrderRatingPage'
import axios from 'axios'
import { userApi } from '../config/api'


function User() {
  const dispatch =useDispatch()
  const checkIfUser =async(token)=>{
    const response =await axios.post(`${userApi}checkIfUser`,null,{
      headers: {
        Authorization: `Bearer ${token}`
    }
    })
    if(response.data.success){
        dispatch(addUser({ token: response.data.data.token, username: response.data.data.name }));
    }
  }

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem('token'));
    token && checkIfUser(token)
    
   
  }, []);
  const user = useSelector(store=>store.user.userD)
  const userToken =user.token
  return (
    <Routes>
        <Route path='/' element={<UserHome/>} />
        <Route path='/join-us'element={<JoinUs/>}/>
        <Route path='/tariff' element={<UserTariff/>}/>
        <Route path='/login' element={userToken?<UserHome/>:<UserLoginPage/>}/>
        <Route path='/register' element={userToken?<UserHome/>:<UserRegisterPage/>}/>
        <Route path='/otp' element={userToken?<UserHome/>:<RegisterOtpPage/>}/>
        <Route path='/viewBikes' element={<UserViewBikesPage/>}/>
        <Route path='/userProfile' element={userToken?<UserProfilePage/>:<UserLoginPage/>}/>
        <Route path='/checkOut' element={<CheckOutPage/>}/>
        <Route path='/forgotPassword' element={<UserNewPasswordPage/>}/>
        <Route path='/verifyForgetPassword' element={<UserForgotPassOtpPage/>}/>
        <Route path='/paymentSuccess' element={<PaymentSuccessPage/>}/>
        <Route path='/orderRatingReview' element={<OrderRatingPage/>}/>
    </Routes>
    
  )
}

export default User