import React, { useState } from 'react'
import Navbar from '../Navbar/Navbar'
import UserFooter from '../Footer/UserFooter'
import bikeImg from '../../../images/HusqvarnaVitpilen701.jpeg'
import { TbMessageChatbot } from 'react-icons/tb'
import { CgCloseO } from 'react-icons/cg'
import { GrSend } from 'react-icons/gr'


function Home() {
  const [chatOpen, setchatOpen] = useState(false)
  return (
    <div className='flex flex-col max-w[1600px]'>
      <Navbar />
      <div className=' flex justify-center items-center md:justify-start bg-cover bg-no-repeat bg-center h-[600px] w-full ' style={{ backgroundImage: `url(${bikeImg})` }}>
        <h1 className='text-yellow-200'>Plan Your Next Ride Now</h1>


      </div>

      {chatOpen && <div className='w-[20rem] h-[24rem] fixed end-2 rounded-lg bottom-10 bg-gray-100'>
        <div className='w-full flex justify-between pt-2 px-2'>
          <p className='text-xl text-yellow-400 font-bold'>CHAT WITH US</p>

          <CgCloseO onClick={() => { setchatOpen(false) }} size={24} className='text-black' />
        </div>

        <div className='h-[19rem] w-[20rem] bg-gray-200 px-1 py-2'>

          <div className='w-full flex justify-center pt-1'>
            <div className='w-8 h-8 bg-slate-400 rounded-full'>
            </div>
            <div className='w-[80%] h-8 ml-2 bg-slate-500 px-1 rounded-lg'>
              <p>hai</p>
            </div>
          </div>

          <div className='w-full flex justify-center pt-1'>
            <div className='w-[80%] h-8 mr-2 bg-blue-500 px-1 rounded-lg'>
              <p>hai</p>
            </div>
            <div className='w-8 h-8 bg-blue-400 rounded-full'>
            </div>
          </div>

        </div>
        <div className='flex items-center justify-center'>
          <input className='w-[75%] text-sm focus:outline-none border border-slate-300 px-3 py-2 rounded-l-lg' type="text" placeholder='Ask Something ?' />
          <button className='w-[20%] bg-black flex justify-center text-yellow-300 font-bold py-2 rounded-r-lg '>send</button>
        </div>

      </div>}
      {!chatOpen && <div onClick={() => { setchatOpen(true) }} className='w-20 fixed end-5 bottom-5 h-20 flex justify-center items-center bg-gray-700 rounded-full'>
        <TbMessageChatbot size={40} className='text-yellow-400' />

      </div>}






      <UserFooter />
    </div>




  )
}

export default Home