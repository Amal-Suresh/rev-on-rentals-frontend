import React, { useState, useEffect } from 'react'
import SideBarPartner from '../PartnerSideBar/SideBarPartner'
import { GiHamburgerMenu } from 'react-icons/gi'
import { AiOutlineClose } from 'react-icons/ai'
import Axios from 'axios'
import { partnerApi } from '../../../config/api'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { useSelector } from 'react-redux'


function BookingsByUser() {
  const partner = useSelector((store) => store.partner.partnerD)
  const token = partner.token
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false)
  const [bookings, setBookings] = useState([])



  const findBookings = async () => {
    try {
      const response = await Axios.get(`${partnerApi}/findBookings`, {
        headers: {
          Authorization: `Bearer ${token}`
        },
      })
      if (response.data.success) {
        setBookings(response.data.data)
        toast.success(response.data.message)
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
    }
  }


  const handleStatus = async (id, e) => {
    try {
      const value=e.target.value
      const data={
        value,
        id:id 
      }
      
      console.log(id);

      const response = await Axios.post(`${partnerApi}/changeBookingStatus`,data, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      if (response.data.success) {
        const updatedBookings = bookings.map((booking) => {
          if (booking._id === id) {
            return {
              ...booking,
              status: value,
            };
          }
          return booking;
        });
        setBookings(updatedBookings);
        toast.success(response.data.message)
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
    }
  }





  useEffect(() => {
    findBookings()
  }, [])






  return (
    <>
      <div className={`mx-auto flex w-full ${!isOpen ? 'justify-start' : 'justify-between'} `}>
        <div className={`${!isOpen ? 'none' : 'block'}`}>
          <SideBarPartner isOpen={isOpen} />
        </div>
        <div className={`absolute flex ${!isOpen ? 'justify-start' : 'justify-end'}z-1  bg-yellow-300 w-[220px]`}>
          {!isOpen ? <GiHamburgerMenu size={35} onClick={() => setIsOpen(!isOpen)} /> : <AiOutlineClose size={35} onClick={() => setIsOpen(!isOpen)} />}
        </div>
        <div className={`text-4xl text-center ${!isOpen ? 'w-full' : 'w-[83%]'} bg-red-800 `}>
          <div className='w-full bg-yellow-300 '>
            <h1 className='p-2 text-2xl font-semibold'>BOOKINGS</h1>


            <div className='p-5  h-screen bg-yellow-200'>


              {bookings &&
                <div className='overflow-auto rounded-s-lg shadow '>
                  <table className='w-full'>
                    <thead className='bg-gray-50 border-b-2 border-gray-200'>
                      <tr>
                        <th className='w-24 p-3 text-sm font-semibold tracking-wide text-left'>USER-DETAILS</th>
                        <th className='w-24 over text-sm font-semibold tracking-wide text-left'>BIKE-DETAILS</th>
                        <th className='w-24 p-3 text-sm font-semibold tracking-wide text-left'>PICK-UP</th>
                        <th className='w-24 p-3 text-sm font-semibold tracking-wide text-left'>DROP</th>
                        <th className='w-24 p-3 text-sm font-semibold tracking-wide text-left'>total</th>
                        <th className='w-24 p-3 text-sm font-semibold tracking-wide text-left'>Status</th>
                        <th className='w-24 p-3 text-sm font-semibold tracking-wide text-left'>view</th>

                      </tr>
                    </thead>
                    <tbody className='divide-y divide-gray-100'>

                      {bookings.map((booking) => {
                        return (
                          <tr key={booking._id}>
                            <td className='p-3 whitespace-nowrap text-sm text-gray-700 text-left'>
                              <p><span className='font-semibold'>name :</span> {booking?.user?.fname} {booking?.user?.lname}</p>
                              <p><span className='font-semibold'>email :</span> {booking?.user?.mobile}</p>
                            </td>

                            <td className='py-3 whitespace-nowrap  text-sm text-gray-700 text-left'>

                              <p><span className='font-semibold'>name :</span> {booking?.bike?.name}</p>
                              <p><span className='font-semibold'>brand :</span> {booking?.bike?.brand} </p>
                              <p><span className='font-semibold'>reg no :</span>{booking?.bike?.plateNumber}</p>

                            </td>

                            <td className='p-3 whitespace-nowrap text-sm text-gray-700 text-left'>
                              <p><span className='font-semibold'>date :</span> {new Date(booking?.pickUpDate).toISOString().split('T')[0]}</p>
                              <p><span className='font-semibold'>time :</span> {booking?.pickUpTime} </p>
                              <p><span className='font-semibold'>location :</span> {booking?.pickUpPoint}</p>
                            </td>
                            <td className='p-3 whitespace-nowrap text-sm text-gray-700 text-left'>
                              <p><span className='font-semibold'>date :</span>{new Date(booking?.dropDate).toISOString().split('T')[0]}</p>
                              <p><span className='font-semibold'>time :</span> {booking?.dropTime} </p>
                              <p><span className='font-semibold'>location :</span>{booking?.dropPoint}</p>
                            </td>
                            <td className='p-3 whitespace-nowrap text-sm text-gray-700 text-left'>

                              <p>{booking.totalAmount}</p>

                            </td>
                            <td className='p-3 whitespace-nowrap text-sm text-gray-700 text-left'>


                              <select
                                id="countries"
                                value={booking.status}
                                onChange={(e) => handleStatus(booking._id, e)}
                                disabled={booking.status === 'cancelled' ||booking.status === 'completed'  }
                                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                              >
                                {booking.status==="cancelled" && <option value="">{booking?.status }</option>}
                                <option value="">{booking?.status }</option>
                                <option value="cancelled">Cancelled</option>
                                <option value="completed">Completed</option>
                              </select>


                            </td>

                            <td className='p-3 whitespace-nowrap text-sm text-gray-700 text-left'><button onClick={() => handleStatus(booking._id)} className='bg-blue-600 rounded-sm p-1 text-white hover:bg-blue-700 text-sm'>view</button></td>

                          </tr>
                        );
                      })}


                    </tbody>
                  </table>
                </div>
              }

            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default BookingsByUser