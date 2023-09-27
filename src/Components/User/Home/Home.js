import React, { useState, useEffect } from 'react'
import Navbar from '../Navbar/Navbar'
import UserFooter from '../Footer/UserFooter'
import bikeImg from '../../../images/HusqvarnaVitpilen701.jpeg'
import { TbMessageChatbot } from 'react-icons/tb'
import { CgCloseO } from 'react-icons/cg'
import axios from 'axios'
import { userApi } from '../../../config/api'
import { useSelector } from 'react-redux'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

function Home() {
  const [chatOpen, setchatOpen] = useState(false)
  const [message, setMessage] = useState('')
  const [userChats, setUserChats] = useState([])
  const [obj, setObj] = useState([])
  const navigate=useNavigate()

  const user = useSelector((store) => store.user.userD)

  const handleChange = (e) => {
    const { value } = e.target
    setMessage(value)
  }

  const fetchChat = async (token) => {
    try {
      const response = await axios.get(`${userApi}fetchIndividualChat`, {
        headers: {
          Authorization: `Bearer ${token}`
        }

      })
      if (response.data.success) {
        setUserChats(response.data.data)
        toast.success(response.data.message)
      } else {
        toast.error(response.data.message)

      }

    } catch (error) {
      console.log(error.message);

    }
  }

  const findBikes = async () => {
    try {
      const response = await axios.get(`${userApi}ourFleet`)
      if (response.data.success) {
        setObj(response.data.data)
      }

    } catch (error) {
      console.log(error.message);

    }
  }



  const handleClick = async () => {
    const token = user?.token
    const response = await axios.post(`${userApi}sendMessage`, { message: message }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    if (response.data.success) {
      setUserChats(response.data.data)
      toast.success(response.data.message)

    } else {
      toast.error(response.data.data)
    }
  }


  useEffect(() => {
    const token = user?.token
    token && fetchChat(token)
    findBikes()

  }, [user])

  return (
    <div className='flex flex-col max-w[1600px]'>
      <Navbar />
      <div className=' md:justify-start bg-cover bg-no-repeat bg-center h-[600px] w-full ' style={{ backgroundImage: `url(${bikeImg})` }}>
        <h1 className='text-yellow-400 mt-[12rem] ml-6 drop-shadow-lg text-[3rem] font-bold  '>Plan Your Next Ride Now</h1>
<div className='w-[83%] flex justify-center'>
<button onClick={()=>navigate('/viewBikes')} className='bg-black font-bold text-[1rem] px-4 py-3 cursor-pointer hover:border border-yellow-400  rounded-sm text-white'>BOOK NOW</button>

</div>
      </div>


      <div className='bg-black '>
        <p className='text-center font-bold text-white text-[3rem] mt-10'>OUR FLEET</p>
        <div className='grid py-5 md:py-8  grid-cols-1 px- sm:grid-cols-2  md:grid-cols-3 lg:grid-cols-4 max-w-[1500px]'>


          {obj && obj.map((bike) => {
            return (
              <div key={bike._id} className='p-1 m-1 rounded border-2 border-gray-900  bg-yellow-300'>
                <div className='flex w-full justify-center'>
                  <p className='font-semibold'>{bike.name}</p>
                </div>

                <div className="block rounded-lg bg-gray-500">
                  <div className="relative overflow-hidden bg-cover bg-no-repeat" >
                    <img className="rounded-t-lg relative"
                      src={`${bike.image[0]}`}
                      alt="..." />

                  </div>
                  <div className='px-2 text-white font-semibold'>
                    <p>Amount {bike.rentPerHour} Per Hour </p>
                    <p>Engine {bike.engineCC} CC </p>
                  </div>
                  <div className="p-1">
                    <button onClick={()=>navigate('/viewBikes')} className="w-full rounded font-bold py-1 hover:bg-black hover:text-yellow-400 bg-yellow-400">BOOK NOW</button>
                  </div>
                </div>
              </div>
            )
          })
          }


        </div>
      </div>

      {chatOpen && <div className='w-[20rem] h-[24rem] fixed end-2 rounded-lg bottom-10 bg-gray-100'>
        <div className='w-full flex justify-between pt-2 px-2'>
          <p className='text-xl text-yellow-400 font-bold'>CHAT WITH US</p>
          <CgCloseO onClick={() => { setchatOpen(false) }} size={24} className='text-black' />
        </div>

        <div className='h-[19rem] w-[20rem] bg-gray-200 px-1 py-2 overflow-y-scroll'>
          {userChats && userChats.map((message) =>
          (
            <div className={`w-full flex  ${message.sender === "User" ? 'justify-end' : 'justify-start'}   pt-1`}>
              {/* 
              {message.sender === 'Admin' && <div className='w-8 h-8 bg-slate-400 rounded-full'>
              </div>} */}

              <div className={`ml-2 min-w-[5rem] bg-slate-300 px-2 py-1  flex flex-col ${message.sender === 'Admin' ? 'rounded-r-md rounded-bl-md' : 'rounded-l-md rounded-br-md'} `}>
                <p className='text-start text-[15px]'>{message.text}</p>

                <div className='flex justify-end w-full'>
                  <p className='text-[8px] font-semibold italic'>10:00 am {message.sender === "User" && <span className='pl-1 text-blue-800'>&#10003;&#10003;</span>}</p>
                </div>
              </div>
              {/* {message.sender === 'Admin' && <div className='w-8 h-8 bg-blue-400 rounded-full'></div>} */}
            </div>

          )
          )}

          {/* <div className='w-full flex justify-center pt-1'>
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
          </div> */}

        </div>

        <div className='flex items-center justify-center'>
          <input onChange={handleChange} className='w-[75%] text-sm focus:outline-none border border-slate-300 px-3 py-2 rounded-l-lg' type="text" placeholder='Ask Something ?' />
          <button onClick={handleClick} className='w-[20%] bg-black flex justify-center text-yellow-300 font-bold py-2 rounded-r-lg '>send</button>
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