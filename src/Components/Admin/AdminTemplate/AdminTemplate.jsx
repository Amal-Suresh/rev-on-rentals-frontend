import React,{useState} from 'react'
import SideBar from '../AdminSideBar/SideBar'
import {GiHamburgerMenu} from 'react-icons/gi'
import {AiOutlineClose} from 'react-icons/ai'

function AdminTemplate() {
  const [isOpen,setIsOpen]=useState(false)
  
  
  return (
    <div className={`mx-auto flex w-full ${!isOpen?'justify-start':'justify-between'} `}>
       <div className={`${!isOpen?'none':'block'}`}>
       <SideBar isOpen={isOpen}/>
       </div>
       <div  className={`absolute flex ${!isOpen?'justify-start':'justify-end'}z-1   bg-red-600 w-[220px]`}>
       {!isOpen?<GiHamburgerMenu size={35}  onClick={()=>setIsOpen(!isOpen)}/>:<AiOutlineClose size={35} onClick={()=>setIsOpen(!isOpen)}/>}
       </div>
        <div className={`text-4xl text-center ${!isOpen? 'w-full':'w-[83%]'} bg-red-800 `}>
            <div className='w-full bg-green-600 '>
              <h1>Admin Dashboard</h1>
            </div>
        </div>
    </div>
  )
}

export default AdminTemplate