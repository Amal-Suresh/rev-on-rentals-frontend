import React, { useState, useEffect } from 'react'
import SideBar from '../AdminSideBar/Sidebar'
import { GiHamburgerMenu } from 'react-icons/gi'
import { AiOutlineClose } from 'react-icons/ai'
import Axios from 'axios'
import { adminApi } from '../../../config/api'
import { toast } from 'react-hot-toast'


function ManageUser() {


  const [isOpen, setIsOpen] = useState(false)

  const [userData, setUserData] = useState([])
  
  const findRequest = async () => {
    try {
      const response = await Axios.get(`${adminApi}/users`)
      if (response.data.success) {
        setUserData(response.data.user)
      }
    } catch (error) {

    }
  }


  const handleStatus =async(id)=>{
    try {
      const response = await Axios.put(`${adminApi}/changeUserStatus?id=${id}`)
      if(response.data.success){
        console.log(response.data.updatedUser,"////////////////////////");
        const updatedRequest= response.data.updatedUser
        const updatedDocumentIdString = updatedRequest._id.toString();
        const updatedIndex = userData.findIndex(request=>request._id.toString()===updatedDocumentIdString)

        console.log(updatedIndex);
        const updatedDocuments=[...userData]
        updatedDocuments[updatedIndex]=updatedRequest
        setUserData(updatedDocuments)
        toast.success(response.data.message)
      }else{
        toast.success(response.data.message)
      } 
    } catch (error ) { 
    }
  }


  useEffect(() => {
    findRequest()
  }, [])

  return (
    <>
      <div className={`mx-auto flex w-full h-full ${!isOpen ? 'justify-start' : 'justify-between'} `}>
        <div className={` h-full${!isOpen ? 'none' : 'block'}`}>
          <SideBar isOpen={isOpen} />
        </div>
        <div className={`absolute flex ${!isOpen ? 'justify-start' : 'justify-end'}z-1   w-[220px]`}>
          {!isOpen ? <GiHamburgerMenu size={35} onClick={() => setIsOpen(!isOpen)} /> : <AiOutlineClose size={35} onClick={() => setIsOpen(!isOpen)} />}
        </div>
        <div className={`text-4xl text-center ${!isOpen ? 'w-full' : 'w-[83%]'} bg-red-800 `}>
          <div className='w-full bg-yellow-300 '>
          <h1 className='p-2 text-2xl font-semibold'>User Management</h1>

            <div className='p-5 h-screen  bg-yellow-200'>
              

              {userData && 
              <div className='overflow-auto rounded-s-lg shadow '>
                <table className='w-full'>
                  <thead className='bg-gray-50 border-b-2 border-gray-200'>
                    <tr>
                      <th className='w-24 p-3 text-sm font-semibold tracking-wide text-left'>Fname</th>
                      <th className='w-24 p-3 text-sm font-semibold tracking-wide text-left'>Lname</th>
                      <th className='p-3 text-sm font-semibold tracking-wide text-left'>Email</th>
                      <th className='w-24 p-3 text-sm font-semibold tracking-wide text-left'>Status</th>

                    </tr>
                  </thead>
                  <tbody className='divide-y divide-gray-100'>
                    {userData.map((user)=>{
                      return(
                      <tr key={user._id}>
                        <td className='p-3 whitespace-nowrap text-sm text-gray-700 text-left'>{user.fname}</td>
                        <td className='p-3 whitespace-nowrap text-sm text-gray-700 text-left'>{user.lname}</td>
                        <td className='p-3 whitespace-nowrap text-sm text-gray-700 text-left'>{user.email}</td>
                        {user.status?<td className='p-3 whitespace-nowrap text-sm text-gray-700 text-left'><button onClick={()=>handleStatus(user._id)} className='bg-red-600 rounded-sm p-1 text-white hover:bg-red-700 text-sm'>Block</button></td>:<td className='p-3 whitespace-nowrap text-sm text-gray-700 text-left'><button onClick={()=>handleStatus(user._id)} className='bg-red-600 rounded-sm p-1 text-white hover:bg-red-700 text-sm'>Unblock</button></td>}
                        
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
export default ManageUser