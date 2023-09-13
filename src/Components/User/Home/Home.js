import React from 'react'
import Navbar from '../Navbar/Navbar'
import UserFooter from '../Footer/UserFooter'

function Home() {
  return (
    <div className='flex flex-col max-w[1600px]'>
        <Navbar/>
        <h1 className='text-red-500 text-2xl'>{process.env.REACT_APP_RAZORPAY_KEY} fgfgf</h1>
        <UserFooter/>  
    </div>

  
    
   
  )
}

export default Home