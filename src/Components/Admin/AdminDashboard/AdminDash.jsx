import React, { useState,useEffect } from 'react'
import SideBar from '../AdminSideBar/Sidebar'
import { GiHamburgerMenu } from 'react-icons/gi'
import { AiOutlineClose } from 'react-icons/ai'
import Chart from '../../Partner/PartnerDashboard/Chart'
import PieChart from '../../Partner/PartnerDashboard/PieChart'
import axios from 'axios'
import { adminApi } from '../../../config/api'


function AdminDash() {
  const [isOpen, setIsOpen] = useState(false)
  const [dashDetails,setDashDetails]=useState({})
  const [weekly,setWeekly]=useState('')
  const [monthly,setMonthly]=useState('')
  
  const bookingBikesRevenuCount=async()=>{
    const response=await axios.get(`${adminApi}/fetchBookingBikesRevenu`)
    if(response.data.success){
      let datas=response.data.currentWeek
      console.log(datas);
      setWeekly({
        labels:datas.map((data)=>data.dayName),
        datasets:[{
          label:"bookings",
          data:datas.map((data)=>data.count),
          backgroundColor:['#0af5f5']
        }]
        
      })
      setDashDetails(response.data.data)
    } 
  }

  const monthlySalesRatio=async()=>{
    const response=await axios.get(`${adminApi}/monthlySalesRatio`)
    if(response.data.success){
      let values=response.data.data
      setMonthly({
          labels:['cancelled','completed'],
          datasets:[{
            label:"bookings",
            data:[values.cancelled,values.completed],
            backgroundColor:['#f50a0a','#0af53d']
          }]
          
        })

    }
    
  }

  
  useEffect(()=>{
    bookingBikesRevenuCount()
    monthlySalesRatio()
   
  },[])




  return (
    <>
      <div className={`mx-auto flex w-full ${!isOpen ? 'justify-start' : 'justify-between'} `}>
        <div className={`${!isOpen ? 'none' : 'block'}`}>
          <SideBar isOpen={isOpen} />
        </div>
        <div className={`absolute flex ${!isOpen ? 'justify-start' : 'justify-end'}z-1  w-[220px]`}>
          {!isOpen ? <GiHamburgerMenu size={35} onClick={() => setIsOpen(!isOpen)} /> : <AiOutlineClose size={35} onClick={() => setIsOpen(!isOpen)} />}
        </div>
        <div className={`text-4xl text-center ${!isOpen ? 'w-full' : 'w-[83%]'}`}>
          <div className='w-full'>
            <h1 className='p-2 text-2xl font-semibold bg-yellow-300'> Admin Dashboard</h1>
            <div className='w-full flex justify-evenly p-2 py-5 border border-b-yellow-400'>

            <div className='h-[6rem] p-1 w-[12rem] bg-black rounded-lg'>
              <p className='text-[20px]  text-white font-semibold'>Total bookings</p>
            <p className='font-bold text-white'>{dashDetails.totalBookingCount}</p>
            </div>

            <div className='h-[6rem] p-1 w-[12rem]  bg-black rounded-lg'>
              <p className='text-[20px] text-white font-semibold'>Partner Count</p>
              <p className='font-bold text-white'>{dashDetails.totalPartners}</p>
            </div>

            <div className='h-[6rem] p-1 w-[12rem]  bg-black rounded-lg'>
              <p className='text-[20px] text-white font-semibold'>User Count</p>
              <p className='font-bold text-white'>{dashDetails.totalUsers}</p>
            </div>

            <div className='h-[6rem] p-1 w-[12rem]  bg-black rounded-lg'>
              <p className='text-[20px] text-white font-semibold'>Total Sales</p>
              <p className='font-bold text-white'>{dashDetails.totalRevenu}</p>
            </div>

          </div>
          <div className='w-full h-[25rem] flex'>
            <div className='w-[50%] pl-2'>
              <p className='text-black underline font-semibold text-[20px]'>weekly sales</p>
              {weekly && <Chart  chartData={weekly}/>}

            </div>
            <div  className='w-[50%] flex flex-col items-center'>
            <p className='text-black underline font-semibold text-[20px]'>booking & cancel ratio</p>


           <div className='w-full flex justify-center'>
           {monthly && <PieChart  chartData={monthly}/>}
            
           </div>


            </div>
          </div>

              
          </div>
        </div>
      </div>
    </>
  )
}

export default AdminDash