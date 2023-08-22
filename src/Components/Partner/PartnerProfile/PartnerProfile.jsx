import React, { useState } from 'react'
import SideBarPartner from '../PartnerSideBar/SideBarPartner'
import { GiHamburgerMenu } from 'react-icons/gi'
import { AiOutlineClose ,AiOutlinePlusCircle } from 'react-icons/ai'
function PartnerProfile() {
    const [isOpen, setIsOpen] = useState(false)
    return (
        <div>
            <div className={`mx-auto flex w-full ${!isOpen ? 'justify-start' : 'justify-between'} `}>
                <div className={`${!isOpen ? 'none' : 'block'}`}>
                    <SideBarPartner isOpen={isOpen} />
                </div>
                <div className={`absolute flex ${!isOpen ? 'justify-start' : 'justify-end'}z-1  bg-yellow-300 w-[220px]`}>
                    {!isOpen ? <GiHamburgerMenu size={35} onClick={() => setIsOpen(!isOpen)} /> : <AiOutlineClose size={35} onClick={() => setIsOpen(!isOpen)} />}
                </div>
                <div className={`text-4xl text-center ${!isOpen ? 'w-full' : 'w-[83%]'} bg-red-800 `}>
                    <div className='w-full bg-yellow-300 '>
                        <h1 className='py-2 text-3xl font-semibold'>Partner Profile</h1>
                    </div>
                    <div className='bg-yellow-200  flex justify-center flex-col md:flex-row '>
                        <div className='bg-red-200 w-full md:w-[30%] '>
                            <div className="flex items-center justify-center">

                                <div className="max-w-xs">
                                    <div className="bg-white shadow-xl rounded-lg py-3">
                                        <div className="photo-wrapper p-2 flex justify-center items-center ">
                                        <input type="file" className='invisible hidden' id='profileFile' />
                                            <AiOutlinePlusCircle for='profileFile' className='absolute text-transparent hover:text-gray-300  '/>

                                            <img className="w-32 h-32 rounded-full mx-auto" src="https://www.gravatar.com/avatar/2acfb745ecf9d4dccb3364752d17f65f?s=260&d=mp" alt="John Doe"/>
                                            
                                        </div>
                                        <div className="p-2">
                                            <h3 className="text-center text-xl text-gray-900 font-medium leading-8">AMAL SURESH</h3>
                                            <div className="text-center text-gray-400 text-xs font-semibold">
                                                <p>rev-on partner</p>
                                            </div>
                                            <table className="text-xs my-3">
                                                <tbody>
                                                    <tr>
                                                        <td className="px-2 py-2 text-gray-500 font-semibold">Phone</td>
                                                        <td className="px-2 py-2">+977 9955221114</td>
                                                    </tr>
                                                    <tr>
                                                        <td className="px-2 py-2 text-gray-500 font-semibold">Email</td>
                                                        <td className="px-2 py-2">john@exmaple.com</td>
                                                    </tr>
                                                </tbody></table>

                                            <div className="text-center my-3">
                                                <p className="text-xs cursor-pointer font-semibold hover:text-yellow-400">EDIT PROFILE</p>
                                            </div>

                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className='bg-violet-200 w-full md:w-[65%]'>
                            <h1>2</h1>
                        </div>

                    </div>

                </div>
            </div>

        </div>
    )
}

export default PartnerProfile