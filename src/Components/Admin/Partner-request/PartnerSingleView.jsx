import React,{ useState } from 'react'
import { useLocation } from 'react-router-dom'
import SideBar from '../AdminSideBar/Sidebar'
import { GiHamburgerMenu } from 'react-icons/gi'
import { AiOutlineClose } from 'react-icons/ai'
import  Axios  from 'axios'
import { adminApi } from '../../../config/api'
import { toast } from 'react-hot-toast'
import { FaMapLocationDot } from 'react-icons/fa6'



const PartnerSingleView = () => {
  const [isOpen, setIsOpen] = useState(false)
  const location=useLocation()
  const PartnerData=location?.state?.data
  const [partner,setPartner] =useState(PartnerData)
   
  
    const verifiyPartner=async(email)=>{
      const response = await Axios.get(`${adminApi}/verifyPartner?email=${email}`)
      if(response.data.success){
        setPartner((prevPartner) => ({
          ...prevPartner,
          isVerifed: !prevPartner.isVerifed,
        }));
        toast.success(response.data.message)
      }else{
        toast.error(response.data.message)
      }
    }
  return (
    <>
      <div className={`mx-auto flex w-full ${!isOpen ? 'justify-start' : 'justify-between'} `}>
        <div className={`${!isOpen ? 'none' : 'block'}`}>
          <SideBar isOpen={isOpen} />
        </div>
        <div className={`absolute flex ${!isOpen ? 'justify-start' : 'justify-end'}z-1 bg-yellow-300 w-[220px]`}>
          {!isOpen ? <GiHamburgerMenu size={35} onClick={() => setIsOpen(!isOpen)} /> : <AiOutlineClose size={35} onClick={() => setIsOpen(!isOpen)} />}
        </div>
        <div className={`text-4xl text-center ${!isOpen ? 'w-full' : 'w-[83%]'} bg-red-200 `}>
          <div className='w-full '>
            <h1 className='w-full bg-yellow-300 font-semibold p-2 text-2xl '>Partner Single page</h1>
           

                    <div className='bg-yellow-200  flex justify-center flex-col md:flex-row  p-5'>

                        <div className=' w-full md:w-[30%] '>
                            <div className="flex items-center justify-center">

                                <div className="w-full pb-5 md:pr-5">
                                    <div className="bg-yellow-100 w-full shadow-xl rounded-lg py-3">
                                        <div className="photo-wrapper p-2 flex justify-center items-center ">



                                            <img className="w-32 h-32 rounded-full mx-auto" src={partner.image ? partner.image : "https://mir-s3-cdn-cf.behance.net/project_modules/disp/ea7a3c32163929.567197ac70bda.png"} alt="John Doe" />

                                        </div>
                                        <div className="p-2">
                                            <h3 className="text-center text-xl text-gray-900 font-medium leading-8">{partner.fname} {partner.lname}</h3>
                                            <div className="text-center text-gray-400 text-xs font-semibold">
                                                <p>rev-on partner</p>
                                            </div>
                                            <table className="text-xs my-3">
                                                <tbody>
                                                    <tr>
                                                        <td className="px-2 py-2 text-gray-500 font-semibold">Phone</td>
                                                        <td className="px-2 py-2">{partner.mobile ? partner.mobile : "not found!"}</td>
                                                    </tr>
                                                    <tr>
                                                        <td className="px-2 py-2 text-gray-500 font-semibold">Email</td>
                                                        <td className="px-2 py-2">{partner.email}</td>
                                                    </tr>
                                                    <tr>
                                                        <td className="px-2 py-2 text-gray-500 font-semibold">city</td>
                                                        <td className="px-2 py-2">{partner.city ? partner.city : "not found!"}</td>
                                                    </tr>
                                                    <tr>
                                                        <td className="px-2 py-2 text-gray-500 font-semibold">GST no</td>
                                                        <td className="px-2 py-2">{partner.gstNo ? partner.gstNo : "not found!"}</td>
                                                    </tr>

                                                </tbody></table>
                                                <div className='flex justify-center'>
                                                  <div className='p-3 whitespace-nowrap font-semibold text-sm text-gray-700 text-left'>{partner.isVerifed===false?<button onClick={()=>verifiyPartner(partner.email)} className='bg-red-600 rounded-sm p-1 text-white hover:bg-red-700 text-sm'>Verify Partner</button>:<button onClick={()=>verifiyPartner(partner.email)} className='bg-red-600 rounded-sm p-1 text-white hover:bg-green-700 text-sm'>unverify</button>}</div>
                                                </div>

                                          

                                      


                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>

                        <div className='bg-yellow-100 rounded-lg h-screen w-full md:w-[65%]'>

                            <div className='mb-3'>
                                <p className='text-sm font-semibold text-center mt-4'>ID PROOF</p>
                                <div className='flex md:flex-row flex-col justify-center items-center md:justify-evenly'>
                                    <div className='flex justify-center flex-col  md:w-[35%] w-[70%] p-3'>
                                        <p className='text-gray-800 font-semibold text-sm mb-2'>Aadhaar card :</p>
                                        <img className="w-full h-40 rounded-md  mx-auto" src={`${partner.aadhaar ? partner.aadhaar : "https://aadhaarcard.co.in/wp-content/uploads/2023/04/aadhaar-card-800x445.webp"}`} alt="John Doe" />
                                    </div>
                                    <div className='flex justify-center flex-col md:w-[35%] w-[70%] p-3'>
                                        <p className='text-gray-800 font-semibold text-sm mb-2'>Pan Card :</p>
                                        <img className="w-full h-40 rounded-md  mx-auto" src={`${partner.pan ? partner.pan : "https://aadhaarcard.co.in/wp-content/uploads/2023/04/aadhaar-card-800x445.webp"}`} alt="John Doe" />
                                    </div>
                                </div>
                            </div>

              
                            <div className='pt-2 flex flex-col justify-center items-center'>
                                <p className='text-sm font-semibold'>PickUP & Drop Points </p>
                                <div className='w-[90%] md:w-[67%] px-3'>
                                    {partner.locations && partner.locations.map((location) => {
                                        return (
                                            <div key={location._id} className='h-[40px] flex items-center justify-evenly pl-2   bg-yellow-300 rounded-lg my-1'>
                                                <FaMapLocationDot size={16} />
                                                <p className='text-[12px] md:text-sm '>{location.name}</p>
                                               
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>

                        </div>

                    </div>

                









            {/* <div>
                <div>
                  <p>name :{partner.fname}{partner.lname}</p>
                  <p>email :{partner.email}</p>
                  <p>status :{partner.status?"true":"false"}</p>
                  <p>Verified :{partner.isVerifed?"true":"false"}</p>
           


                  
                  <div className='p-3 whitespace-nowrap text-sm text-gray-700 text-left'>{partner.isVerifed===false?<button onClick={()=>verifiyPartner(partner.email)} className='bg-red-600 rounded-sm p-1 text-white hover:bg-red-700 text-sm'>Verify Partner</button>:<h1>Verified</h1>}</div>

                </div>
                <div></div>
            </div>  */}
          </div>
        </div>
      </div>
    </>
  )
}

export default PartnerSingleView