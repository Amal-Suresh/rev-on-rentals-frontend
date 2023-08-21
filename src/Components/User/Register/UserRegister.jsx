import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import bckimage from '../../../images/loginBackground.png'

function UserLogin() {
    const initialValues = { fname: "", email: "", password: "", lname: "",confirmPassword:"",mobile:""}
    const [formValues, setFormValues] = useState(initialValues)
    const [formErrors, setFormErrors] = useState({})
    const [isSubmit, setIsSubmit] = useState(false)
    const navigate =useNavigate()

    const handleChange = (e) => {
        const { value, name } = e.target;
        const newvalue = value.trim()
        setFormValues({ ...formValues, [name]: newvalue, });
    };
    const handleSubmit = (e) => {
        e.preventDefault()
        setFormErrors(validate(formValues))
        setIsSubmit(true)
        if (Object.keys(formErrors).length === 0 && isSubmit) {
            const  loadOtp = (formValues)=>{
                navigate('/otp',{state:{formValues}})
            }
            loadOtp(formValues)
        }
    }
    const validate = (values) => {
        const errors = {}
        const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        const hasUppercase = /[A-Z]/;
        const hasLowercase = /[a-z]/;
        const hasNumber = /\d/;

        if (!values.fname) {
            errors.fname = "fname is required!"
        }
        if (!values.lname) {
            errors.lname = "lname is required!"
        }
        if (!values.email) {
            errors.email = "email is required!"
        } else if (!regex.test(values.email)) {
            errors.email = "This is not a valid email"
        }
        if (!values.password) {
            errors.password = "password is required!"
        } else if (!hasUppercase.test(values.password)) {
            errors.password = "At least one uppercase letter"
        }else if(!hasLowercase.test(values.password)){
            errors.password ="At least one lowercase letter"
        }else if(!hasNumber.test(values.password)){
            errors.password="At least one number"
        }else if(values.password.length<=8){
            errors.password="length should be 8"
        }
        if(!values.confirmPassword){
            errors.confirmPassword="confirm your password"
        }else if(values.confirmPassword!==values.password){
            errors.confirmPassword="password mismatch"
        }
        if(!values.mobile){
            errors.mobile="mobile number is required!"
        }else if(values.mobile.length !==10){
            errors.mobile="enter 10 digits"
        }
        return errors;
    }
    return (  
        <div className='h-screen flex items-center justify-center bg-[#FFD93B]  max-w-[1500px]'>
            <img src={bckimage} className='relative w-screen h-screen object-cover lg:object-contain' alt="..." />
            <div className="container mx-auto absolute">
                        <div className="flex flex-col  bg-yellow-300 rounded-xl mx-auto shadow-[0_35px_60px_15px_rgba(0,0,0,0.3)] overflow-hidden w-[21rem]">

                            <div className="w-full  py-5 px-4" >
                                <h2 className="text-2xl text-center font-semibold mb-4">User Register</h2>

                                <form onSubmit={handleSubmit}>
                                    
                                <div className="grid grid-cols-2 gap-5">
                                        <input type="text" placeholder="First Name" className="border  rounded-md border-gray-400 py-1 px-2" value={formValues.fname} onChange={handleChange} name="fname" />
                                        <input type="text" placeholder="Last Name" className="border  rounded-md border-gray-400 py-1 px-2" value={formValues.lname} onChange={handleChange} name="lname" />
                                    </div>
                                    <div className='flex justify-between'><p className='text-sm text-red-600'>{formErrors.fname}</p><p className='text-sm text-red-600'>{formErrors.lname}</p></div>
                                    <div className="mt-5">
                                        <input type="text" placeholder="Email" className="border rounded-md border-gray-400 py-1 px-2 w-full" value={formValues.email} onChange={handleChange} name="email" />
                                    </div>
                                    <p className='text-sm text-red-600'>{formErrors.email}</p>
                                    <div className="mt-5">
                                        <input type="number" placeholder="Mobile Number" className="border rounded-md border-gray-400 py-1 px-2 w-full" value={formValues.mobile} onChange={handleChange} name="mobile" />
                                    </div>
                                    <p className='text-sm text-red-600'>{formErrors.mobile}</p>
                                    <div className="mt-5">
                                        <input type="text" placeholder="Password" className="border rounded-md border-gray-400 py-1 px-2 w-full" value={formValues.password} onChange={handleChange} name="password" />
                                    </div>
                                    <p className='text-sm text-red-600'>{formErrors.password}</p>
                                    <div className="mt-5">
                                        <input type="text" placeholder="Confirm Password" className="border rounded-md border-gray-400 py-1 px-2 w-full" value={formValues.confirmPassword} onChange={handleChange} name="confirmPassword" />
                                    </div>
                                    <p className='text-sm text-red-600'>{formErrors.confirmPassword}</p>
                                    <div className="mt-5">
                                        <button className="w-full bg-black py-2 text-center text-white font-bold text-md hover:bg-gray-900 hover:text-yellow-400 rounded-md ">Register</button>

                                    </div>
                                </form>
                                
                                   
                            </div>
                            

                        </div>
                        <div className="mt-2 flex justify-center">
                            <p className='font-semibold text-white '>Already Have Account ?</p>
                            <p onClick={()=>navigate('/login')} className='font-semibold text-gray-500 ml-1 hover:text-gray-700 cursor-pointer'>Login Now</p>

                        </div>
                    </div>
                </div>
    )
}

export default UserLogin;