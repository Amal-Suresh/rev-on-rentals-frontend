import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {removePartner} from '../../../utils/partnerSlice'



function SideBarPartner(props) {
  const dispatch=useDispatch()
    const navigate =useNavigate()

    const handlePartnerLogout=()=>{
      dispatch(removePartner())
      localStorage.removeItem('token')
    }
 
  return (
    <div className='h-full'>
  {props.isOpen &&
   
   <div className={`top-0 absolute left-0 z-2  bg-yellow-300 w-[220px] h-full py-10 ${props.isOpen ? 'translate-x-0':'translate-x-full'} ease-in-out duration-300`}>

       <div>
         <p className='hover:text-white px-10 py-2  bg-yellow-300 hover:bg-slate-500 cursor-pointer w-full' onClick={()=>navigate('/partner/')}>Dashboard</p>
         <p className='hover:text-white px-10 py-2  bg-yellow-300 hover:bg-slate-500 cursor-pointer w-full' onClick={()=>navigate('/partner/profile')}>Profile</p>
         <p className='hover:text-white px-10 py-2  bg-yellow-300 hover:bg-slate-500 cursor-pointer w-full' onClick={()=>navigate('/partner/bikes')}>Bikes</p>
         <p className='hover:text-white px-10 py-2  bg-yellow-300 hover:bg-slate-500 cursor-pointer w-full'  onClick={()=>navigate('/partner/bookings')}>Bookings</p>
         <p className='hover:text-white px-10 py-2  bg-yellow-300 hover:bg-slate-500 cursor-pointer w-full'  onClick={handlePartnerLogout}>Logout</p>

         <p></p>
         <p></p>
       </div>
   </div>

   }
    </div>
  )
}

export default SideBarPartner