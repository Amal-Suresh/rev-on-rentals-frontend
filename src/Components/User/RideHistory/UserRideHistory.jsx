import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import Axios from 'axios';
import { userApi } from '../../../config/api';
import { useNavigate } from 'react-router-dom';

function UserRideHistory() {
    const [userBookings, setUserBookings] = useState([])
    const [reviews, setReviews] = useState(new Map());
    const navigate=useNavigate()

    const user = useSelector((store) => store.user.userD)
    const token = user.token;
    const retriveBookings = async () => {
        try {

            const response = await Axios.post(`${userApi}userRides`, null, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.data.success) {

                setUserBookings(response.data.data)
                console.log(response.data.doneReviews,":::::::::::::::::::::::::::::::::::::::::::::");
                insertDataIntoMap(response.data.doneReviews)

            }
        } catch (error) {
            console.log(error.message);
        }
    }

    const insertDataIntoMap = (data) => {
        const newMap = new Map(reviews);
        data.forEach((item) => {
          newMap.set(item); 
        });
        setReviews(newMap);
      };
      


    const handleRideStatus=async(id)=>{
        try {
            const response = await Axios.post(`${userApi}cancelRide`, {order:id}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.data.success) {
                    const updatedUserBookings = [...userBookings];
                    const index = updatedUserBookings.findIndex((booking) => booking._id === id);
                    if (index !== -1) {
                      updatedUserBookings[index].status = "cancelled";
                      setUserBookings(updatedUserBookings);
                    }
               }; 
        } catch (error) {
            
        }

    }
    const handleRating=(bookingId,userId,bikeId)=>{
        let data={
            bookingId,
            userId,
            bikeId
        }
        navigate('/orderRatingReview',{state:{data}})
        
    }


    useEffect(() => {
        retriveBookings()
    }, [])
    return (
        
        <div className='bg-yellow-100 rounded-lg h-screen overflow-y-scroll w-full md:w-[65%]'>
            {userBookings && userBookings.map((booking) => {
                return (
                    <div key={booking._id} className='mb-3 bg-slate-600 rounded-md'>


                        <div className='w-full flex justify-center mb-3'>
                            <div className='bg-yellow-900-400 pl-2 flex rounded-xl flex-col md:flex-row bg-white w-[95%] '>


                                <div className='flex justify-evenly w-full md:w-[50%] items-center my-2 '>
                                    <p className='w-[20%] text-sm font-bold'>FROM :</p>
                                    <div className='w-[40%]'>
                                        <h4 name="pickUpDate" className='h-[37px] p-2' type="date">{new Date(booking.pickUpDate).toISOString().split('T')[0]}</h4>
                                    </div>
                                    <div className='w-[40%]'>
                                        <h4 name="pickUpDate" className='h-[37px] p-2' type="date">{booking.pickUpTime}</h4>
                                    </div>
                                </div>


                                <div className='flex w-full md:w-[50%] justify-evenly items-center'>
                                    <p className='w-[18%] text-sm font-bold'>TO :</p>
                                    <div className='w-[40%]'>
                                        <h4 name="pickUpDate" className='h-[37px] p-2' type="date">{new Date(booking.dropDate).toISOString().split('T')[0]}</h4>
                                    </div>
                                    <div className='w-[40%]'>
                                        <h4 name="pickUpDate" className='h-[37px] p-2' type="date">{booking.dropTime}</h4>
                                    </div>


                                </div>
                                <div className='flex justify-center p-2 md:p-0'>
                            
                                    {booking.status==="booked" && <button onClick={()=>{handleRideStatus(booking._id)}} className='bg-yellow-300  rounded-lg hover:bg-yellow-400 hover:text-black font-semibold px-5 py-2 md:h-full md:rounded-r-lg  text-white'>Cancel</button>} 
                                    {booking.status==="completed" && !reviews.has(booking._id) && <button onClick={()=>{handleRating(booking._id,booking.user,booking.bike._id)}} className='bg-yellow-300  rounded-lg hover:bg-yellow-400 hover:text-black font-semibold px-5 py-2 md:h-full md:rounded-r-lg  text-white'>Rate Now</button>} 
                                </div>

                            </div>



                        </div>
                        <div className='flex flex-row justify-evenly px-5 border-b-2 pb-3' >
                            <p className='text-sm font-semibold text-center mt-4 text-yellow-400'>CITY:<span className='text-white ml-2'>{booking.city}</span></p>
                            <p className='text-sm font-semibold text-center mt-4  text-yellow-400'>Pick Up Point:<span className='text-white ml-2'>{booking.pickUpPoint}</span></p>
                            <p className='text-sm font-semibold text-center mt-4  text-yellow-400'>Drop Point:<span className='text-white ml-2'>{booking.dropPoint}</span></p>
                        </div>
                        <div className='flex px-5 justify-evenly'>
                            <div className='flex flex-col justify-start'>
                                <p className='text-sm font-semibold text-start text-yellow-400'>Bike Name:<span className='text-white ml-2'>{booking.bike.name}</span></p>
                                <p className='text-sm font-semibold text-start text-yellow-400'>Bike Brand:<span className='text-white ml-2'>{booking.bike.brand}</span></p>
                                <p className='text-sm font-semibold text-start text-yellow-400'>Rent Per Hour:<span className='text-white ml-2'>{booking.bike.rentPerHour} rs</span></p>
                                <p className='text-sm font-semibold text-start text-yellow-400'>Bike Brand:<span className='text-white ml-2'>{booking.bike.engineCC} CC</span></p>
                                <p className='text-sm font-semibold text-start text-yellow-400'>Payment Method:<span className='text-white ml-2'>{booking.paymentMethod}</span></p>
                                <p className='text-sm font-semibold text-start text-yellow-400'>Payment Status:<span className='text-white ml-2'>{booking.paymentStatus}</span></p>
                                <p className='text-sm font-semibold text-start text-yellow-400'>Ride Status:<span className='text-white ml-2'>{booking.status}</span></p>
                                <p className='text-sm font-semibold text-start text-yellow-400'>Discount Amount:<span className='text-white ml-2'>{booking.discountAmount}</span></p>
                                <p className='text-sm font-semibold text-start text-yellow-400'>Total Amount:<span className='text-white ml-2'>{booking.totalAmount}</span></p>

                               
                            </div>

                            <p className='text-sm font-semibold text-center mt-4'></p>
                            <div className='flex md:flex-row flex-col justify-center items-center md:justify-evenly'>
                                <div className='flex justify-center flex-col   w-[70%] p-3'>
                                    <img className="w-full h-40 rounded-md  mx-auto" src={booking.bike.image[0]} alt="John Doe" />
                                </div>

                            </div>
                        </div>
                    </div>

                )



            })}


        </div>
    )
}

export default UserRideHistory