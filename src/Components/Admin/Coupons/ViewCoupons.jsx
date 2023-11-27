import React, { useState, useEffect } from 'react'
import SideBar from '../AdminSideBar/Sidebar'
import { AiOutlinePlusCircle } from 'react-icons/ai'


import { GiHamburgerMenu } from 'react-icons/gi'
import { AiOutlineClose } from 'react-icons/ai'
import Axios from 'axios'
import { adminApi } from '../../../config/api'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { useSelector } from 'react-redux'
import { TiDelete } from 'react-icons/ti'
import Swal from 'sweetalert2'
import axios from 'axios'


function ViewCoupons() {
  const [isOpen, setIsOpen] = useState(false)
  const [modalStatus, setModalStatus] = useState(false)
  const initialValues = { couponCode: "", couponName: "", limit: "", expireDate: "", minPurchase: "", discountValue: "", maxDiscount: "" }
  const [imgUrl, setImgUrl] = useState(null)
  const [imgCoupon, setImgCoupon] = useState(null)
  const [formValues, setFormValues] = useState(initialValues)
  const [coupons, setCoupons] = useState([])

  const fetchData = async (req, res) => {
    try {
      const response = await axios.get(`${adminApi}/coupons`)
      console.log(response.data);
      if (response.data.success) {
        setCoupons(response.data.data)
      }

    } catch (error) {
      console.log(error.message);

    }
  }
  useEffect(() => {
    fetchData()

  }, [])



  const navigate = useNavigate()
  
  const handleChange = (e) => {
    const { value, name } = e.target;
    const newvalue = value.trim()
    setFormValues({ ...formValues, [name]: newvalue, });
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!imgCoupon) {
      toast.error("select image")
    } else {
      const formData = new FormData()
      formData.append('image', imgCoupon)
      for (const [key, value] of Object.entries(formValues)) {
        formData.append(key, value)
      }
      const response = await axios.post(`${adminApi}/addCoupon`, formData)
      if (response.data.success) {
        setModalStatus(false)
        setImgCoupon(null)
        setImgUrl(null)
        fetchData()
        toast.success(response.data.message)
      }


    }


  }

  const handleImg = (e) => {
    const file = e.target.files[0]
    const url = URL.createObjectURL(file)
    setImgUrl(url)
    setImgCoupon(file)
  }

  const changestatus=async(id)=>{
    try {
     
      const response =await axios.get(`${adminApi}/changeCouponStatus?id=${id}`)
      if(response.data.success){
        toast.success(response.data.message)
        fetchData()
      }
      
    } catch (error) {
      console.log(error.message);
      
    }
  }
  const deleteCoupon=async(id)=>{
    try {
      
      const response =await axios.get(`${adminApi}/deleteCoupon?id=${id}`)
      if(response.data.success){
        toast.success(response.data.message)
        fetchData()
      }
      
    } catch (error) {
      console.log(error.message);
      
    }
  }




  return (
    <>
      <div className={`mx-auto flex w-full ${!isOpen ? 'justify-start' : 'justify-between'} `}>
        <div className={`${!isOpen ? 'none' : 'block'}`}>
          <SideBar isOpen={isOpen} />
        </div>
        <div className={`absolute flex ${!isOpen ? 'justify-start' : 'justify-end'}z-1  bg-yellow-300 w-[220px]`}>
          {!isOpen ? <GiHamburgerMenu size={35} onClick={() => setIsOpen(!isOpen)} /> : <AiOutlineClose size={35} onClick={() => setIsOpen(!isOpen)} />}
        </div>
        <div className={`text-4xl text-center ${!isOpen ? 'w-full' : 'w-[83%]'} bg-red-800 `}>
          <div className='w-full bg-yellow-300 '>
            <h1 className='p-2 text-2xl font-semibold'>COUPONS </h1>



            <div className='p-5 h-screen bg-yellow-200'>
              <div className="flex justify-end px-5 my-3">
                <button className="block text-white bg-emerald-400 hover:bg-emerald-600  font-medium rounded-lg text-sm px-3 py-2 text-center " type="button" onClick={() => setModalStatus(true)}>ADD NEW COUPON</button>
              </div>



              <div className={`flex justify-center items-center fixed top-0 left-0 right-0 z-50 ${modalStatus ? 'block' : 'hidden'} w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full`}>
                <div className="relative w-full max-w-md max-h-full">

                  <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <button type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="authentication-modal"
                      onClick={() => {

                        setModalStatus(false)
                      }}>
                      X
                      <span className="sr-only">Close modal</span>
                    </button>
                    <div className="px-6 py-6 lg:px-8">
                      <h3 className="text-center mb-4 text-xl font-medium text-gray-900 dark:text-emerald-500">Add Coupon</h3>
                      <form className="space-y-6">
                        <div className="photo-wrapper p-2 flex flex-col justify-center items-center ">
                          <div className=' flex justify-start'>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Coupon image </label>
                          </div>
                          <label className='absolute text-transparent hover:text-black ' htmlFor="profileFile"> <AiOutlinePlusCircle size={32} /></label>
                          <input onChange={handleImg} type="file" name='image' className='invisible hidden' id='profileFile' />
                          <img className="w-[15rem] h-30 rounded-lg mx-auto" src={imgUrl ? imgUrl : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyjIETUUbI4Zxo0mIbafwIS6P3gEfxazlf-21gorP2nH937_nWnGI9E7SpK9fHWDiGzXs&usqp=CAU"} alt='ss' />
                          <p className='text-[20px] text-gray-400'>{imgCoupon ? imgCoupon.name : ""}</p>
                        </div>
                        <div>
                          <div className=' flex justify-start'>
                            <label className="text-startmb-2 text-sm font-medium text-gray-900 dark:text-white">Coupon Name</label>
                          </div>
                          <input onChange={handleChange} type="text" name="couponName" value={formValues.couponName} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Enter Coupon Name" required />
                        </div>
                        <div>
                          <div className=' flex justify-start'>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Coupon Code</label>
                          </div>
                          <input onChange={handleChange} type="text" name="couponCode" value={formValues.couponCode} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Enter Coupon Code" required />
                        </div>

                        <div>
                          <div className=' flex justify-start'>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Discount value</label>
                          </div>
                          <input onChange={handleChange} type="number" value={formValues.discountValue} name="discountValue" placeholder="Enter Discount value" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
                        </div>
                        <div>
                          <div className=' flex justify-start'>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Min Purchase</label>
                          </div>
                          <input onChange={handleChange} type="number" value={formValues.minPurchase} name="minPurchase" placeholder="Enter Min Purchase" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
                        </div>

                        <div>
                          <div className=' flex justify-start'>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Max Discount</label>
                          </div>
                          <input onChange={handleChange} value={formValues.maxDiscount} type="number" name="maxDiscount" placeholder="Enter Max Discount" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
                        </div>
                        <div>
                          <div className=' flex justify-start'>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Expire Date</label>
                          </div>
                          <input onChange={handleChange} value={formValues.expireDate} type="date" name="expireDate" placeholder="Select Expire Date" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
                        </div>
                        <div>
                          <div className=' flex justify-start'>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Limit</label>
                          </div>
                          <input onChange={handleChange} value={formValues.limit} type="number" name="limit" placeholder="Enter Limit" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
                        </div>




                        <button onClick={handleSubmit} className="w-full text-white bg-emerald-300 hover:bg-emerald-600 focus:ring-4  font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-emerald-600 dark:hover:bg-emerald-600 dark:focus:ring-emerald-800">Save</button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>



              {coupons &&
                <div className='overflow-auto rounded-s-lg shadow '>
                  <table className='w-full'>
                    <thead className='bg-gray-50 border-b-2 border-gray-200'>
                      <tr>
                        <th className='w-24 p-3 text-sm font-semibold tracking-wide text-left'>Image</th>
                        <th className='w-24 p-3 text-sm font-semibold tracking-wide text-left'>C.Name</th>
                        <th className='w-24 p-3 text-sm font-semibold tracking-wide text-left'>C.Code</th>
                        <th className='p-3 w-24 text-sm font-semibold tracking-wide text-left'>Discount value</th>
                        <th className='w-24 p-3 text-sm font-semibold tracking-wide text-left'>Min Purchase</th>
                        <th className='w-24 p-3 text-sm font-semibold tracking-wide text-left'>Max Discount</th>
                        <th className='w-24 p-3 text-sm font-semibold tracking-wide text-left'>Expire Date</th>
                        <th className='w-24 p-3 text-sm font-semibold tracking-wide text-left'>Limit</th>
                        <th className='w-24 p-3 text-sm font-semibold tracking-wide text-left'>Status</th>
                        <th className='w-24 p-3 text-sm font-semibold tracking-wide text-left'>Delete</th>



                      </tr>
                    </thead>
                    <tbody className='divide-y divide-gray-100'>
                      {coupons.map((coupon) => {
                        return (
                          <tr key={coupon._id}>
                            <td className='p-3 whitespace-nowrap text-sm text-gray-700 text-left'><img className='w-30 h-20' src={coupon.image} alt="img" /></td>
                            <td className='p-3 whitespace-nowrap text-sm text-gray-700 text-left'>{coupon.couponName}</td>
                            <td className='p-3 whitespace-nowrap text-sm text-gray-700 text-left'>{coupon.couponCode}</td>
                            <td className='p-3 whitespace-nowrap text-sm text-gray-700 text-left'>{coupon.discountValue}</td>
                            <td className='p-3 whitespace-nowrap text-sm text-gray-700 text-left'>{coupon.minPurchase}</td>
                            <td className='p-3 whitespace-nowrap text-sm text-gray-700 text-left'>{coupon.maxDiscount}</td>
                            <td className='p-3 whitespace-nowrap text-sm text-gray-700 text-left'>{coupon.expireDate}</td>
                            <td className='p-3 whitespace-nowrap text-sm text-gray-700 text-left'>{coupon.limit}</td>
                            {coupon.status?<td className='p-3 whitespace-nowrap text-sm text-gray-700 text-left'><button onClick={()=>changestatus(coupon._id)} className='bg-red-600 rounded-sm p-1 text-white hover:bg-red-700 text-sm'>Deactivate</button></td>:<td className='p-3 whitespace-nowrap text-sm text-gray-700 text-left'><button  onClick={()=>changestatus(coupon._id)} className='bg-green-600 rounded-sm p-1 text-white hover:bg-green-700 text-sm'>Activate</button></td>}
                            <td className='p-3 whitespace-nowrap text-sm text-gray-700 text-left'><button onClick={()=>deleteCoupon(coupon._id)} className='text-red-600 font-bold'  >X</button></td>


                          </tr>

                        )

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

export default ViewCoupons