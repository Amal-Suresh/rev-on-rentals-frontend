import React,{useEffect} from 'react'
import {Routes,Route} from 'react-router-dom'
import UserHome from '../Pages/User/UserHome'
import JoinUs from '../Components/User/JoinUs/JoinUs'
import UserTariff from '../Pages/User/UserTariff'
// import UserOtpPage from '../Pages/User/UserOtpPage'
import UserRegisterPage from '../Pages/User/UserRegisterPage'
import UserLoginPage from '../Pages/User/UserLoginPage'
import RegisterOtpPage from '../Pages/User/RegisterOtpPage'
import UserViewBikesPage from '../Pages/User/UserViewBikesPage'
import UserProfilePage from '../Pages/User/UserProfilePage'
import { useDispatch,useSelector } from 'react-redux'
import { addUser } from '../utils/userSlice'
import CheckOutPage from '../Pages/User/CheckOutPage'



function User() {
  const dispatch =useDispatch()

  useEffect(() => {
    const userDetails = JSON.parse(localStorage.getItem('user'));
    if (userDetails) {
      dispatch(addUser({ token: userDetails.token, username: userDetails.username }));
    }
  }, []);
  const user = useSelector(store=>store.user.userD)
  
  console.log(user.token,"here is the user details");
  return (
    <Routes>
        <Route path='/' element={<UserHome/>} />
        <Route path='/join-us'element={<JoinUs/>}/>
        <Route path='/tariff' element={<UserTariff/>}/>
        {/* <Route path='/otp' element={<UserOtpPage/>}/> */}
        <Route path='/login' element={user.token?<UserHome/>:<UserLoginPage/>}/>
        <Route path='/register' element={user.token?<UserHome/>:<UserRegisterPage/>}/>
        <Route path='/otp' element={<RegisterOtpPage/>}/>
        <Route path='/viewBikes' element={<UserViewBikesPage/>}/>
        <Route path='/userProfile' element={user.token?<UserProfilePage/>:<UserLoginPage/>}/>
        <Route path='/checkOut' element={<CheckOutPage/>}/>

    </Routes>
    
  )
}

export default User