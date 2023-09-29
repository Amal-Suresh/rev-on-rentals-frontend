import React,{useEffect, useState} from 'react'
import Navbar from '../Navbar/Navbar'
import UserFooter from '../Footer/UserFooter'
import axios from 'axios'
import { userApi } from '../../../config/api'
import { useNavigate } from 'react-router-dom'



function Tariff() {
    const navigate=useNavigate()

    const [tariff,setTariff]=useState([])
    const findBikes=async()=>{
        try {
            const responce =await axios.get(`${userApi}getTariff`)
            if(responce.data.success){
                setTariff(responce.data.data)
            }
        } catch (error) {
            console.log(error.message);
            
        }
    }

    useEffect(()=>{
        findBikes()

    },[])
    return (
        <div className='-z-0 bg-black'>
            <Navbar />
            <div className='w-full flex justify-center'>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-[1500px]'>
                    {tariff?.map((bike)=>(
                         <div className='p-1 m-1 rounded border-2 border-gray-900   bg-yellow-300'>
                         <div className='flex w-full justify-center'>
                             <p className='font-semibold'>{bike.name}</p>
                         </div>
 
                         <div  className="block rounded-lg bg-gray-500 ">
                             <div className="relative overflow-hidden bg-cover bg-no-repeat" >
                                 <img className="rounded-t-lg  -z-0 relative "
                                     src={bike.image[0]}
                                     alt="..." />
 
                             </div>
                             <div className='px-2 text-white font-semibold'>
                                 <p>Amount {bike.rentPerHour} Per Hour </p>
            
                             </div>
                             <div className="p-1">
                                 <button onClick={()=>{navigate('/viewBikes')}} className="w-full rounded font-bold py-1 hover:bg-black hover:text-yellow-400 bg-yellow-400">BOOK NOW</button>
                             </div>
                         </div>
                     </div>
                    ))

                    }
                   
                   
                </div>

            </div>


            <UserFooter />
        </div>

    )
}
export default Tariff