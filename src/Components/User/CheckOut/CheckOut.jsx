import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar/Navbar'
import { useLocation } from 'react-router-dom'
import axios from 'axios'
import { userApi } from '../../../config/api'
import moment from 'moment'
import toast from 'react-hot-toast'
import Razorpay from 'razorpay'

function CheckOut() {
    const location = useLocation()
    const [bikeDetails, setBikeDetails] = useState({})
    const [bookingDetails,setBookingDeails] =useState(location.state.updatedData)
    const bike = bookingDetails.bike
    const [ponits,setPoints]=useState([])
    const [hours,setHours]=useState()
    const [rent,setRent]=useState(0)
    const [helmet,setHelmet]=useState(1)
    const [total,setTotal]=useState(rent)
    const [grandTotal,setGrandTotal]=useState(0)
    const [pickDropPoints,setPickDropPoints]=useState({pickUpPoint:"",dropPoint:""})
    

    const findBikeDetails = async () => {
        try {
            const response = await axios.get(`${userApi}getBikeDetails?id=${bike}`)
            if (response.data.success) {
                setBikeDetails(response.data.data)
                setPoints(response.data.locations)
                const rentAmount =calculateRent(response.data.data.rentPerHour)
                const tax=Math.floor(14/100*rentAmount)
                setGrandTotal(rentAmount+(2*tax))
                setRent(rentAmount)
                setTotal(rentAmount)
            }
            console.log(response.data.data);
        } catch (error) {

        }
    }

    useEffect(() => {
        findBikeDetails()
    }, [])
    
    const handleChange =(e)=>{

        if(e.target.name==='pickUpPoint'){
            setPickDropPoints({...pickDropPoints,pickUpPoint:e.target.value})
        }else{
            setPickDropPoints({...pickDropPoints,dropPoint:e.target.value})
        }

    }

    const calculateRent = (rentPerHour) => {
        const pickUpDateTime = moment(
            `${bookingDetails.pickUpDate} ${bookingDetails.pickUpTime}`,
            'YYYY-MM-DD hh:mm A'
        );
        const dropDateTime = moment(
            `${bookingDetails.dropDate} ${bookingDetails.dropTime}`,
            'YYYY-MM-DD hh:mm A'
        );
        const totalHours = dropDateTime.diff(pickUpDateTime, 'hours');
        setHours(totalHours)
        return totalHours*rentPerHour
    }

    const handleSubmit=()=>{
        
    }

    const createBooking=()=>{
        console.log("handle order");
    }

    return (
        <div className='w-full max-w-[1600px]'>
            <Navbar />
            <div className='w-full h-screen pt-5'>
                <div className='flex  flex-col md:flex-row  justify-center items-center'>
                    <div className='max-w-[750px] md:h-[24rem] p-2 bg-slate-100 w-[95%] rounded-lg mb-3 shadow-2xl border-2'>
                        <p className='text-center text-2xl font-bold py-3'>Booking summery</p>
                        <hr className='' />
                        <div className='w-full flex md:flex-row flex-col'>
                            <div className='w-[100%]  md:w-[40%] p-2'>
                                <p className='text-sm font-semibold underline py-1 text-center'>Bike</p>
                                <img className='rounded-lg' src={bikeDetails.image} alt="" />
                                <p className='text-gray-700 pl-1 pt-1'>{bikeDetails.brand} {bikeDetails.name}</p>


                            </div>
                            <div className='w-[100%] md:w-[60%] py-6'>
                                <div className=' flex justify-between px-2 py-2'>
                                    <div>
                                        <p className='font-semibold '>{bookingDetails.pickUpDate}</p>
                                        <p className='font-semibold '>{bookingDetails.pickUpTime}</p>
                                    </div>
                                    <p className='bg-yellow-300 p-2 font-bold rounded-full'>to</p>
                                    <div>
                                        <p className='font-semibold '>{bookingDetails.dropDate}</p>
                                        <p className='font-semibold '>{bookingDetails.dropTime}</p>

                                    </div>
                                </div>
                                <div className='flex flex-row justify-between pb-2'>
                                    <p className='px-2 font-semibold'>Pick up point</p>
                                    <select onChange={handleChange} className='bg-gray-200 p-1 rounded-md mr-1 font-semibold' name="pickUpPoint">
                                        <option value=''>select pick up location</option>
                                        {ponits.map((point)=><option value={point.name}>{point.name}</option>)}
                                    </select>
                                </div>
                                <div className='flex flex-row justify-between pb-2'>
                                    <p className='px-2 font-semibold'>Drop point</p>
                                    <select  onChange={handleChange}  className='bg-gray-200 p-1 rounded-md mr-1 font-semibold' name="dropPoint" >
                                        <option value=''>select drop location</option>
                                        {ponits.map((point)=><option value={point.name}>{point.name}</option>)}
                                    </select>
                                </div>
                                {hours<=24?<div className='flex flex-row justify-between pb-2'>
                                    <p className='px-2 font-semibold'>Minimum 24.0 hour charges applicable</p>
                                    <p className='px-2 font-semibold'>{rent}</p>
                                </div>:<div className='flex flex-row justify-between pb-2'>
                                    <p className='px-2 font-semibold'>Total rent for {hours} hours</p>
                                    <p className='px-2 font-semibold'>{rent}</p>
                                </div>}

                                <div className='flex flex-row justify-between'>
                                    <p className='px-2 font-semibold'>Number of Helmet (?)</p>
                                    <select onChange={(e)=>{
                                         e.target.value==="1"? setTotal(total-200):setTotal(rent+200)
                                         e.target.value==="1"? setGrandTotal(grandTotal-58):setGrandTotal(grandTotal+58)

                                         setHelmet(e.target.value)
        
                                       
                                        }}
                                     className='mx-2 w-[50px] bg-gray-200 p-1 rounded-md mr-1 font-semibold text-center' name="helmet">
                                
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                    </select>
                                </div>
                              

                                <div className='flex flex-row justify-between pb-2'>
                                    <p className='px-2 font-semibold'>Total</p>
                                    <p className='px-2 font-semibold'>{total}</p>
                                </div>
                                


                                <div className='flex flex-row justify-between'>
                                    <p className='px-2 font-semibold'>Km limit (?)</p>
                                    <p className='px-2 font-semibold'>120 km</p>
                                </div>
                                <div className='flex flex-row justify-between'>
                                    <p className='px-2 font-semibold'>Excess km charges (?)</p>
                                    <p className='px-2 font-semibold'>4.0/km</p>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className='w-[95%] md:w-[300px] md:h-[24rem] p-2 md:ml-3 mb-3 rounded-lg shadow-2xl  bg-slate-100  border-2'>
                        <p className='text-center text-2xl font-bold py-2'>Checkout</p>
                        <hr />

                       
                       {helmet==='2'? <div className='mt-2 flex flex-row justify-between'>
                            <p className='px-2'>Extra Helmet</p>
                            <p className='px-2'>200</p>
                        </div>: <div className='mt-2 flex flex-row justify-between'>
                            <p className='px-2'>Extra Helmet</p>
                            <p className='px-2'>nil</p>
                        </div>}
                        <div className='mt-2 flex flex-row justify-between'>
                            <p className='px-2'>Booking Fee</p>
                            <p className='px-2'>{total}</p>
                        </div>

                        <div className='mt-2 flex flex-row justify-between'>
                            <p className='px-2'>CGST(14%)</p>
                            <p className='px-2'>{Math.floor(14/100*total)}</p>
                        </div>
                        <div className='mt-2 flex flex-row justify-between'>
                            <p className='px-2'>SGST(14%)</p>
                            <p className='px-2'>{Math.floor(14/100*total)}</p>
                        </div>

                        <div className='mt-2 flex flex-row justify-between'>
                            <p className='px-2'>Discount Amount</p>
                            <p className='px-2'>0</p>
                        </div>
                        <div className='mt-2 flex flex-row justify-between'>
                            <p className='px-2'>Total Amount</p>
                            <p className='px-2'>{grandTotal}</p>
                        </div>
                        <div className='flex flex-row justify-between py-2 bg-black rounded-md mt-2'>
                            <input className='w-[15rem] ml-2 text-black placeholder:text-black p-1 rounded-md bg-slate-400' type="text" name="" id="" placeholder='Enter Coupon Code' />
                            <button className='mr-2 text-yellow-400 px-2 hover:text-yellow-300'>Apply</button>

                        </div>
                        <div className='mt-5 flex justify-center'>
                            <button onClick={handleSubmit} className=' bg-yellow-300 w-full py-2 rounded-md hover:bg-yellow-400 font-bold'>Make payment</button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default CheckOut