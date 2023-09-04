import React, { useState, useEffect } from 'react'
import SideBar from '../AdminSideBar/Sidebar'
import { GiHamburgerMenu } from 'react-icons/gi'
import { AiOutlineClose } from 'react-icons/ai'
import Axios from 'axios'
import { adminApi } from '../../../API/api'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'



function PartnerVerified() {
    const navigate=useNavigate()
    const [isOpen, setIsOpen] = useState(false)
  
    const [requests, setRequests] = useState([])
    
    const findRequest = async () => {
      try {
        const response = await Axios.get(`${adminApi}/partnerVerifiedList`)
        if (response.data.success) {
          setRequests(response.data.data)
        }
      } catch (error) {
  
      }
    }
  

  
    const handleStatus =async(id)=>{
      try {
        const response = await Axios.put(`${adminApi}/changeStatus?id=${id}`)
        if(response.data.success){
          const updatedRequest= response.data.updatedrequest
          const updatedDocumentIdString = updatedRequest._id.toString();
          const updatedIndex = requests.findIndex(request=>request._id.toString()===updatedDocumentIdString)
          const updatedDocuments=[...requests]
          updatedDocuments[updatedIndex]=updatedRequest
          setRequests(updatedDocuments)
          toast.success(response.data.message)
        }else{
          toast.error(response.data.message)
        } 
      } catch (error ) { 
      }
    }
  
    const viewPartner = (data)=>{
  
        navigate('/admin/partnerSingleView',{state:{data}})
        
        // const response = await Axios.get(`${adminApi}/viewPartner?id=${id}`)
        // if(response.data.success){
        //   alert("success")
        // }
    }
    useEffect(() => {
      findRequest()
    }, [])
  
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
              <h1 className='p-2 text-2xl font-semibold'>Partners</h1>
  
              <div className='p-5 h-screen bg-yellow-200'>
                
  
                {requests && 
                <div className='overflow-auto rounded-s-lg shadow '>
                  <table className='w-full'>
                    <thead className='bg-gray-50 border-b-2 border-gray-200'>
                      <tr>
                        <th className='w-24 p-3 text-sm font-semibold tracking-wide text-left'>Fname</th>
                        <th className='w-24 p-3 text-sm font-semibold tracking-wide text-left'>Lname</th>
                        <th className='p-3 text-sm font-semibold tracking-wide text-left'>Email</th>
                        <th className='w-24 p-3 text-sm font-semibold tracking-wide text-left'>Status</th>
                        <th className='w-24 p-3 text-sm font-semibold tracking-wide text-left'>View</th>
  
                      </tr>
                    </thead>
                    <tbody className='divide-y divide-gray-100'>
                      {requests.map((partner)=>{
                        return(
                        <tr key={partner._id}>
                          <td className='p-3 whitespace-nowrap text-sm text-gray-700 text-left'>{partner.fname}</td>
                          <td className='p-3 whitespace-nowrap text-sm text-gray-700 text-left'>{partner.lname}</td>
                          <td className='p-3 whitespace-nowrap text-sm text-gray-700 text-left'>{partner.email}</td>  
                          {partner.status?<td className='p-3 whitespace-nowrap text-sm text-gray-700 text-left'><button onClick={()=>handleStatus(partner._id)} className='bg-red-600 rounded-sm p-1 text-white hover:bg-red-700 text-sm'>Block</button></td>:<td className='p-3 whitespace-nowrap text-sm text-gray-700 text-left'><button onClick={()=>handleStatus(partner._id)} className='bg-red-600 rounded-sm p-1 text-white hover:bg-red-700 text-sm'>Unblock</button></td>}
                          <td className='p-3 whitespace-nowrap text-sm text-gray-700 text-left'><button onClick={()=>viewPartner(partner)} className='bg-blue-600 rounded-sm p-1 text-white hover:bg-blue-700 text-sm'>View</button></td>
                          
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

export default PartnerVerified