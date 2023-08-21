import React,{ useState } from 'react'
import { useLocation } from 'react-router-dom'
import SideBar from '../AdminSideBar/Sidebar'
import { GiHamburgerMenu } from 'react-icons/gi'
import { AiOutlineClose } from 'react-icons/ai'
import  Axios  from 'axios'
import { adminApi } from '../../../API/api'
import { toast } from 'react-hot-toast'



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
        <div className={`absolute flex ${!isOpen ? 'justify-start' : 'justify-end'}z-1   bg-red-600 w-[220px]`}>
          {!isOpen ? <GiHamburgerMenu size={35} onClick={() => setIsOpen(!isOpen)} /> : <AiOutlineClose size={35} onClick={() => setIsOpen(!isOpen)} />}
        </div>
        <div className={`text-4xl text-center ${!isOpen ? 'w-full' : 'w-[83%]'} bg-red-200 `}>
          <div className='w-full '>
            <h1 className='w-full bg-green-600 '>Partner Single page</h1>
            <div>
                <div>
                  <p>name :{partner.fname}{partner.lname}</p>
                  <p>email :{partner.email}</p>
                  <p>status :{partner.status?"true":"false"}</p>
                  <p>Verified :{partner.isVerifed?"true":"false"}</p>
           


                  
                  <div className='p-3 whitespace-nowrap text-sm text-gray-700 text-left'>{partner.isVerifed===false?<button onClick={()=>verifiyPartner(partner.email)} className='bg-red-600 rounded-sm p-1 text-white hover:bg-red-700 text-sm'>Verify Partner</button>:<h1>Verified</h1>}</div>

                </div>
                <div></div>
            </div> 
          </div>
        </div>
      </div>
    </>
  )
}

export default PartnerSingleView