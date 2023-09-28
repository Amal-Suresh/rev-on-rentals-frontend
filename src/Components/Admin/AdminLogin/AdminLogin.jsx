import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import bckimage from '../../../images/loginBackground.png'
import Axios from 'axios'
import { adminApi } from '../../../config/api'
import { useDispatch } from 'react-redux'
import {addAdmin} from '../../../utils/adminSlice'
import {toast} from 'react-hot-toast'


function AdminLogin() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const initialValues = { email: "", password: ""}
    const [formValues, setFormValues] = useState(initialValues)
    const [formErrors, setFormErrors] = useState({})
    const [isSubmit, setIsSubmit] = useState(false)


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
            const submitForm = async(formValues)=>{
                try {
                const response = await Axios.post(`${adminApi}/login`,formValues)
               if(response.data.success){
                const token=response.data.data.token
                localStorage.setItem('token',JSON.stringify(token));
                dispatch(addAdmin({token:token,username:response.data.data.name}))
                toast.success(response.data.message);
                navigate('/admin')   
               }else{
                    toast.error(response.data.message)
               }           
                } catch (error) {
                    console.log(error);
                    
                }
            }
            submitForm(formValues)
           
        }

  

    }
    const validate = (values) => {
        const errors = {}
        const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        const hasUppercase = /[A-Z]/;
        const hasLowercase = /[a-z]/;
        const hasNumber = /\d/;

       
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
        return errors;
    }
    return (
        <section>
            
            <div className=' flex justify-center items-center bg-cover bg-no-repeat bg-center h-[600px] max-w-[1500px]' style={{ backgroundImage: `url(${bckimage})` }}>
                <div className=' '>
                    <div className="container mx-auto">
                        <div className="flex flex-col  bg-yellow-300 rounded-xl mx-auto shadow-[0_35px_60px_15px_rgba(0,0,0,0.3)] overflow-hidden w-[21rem]">

                            <div className="w-full  py-5 px-4" >
                                <h2 className="text-2xl text-center font-semibold mb-4">Admin Login</h2>

                                <form onSubmit={handleSubmit}>
                                    
                                    <div className="mt-5">
                                        <input type="text" placeholder="Email" className="border rounded-md border-gray-400 py-1 px-2 w-full" value={formValues.email} onChange={handleChange} name="email" />
                                    </div>
                                    <p className='text-sm text-red-600'>{formErrors.email}</p>
                                    <div className="mt-5">
                                        <input type="text" placeholder="Password" className="border rounded-md border-gray-400 py-1 px-2 w-full" value={formValues.password} onChange={handleChange} name="password" />
                                    </div>
                                    <p className='text-sm text-red-600'>{formErrors.password}</p>
                                    <div className="mt-5">
                                        <button type='submit' className="w-full bg-black py-2 text-center text-white font-bold text-md hover:bg-gray-900 hover:text-yellow-400 rounded-md ">Login</button>

                                    </div>
                                </form>
                                
                                   
                            </div>
                            

                        </div>
                        
                    </div>
                </div>
            </div>

        </section>



    )
}

export default AdminLogin