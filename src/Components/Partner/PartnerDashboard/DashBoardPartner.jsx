import React, { useState } from 'react'
import SideBarPartner from '../PartnerSideBar/SideBarPartner'
import { GiHamburgerMenu } from 'react-icons/gi'
import { AiOutlineClose } from 'react-icons/ai'
import Chart from '../PartnerDashboard/Chart'
import PieChart from '../PartnerDashboard/PieChart'


function DashBoardPartner() {
  const [isOpen, setIsOpen] = useState(false)
  const datas=[
    {
      id:1,
      day:"monday",
      bokings:10,
      cancelled:2,
    },
    {
      id:2,
      day:"tuesday",
      bokings:19,
      cancelled:9,
    },
    {
      id:3,
      day:"wednesday",
      bokings:18,
      cancelled:2,
    },
    {
      id:4,
      day:"thesday",
      bokings:10,
      cancelled:2,
    },
    {
      id:5,
      day:"friday",
      bokings:15,
      cancelled:6,
    },
    {
      id:6,
      day:"satuerday",
      bokings:16,
      cancelled:8,
    },
    {
      id:7,
      day:"sunday",
      bokings:79,
      cancelled:10,
    },

  ]

  const [bookings,setBooking] =useState({
    labels:datas.map((data)=>data.day),
    datasets:[{
      label:"bookings",
      data:datas.map((data)=>data.bokings),
      backgroundColor:['blue','red','gray','purple','green']
    }]
    
  })
  return (
    <div>
      <div className={`mx-auto flex w-full ${!isOpen ? 'justify-start' : 'justify-between'} `}>
        <div className={`${!isOpen ? 'none' : 'block'}`}>
          <SideBarPartner isOpen={isOpen} />
        </div>
        <div className={`absolute flex ${!isOpen ? 'justify-start' : 'justify-end'}z-1  bg-yellow-300 w-[220px]`}>
          {!isOpen ? <GiHamburgerMenu size={35} onClick={() => setIsOpen(!isOpen)} /> : <AiOutlineClose size={35} onClick={() => setIsOpen(!isOpen)} />}
        </div>
        <div className={`text-4xl text-center ${!isOpen ? 'w-full' : 'w-[83%]'}`}>
          <div className='w-full bg-yellow-300 '>
            <h1 className='py-2 text-3xl font-semibold'>Partner Dashboard</h1>
          </div>


          <div className='w-full flex justify-evenly p-2 py-5 border border-b-yellow-400'>

            <div className='h-[6rem] p-1 w-[12rem] bg-black rounded-lg'>
              <p className='text-[20px]  text-white font-semibold'>Total bookings</p>
              <p className='font-bold text-white'>10000</p>
            </div>

            <div className='h-[6rem] p-1 w-[12rem]  bg-black rounded-lg'>
              <p className='text-[20px] text-white font-semibold'>Number of Bikes</p>
              <p className='font-bold text-white'>10000</p>
            </div>

            <div className='h-[6rem] p-1 w-[12rem]  bg-black rounded-lg'>
              <p className='text-[20px] text-white font-semibold'>Hided bike</p>
              <p className='font-bold text-white'>10000</p>
            </div>

            <div className='h-[6rem] p-1 w-[12rem]  bg-black rounded-lg'>
              <p className='text-[20px] text-white font-semibold'>Total Revenu</p>
              <p className='font-bold text-white'>10000</p>
            </div>

          </div>
          

          <div className='w-full h-[25rem] flex'>
            <div className='w-[50%] pl-2'>
              <p className='text-black underline font-semibold text-[20px]'>weekly sales</p>
              <Chart chartData={bookings}/>

            </div>
            <div  className='w-[50%] flex flex-col items-center'>
            <p className='text-black underline font-semibold text-[20px]'>booking & cancel ratio</p>


           <div className='w-full flex justify-center'>
            <PieChart chartData={bookings}/>
           </div>


            </div>
          </div>


        </div>
      </div>

    </div>
  )
}

export default DashBoardPartner