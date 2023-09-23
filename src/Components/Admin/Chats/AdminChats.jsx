import React, { useState, useEffect } from 'react'
import SideBar from '../AdminSideBar/Sidebar'
import { GiHamburgerMenu } from 'react-icons/gi'
import { AiOutlineClose } from 'react-icons/ai'
import Axios from 'axios'
import { adminApi } from '../../../config/api'
import { toast } from 'react-hot-toast'


function AdminChats() {

  const [isOpen, setIsOpen] = useState(false)

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
              <div className='w-[30%] bg-blue-400 h-full overflow-y-scroll'>

                <div className='w-full flex bg-slate-400 items-center px-2 border '>

                  <div className='w-16 h-16 bg-orange-400 rounded-full'>
                  </div>

                  <div className='flex flex-col w-[90%]'>
                    <div className='flex flex-row justify-between w-full px-3'>
                      <p className='text-[19px] font-bold'>Amal Suresh</p>
                      <p className='text-[10px]'>10:00 am</p>
                    </div>
                    <div className='px-4 flex justify-start'>
                      <p className='text-[15px] text-start'>hai</p>
                    </div>

                  </div>

                </div>

                {/*99999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999  */}
                <div className='w-full flex bg-slate-400 items-center px-2 border '>
                  <div>
                    <img className='w-16 h-16 rounded-full' src="https://wallpapers.com/images/high/cool-profile-picture-1ecoo30f26bkr14o.webp" alt="" />
                  </div>
                  <div className='flex flex-col w-[90%]'>
                    <div className='flex flex-row justify-between w-full px-3'>
                      <p className='text-[19px] font-bold'>Amal Suresh</p>
                      <p className='text-[10px]'>10:00 am</p>
                    </div>
                    <div className='px-4 flex justify-start'>
                      <p className='text-[15px] text-start'>hai</p>
                    </div>
                  </div>
                </div>

                <div className='w-full flex bg-slate-400 items-center px-2 border '>
                  <div>
                    <img className='w-16 h-16 rounded-full' src="https://wallpapers.com/images/high/cool-profile-picture-1ecoo30f26bkr14o.webp" alt="" />
                  </div>
                  <div className='flex flex-col w-[90%]'>
                    <div className='flex flex-row justify-between w-full px-3'>
                      <p className='text-[19px] font-bold'>Amal Suresh</p>
                      <p className='text-[10px]'>10:00 am</p>
                    </div>
                    <div className='px-4 flex justify-start'>
                      <p className='text-[15px] text-start'>hai</p>
                    </div>
                  </div>
                </div>

                <div className='w-full flex bg-slate-400 items-center px-2 border '>
                  <div>
                    <img className='w-16 h-16 rounded-full' src="https://wallpapers.com/images/high/cool-profile-picture-1ecoo30f26bkr14o.webp" alt="" />
                  </div>
                  <div className='flex flex-col w-[90%]'>
                    <div className='flex flex-row justify-between w-full px-3'>
                      <p className='text-[19px] font-bold'>Amal Suresh</p>
                      <p className='text-[10px]'>10:00 am</p>
                    </div>
                    <div className='px-4 flex justify-start'>
                      <p className='text-[15px] text-start'>hai</p>
                    </div>
                  </div>
                </div>

                <div className='w-full flex bg-slate-400 items-center px-2 border '>
                  <div>
                    <img className='w-16 h-16 rounded-full' src="https://wallpapers.com/images/high/cool-profile-picture-1ecoo30f26bkr14o.webp" alt="" />
                  </div>
                  <div className='flex flex-col w-[90%]'>
                    <div className='flex flex-row justify-between w-full px-3'>
                      <p className='text-[19px] font-bold'>Amal Suresh</p>
                      <p className='text-[10px]'>10:00 am</p>
                    </div>
                    <div className='px-4 flex justify-start'>
                      <p className='text-[15px] text-start'>hai</p>
                    </div>
                  </div>
                </div>

                <div className='w-full flex bg-slate-400 items-center px-2 border '>
                  <div>
                    <img className='w-16 h-16 rounded-full' src="https://wallpapers.com/images/high/cool-profile-picture-1ecoo30f26bkr14o.webp" alt="" />
                  </div>
                  <div className='flex flex-col w-[90%]'>
                    <div className='flex flex-row justify-between w-full px-3'>
                      <p className='text-[19px] font-bold'>Amal Suresh</p>
                      <p className='text-[10px]'>10:00 am</p>
                    </div>
                    <div className='px-4 flex justify-start'>
                      <p className='text-[15px] text-start'>hai</p>
                    </div>
                  </div>
                </div>

                <div className='w-full flex bg-slate-400 items-center px-2 border '>
                  <div>
                    <img className='w-16 h-16 rounded-full' src="https://wallpapers.com/images/high/cool-profile-picture-1ecoo30f26bkr14o.webp" alt="" />
                  </div>
                  <div className='flex flex-col w-[90%]'>
                    <div className='flex flex-row justify-between w-full px-3'>
                      <p className='text-[19px] font-bold'>Amal Suresh</p>
                      <p className='text-[10px]'>10:00 am</p>
                    </div>
                    <div className='px-4 flex justify-start'>
                      <p className='text-[15px] text-start'>hai</p>
                    </div>
                  </div>
                </div>
                <div className='w-full flex bg-slate-400 items-center px-2 border '>
                  <div>
                    <img className='w-16 h-16 rounded-full' src="https://wallpapers.com/images/high/cool-profile-picture-1ecoo30f26bkr14o.webp" alt="" />
                  </div>
                  <div className='flex flex-col w-[90%]'>
                    <div className='flex flex-row justify-between w-full px-3'>
                      <p className='text-[19px] font-bold'>Amal Suresh</p>
                      <p className='text-[10px]'>10:00 am</p>
                    </div>
                    <div className='px-4 flex justify-start'>
                      <p className='text-[15px] text-start'>hai</p>
                    </div>
                  </div>
                </div>

                {/*99999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999  */}









              </div>
              <div className='w-[70%] bg-gray-700 h-full '>
                <div className='w-full bg-gray-200 h-full px-3 py-2 overflow-y-scroll'>

                  <div className='w-full flex justify-start pt-1'>
                    <div className='w-8 h-8 bg-slate-400 rounded-full'>
                    </div>

                    <div className='w-[50%] h-8 ml-2 bg-slate-500 px-1 rounded-lg'>
                      <p className='text-start text-[10px]'>hai</p>
                    </div>
                  </div>

                  <div className='w-full flex justify-end pt-1'>
                    <div className='w-[50%] h-8 mr-2 bg-blue-500 px-1 rounded-lg'>
                      <p className='text-end  text-[10px]'>hai</p>
                    </div>
                    <div className='w-8 h-8 bg-blue-400 rounded-full'>
                    </div>
                  </div>

                </div>
                <div className=' bottom-0 end-0 w-full h-16'>
                  <div className=' my-1 flex justify-center items-center py-2 '>
                    <div className='border border-black rounded-full w-[82%] pl-2'>
                      <input className='w-[80%] text-lg my-2 px-3 outline-none rounded-l-lg ' type="text" placeholder='Type a message' />
                      <button className='ml-6 text-[20px] font-bold bg-yellow-300 hover:bg-yellow-400 pr-16 pl-2 pt-3 pb-2 rounded-r-full'>send</button>
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