import React from 'react'
import Navbar from '../Navbar/Navbar'
import UserFooter from '../Footer/UserFooter'
import bikeImg from '../../../images/HusqvarnaVitpilen701.jpeg'
import {TbMessageChatbot} from 'react-icons/tb'


function Home() {
  return (
    <div className='flex flex-col max-w[1600px]'>
        <Navbar/>
        <div className=' flex justify-center items-center md:justify-start bg-cover bg-no-repeat bg-center h-[600px] w-full ' style={{ backgroundImage: `url(${bikeImg})` }}>
          <h1 className='text-yellow-200'>Plan Your Next Ride Now</h1>


       </div>
       <div className='w-20 fixed end-5 bottom-5 h-20 flex justify-center items-center bg-gray-700 rounded-full'>
        <TbMessageChatbot size={40} className='text-yellow-400' />
        
       </div>

        <UserFooter/>  
    </div>

  
    
   
  )
}

export default Home