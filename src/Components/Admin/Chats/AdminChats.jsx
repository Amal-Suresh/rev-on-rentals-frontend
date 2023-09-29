import React, { useState, useEffect } from 'react'
import SideBar from '../AdminSideBar/Sidebar'
import { GiHamburgerMenu } from 'react-icons/gi'
import { AiOutlineClose } from 'react-icons/ai'
import Axios from 'axios'
import { adminApi } from '../../../config/api'
import { toast } from 'react-hot-toast'
import {io} from 'socket.io-client'
import { socketApi } from '../../../config/api'

function AdminChats() {
  const Socket = io.connect(socketApi)
  const [isOpen, setIsOpen] = useState(false)
  const [chats, setChats] = useState([])
  const [individualChat, setIndividualChat] = useState([])
  const [textToSent, setTextToSent] = useState('')

  const fetchChats = async (req, res) => {
    try {
      const response = await Axios.get(`${adminApi}/fetchChat`)
      if (response.data.success) {
        setChats(response.data.data)
      }
    } catch (error) {
      console.log(error.message);
    }
  }


  const fetchIndividualChat = async (id) => {
    try {
      const response = await Axios.get(`${adminApi}/fetchIndividualChat?id=${id}`)
      if (response.data.success) {
        setIndividualChat(response.data.data)
      } else {
        console.log(response);
      }

    } catch (error) {
      console.log(error.message);
    }
  }

  const handleOnChange = (e) => {
    const { value } = e.target
    setTextToSent(value)
  }

  const sendMessage = async () => {
    
      if(textToSent!==''){
      const userId= individualChat[0]?.user
      console.log(userId,"user id admin side");
      const newMessage = {
        user:userId,
        text: textToSent,
        sender:"Admin",
      };
      await Socket.emit('send_message', newMessage);
      setTextToSent('')
      }else{
        toast.success("message box can't be null")
      }

   
  }

  useEffect(() => {
    // Listen for incoming messages from the server
     Socket.on('receive_message', (data) => {
      setIndividualChat((prevMessages) => [...prevMessages, data]);
    });
   return()=>{
    Socket.disconnect()
  }

  }, [textToSent]);



  // const sendMessage = async () => {
  //   if (!textToSent) {
  //     toast.error("type some text to sent")
  //   } else {
  //     const id = individualChat[0].user
  //     const data = {
  //       id,
  //       textToSent
  //     }
  //     const response = await Axios.post(`${adminApi}/replyToUser`, data)
  //     if (response.data.success) {
  //       setIndividualChat(response.data.data)
  //       toast.success("message sented successfully")
  //     }
  //   }
  // }

  useEffect(() => {
    fetchChats()
  }, [])

  return (
    <>
      <div className={`mx-auto flex w-full h-full ${!isOpen ? 'justify-start' : 'justify-between'} `}>
        <div className={` h-full${!isOpen ? 'none' : 'block'}`}>
          <SideBar isOpen={isOpen} />
        </div>
        <div className={`absolute flex ${!isOpen ? 'justify-start' : 'justify-end'}z-1   w-[220px]`}>
          {!isOpen ? <GiHamburgerMenu size={35} onClick={() => setIsOpen(!isOpen)} /> : <AiOutlineClose size={35} onClick={() => setIsOpen(!isOpen)} />}
        </div>
        <div className={`text-4xl text-center ${!isOpen ? 'w-full' : 'w-[83%]'} bg-red-800 `}>
          <div className='w-full bg-yellow-300 '>
            <h1 className='p-2 text-2xl font-semibold'>Chats</h1>

            <div className='px-5 h-[27rem] w-full bg-white flex '>
              <div className='w-[30%] bg-gray-200 h-full overflow-y-scroll'>
                {chats && chats.map((chat) => (
                  <div key={chat.userDetails._id} onClick={() => { fetchIndividualChat(chat.userDetails._id) }} className='w-full flex bg-slate-400 items-center px-2 border '>
                    <div className=''>
                      <img className='w-16 h-16 rounded-full' src={`${chat.userDetails.image}`} alt="" />
                    </div>
                    <div className='flex flex-col w-[90%]'>
                      <div className='flex flex-row justify-between w-full px-3'>
                        <p className='text-[19px] font-bold'>{chat.userDetails.fname} {chat.userDetails.lname}</p>
                        <p className='text-[10px]'>10:00 am</p>
                      </div>
                      <div className='px-4 flex justify-start'>
                        <p className='text-[15px] text-start'>{chat.text}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className='w-[70%] bg-gray-700 h-full '>
                <div className='w-full bg-gray-200 h-full px-3 py-2 overflow-y-scroll'>
                  {individualChat && individualChat.map((message) =>
                  (
                    <div className={`w-full flex  ${message.sender === "Admin" ? 'justify-end' : 'justify-start'}   pt-1`}>
                      <div className={`${message.sender === 'Admin' ? ' bg-slate-300 rounded-l-md rounded-br-md' : '  bg-slate-100 rounded-r-md rounded-bl-md '} h-auto ml-2 px-3 flex flex-col items-center `}>
                        <p className='text-start text-[20px]'>{message.text}</p>

                        <div className='flex justify-end w-full'>
                          <p className='text-[8px]'>10:00 am</p>
                        </div>

                      </div>
                    </div>
                  )
                  )}
                </div>
                <div className=' bottom-0 end-0 w-full h-16'>
                  <div className=' my-1 flex justify-center items-center py-2 '>
                    <div className='border border-black rounded-full w-[82%] pl-2'>
                      <input onChange={handleOnChange} value={textToSent} className='w-[80%] text-lg my-2 px-3 outline-none rounded-l-lg ' type="text" placeholder='Type a message' />
                      <button onClick={sendMessage} className='ml-6 text-[20px] font-bold bg-yellow-300 hover:bg-yellow-400 pr-16 pl-2 pt-3 pb-2 rounded-r-full'>send</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default AdminChats