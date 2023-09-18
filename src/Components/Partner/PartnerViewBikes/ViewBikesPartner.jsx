import React, { useState, useEffect } from 'react'
import SideBarPartner from '../PartnerSideBar/SideBarPartner'
import { GiHamburgerMenu } from 'react-icons/gi'
import { AiOutlineClose } from 'react-icons/ai'
import Axios from 'axios'
import { partnerApi } from '../../../config/api'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { useSelector } from 'react-redux'


function ViewBikesPartner() {
  const partner = useSelector((store) => store.partner.partnerD)
  const token = partner.token
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false)
  const [bikes, setbikes] = useState([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)


  const findBikes = async () => {
    try {
      const response = await Axios.get(`${partnerApi}/viewBikes?page=${page}`, {
        headers: {
          Authorization: `Bearer ${token}`
        },
      })
      if (response.data.success) {

        setbikes(response.data.data.bikes)
        setPage(response.data.data.page)
        setTotalPages(response.data.data.totalPages)
        toast.success(response.data.message)
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
    }
  }
  const handleStatus = async (id) => {
    try {
      const response = await Axios.get(`${partnerApi}/changeStatus?id=${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      if (response.data.success) {
        const updatedRequest = response.data.updatedData
        const updatedDocumentIdString = updatedRequest._id.toString();
        const updatedIndex = bikes.findIndex(request => request._id.toString() === updatedDocumentIdString)
        const updatedDocuments = [...bikes]
        updatedDocuments[updatedIndex] = updatedRequest
        setbikes(updatedDocuments)
        toast.success(response.data.message)
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
    }
  }

  const handleClick = (index) => {
    setPage(index + 1)
  }

  useEffect(() => {
    findBikes()
  }, [page])

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
            <h1 className='p-2 text-2xl font-semibold'>Partner Bikes</h1>
            <div className='w-full flex h-full  bg-yellow-200 pt-2 justify-end'>
              <button onClick={() => { navigate("/partner/addBikes") }} className='px-3 py-2 bg-green-600 rounded-xl text-sm text-white font-semibold hover:bg-green-700 mr-5'>add bikes</button>

            </div>

            <div className='p-5  bg-yellow-200'>


              {bikes &&
                <div className='overflow-auto rounded-s-lg shadow '>
                  <table className='w-full'>
                    <thead className='bg-gray-50 border-b-2 border-gray-200'>
                      <tr>
                        <th className='w-24 p-3 text-sm font-semibold tracking-wide text-left'>Image</th>
                        <th className='w-24 p-3 text-sm font-semibold tracking-wide text-left'>Name</th>
                        <th className='w-24 p-3 text-sm font-semibold tracking-wide text-left'>Brand</th>
                        <th className='w-24 p-3 text-sm font-semibold tracking-wide text-left'>Category</th>
                        <th className='w-24 p-3 text-sm font-semibold tracking-wide text-left'>Make Year</th>
                        <th className='w-24 p-3 text-sm font-semibold tracking-wide text-left'>Rent Per Hour</th>
                        <th className='w-24 p-3 text-sm font-semibold tracking-wide text-left'>Plate Number</th>
                        <th className='w-24 p-3 text-sm font-semibold tracking-wide text-left'>Engine CC</th>
                        <th className='w-24 p-3 text-sm font-semibold tracking-wide text-left'>Actions</th>
                      </tr>
                    </thead>
                    <tbody className='divide-y divide-gray-100'>
                      {bikes.map((bike) => {
                        return (
                          <tr key={bike._id}>
                            <td className='p-3 whitespace-nowrap text-sm text-gray-700 text-left'><img src={`${bike.image[0]}`} alt="bikeImg" /></td>
                            <td className='p-3 whitespace-nowrap text-sm text-gray-700 text-left'>{bike.name}</td>
                            <td className='p-3 whitespace-nowrap text-sm text-gray-700 text-left'>{bike.brand}</td>
                            <td className='p-3 whitespace-nowrap text-sm text-gray-700 text-left'>{bike.category}</td>
                            <td className='p-3 whitespace-nowrap text-sm text-gray-700 text-left'>{bike.makeYear}</td>
                            <td className='p-3 whitespace-nowrap text-sm text-gray-700 text-left'>{bike.rentPerHour}</td>
                            <td className='p-3 whitespace-nowrap text-sm text-gray-700 text-left'>{bike.plateNumber}</td>
                            <td className='p-3 whitespace-nowrap text-sm text-gray-700 text-left'>{bike.engineCC}</td>
                            {bike.status ? <td className='p-3 whitespace-nowrap text-sm text-gray-700 text-left'><button onClick={() => handleStatus(bike._id)} className='bg-red-600 rounded-sm p-1 text-white hover:bg-red-700 text-sm'>Hide</button></td> : <td className='p-3 whitespace-nowrap text-sm text-gray-700 text-left'><button onClick={() => handleStatus(bike._id)} className='bg-green-600 rounded-sm p-1 text-white hover:bg-green-700 text-sm'>Unhide</button></td>}
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              }
            
              <div className='max-w-[1600px] bg-gray-500 py-1 flex justify-center'>
                {totalPages > 0 &&
                  [...Array(totalPages)].map((val, index) => (
                    <button
                      className={`${page === index + 1 ? 'bg-black' : 'bg-black'} text-sm py-2 px-4 rounded-md m-1 text-white ${page === index + 1 ? 'font-bold' : 'font-normal'} focus:outline-none focus:ring focus:ring-offset-2`}
                      key={index}
                      onClick={() => handleClick(index)}
                    >
                      {index + 1}
                    </button>
                  ))}
              </div>

            </div>
          </div>
        </div>
      </div>
    </>

  )
}

export default ViewBikesPartner