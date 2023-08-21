import React from 'react'
import {Routes,Route} from 'react-router-dom'
import PartnerDashboardPage from '../Pages/Partner/PartnerDashboardPage'
import PartnerLoginPage from '../Pages/Partner/PartnerLoginPage'
import PartnerAddBikesPage from '../Pages/Partner/PartnerAddBikesPage'
import PartnerViewBikesPage from '../Pages/Partner/PartnerViewBikesPage'
import PartnerNewPassPage from '../Pages/Partner/PartnerNewPassPage'
import PartnerForgetOtpPage from '../Pages/Partner/PartnerForgetOtpPage'

function Partner() {
  return (
  <Routes>
    <Route path='/' element={<PartnerDashboardPage/>}/>
    <Route path='/login' element={<PartnerLoginPage/>}/>
    <Route path='/bikes' element={<PartnerViewBikesPage/>}/>
    <Route path='/addBikes' element={<PartnerAddBikesPage/>}/>
    <Route path='/forgotpass' element={<PartnerNewPassPage/>}/>
    <Route path='/verifyForgotOtp' element={<PartnerForgetOtpPage/>}/>


  </Routes>
  )
}

export default Partner