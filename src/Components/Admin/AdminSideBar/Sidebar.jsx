import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {removeAdmin} from '../../../utils/adminSlice'
function SideBar(props) {
  const navigate =useNavigate()
  const dispatch =useDispatch()
  const handleAdminLogout=()=>{
    dispatch(removeAdmin())
    localStorage.removeItem('token')
  }

 
  return (
    <>
    {props.isOpen &&
   
    <div className={`top-0 absolute left-0 z-2  bg-yellow-300 w-[220px] h-full py-10 ${props.isOpen ? 'translate-x-0':'translate-x-full'} ease-in-out duration-300`}>
        <div>
          <p className='hover:text-white px-10 py-2  bg-yellow-300 hover:bg-slate-500 cursor-pointer w-full' onClick={()=>navigate('/admin/')}>Dashboard</p>
          <p className='hover:text-white px-10 py-2  bg-yellow-300 hover:bg-slate-500 cursor-pointer w-full' onClick={()=>navigate('/admin/users')}>User</p>
          <p className='hover:text-white px-10 py-2  bg-yellow-300 hover:bg-slate-500 cursor-pointer w-full' onClick={()=>navigate('/admin/partnerRequests')}>Partner Request</p>
          <p className='hover:text-white px-10 py-2  bg-yellow-300 hover:bg-slate-500 cursor-pointer w-full'  onClick={()=>navigate('/admin/partnerVerifiedList')}>Partners</p>
          <p className='hover:text-white px-10 py-2  bg-yellow-300 hover:bg-slate-500 cursor-pointer w-full'  onClick={()=>navigate('/admin/coupons')}>Coupons</p>
          <p className='hover:text-white px-10 py-2  bg-yellow-300 hover:bg-slate-500 cursor-pointer w-full'  onClick={()=>navigate('/admin/chats')}>Chats</p>
          <p className='hover:text-white px-10 py-2  bg-yellow-300 hover:bg-slate-500 cursor-pointer w-full'  onClick={handleAdminLogout}>Logout</p>


          <p></p>
          <p></p>
        </div>
    </div>

    }
    </>
  )
}

export default SideBar;