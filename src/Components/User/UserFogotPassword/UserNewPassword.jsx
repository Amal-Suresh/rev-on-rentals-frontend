import React,{useState,useEffect} from 'react'
import { userApi } from '../../../config/api'
import Axios from 'axios'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import {forgetPasswordOtp} from '../../../config/clientEndPoints'


function UserNewPassword() {
    const navigate=useNavigate()

    const initialValues = {email: "", password: "",confirmPassword:"" }
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
                    const response = await forgetPasswordOtp(formValues)
                // const response = await Axios.post(`${userApi}forgetpassword`,formValues)
               if(response.data.success){
                    toast.success(response.data.message)
                    navigate("/verifyForgetPassword",{state:{formValues}})
                    
               }else{
                    toast.error(response.data.message)

               }
              
        
                    
                } catch (error) {
                    
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
        if(!values.confirmPassword){
            errors.confirmPassword="confirm your password"
        }else if(values.confirmPassword!==values.password){
            errors.confirmPassword="password mismatch"
        }

        return errors;

    }
  return (
    <section class="bg-yellow-300">
    <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div class="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
            <h2 class="mb-1 text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Change Password
            </h2>
            <form onSubmit={handleSubmit} class="mt-4 space-y-4 lg:mt-5 md:space-y-5" >
                <div>
                    <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                    <input value={formValues.email} onChange={handleChange} type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                    <p className='text-sm text-red-600'>{formErrors.email}</p>
                </div>
                <div>
                    <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">New Password</label>
                    <input value={formValues.password} onChange={handleChange} type="password" name="password" id="password" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    <p className='text-sm text-red-600'>{formErrors.password}</p>
                </div>
                <div>
                    <label for="confirm-password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
                    <input value={formValues.confirmPassword} onChange={handleChange} type="confirm-password" name="confirmPassword" id="confirm-password"  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                    <p className='text-sm text-red-600'>{formErrors.confirmPassword}</p>
                </div>
                <button type="submit" class="w-full bg-yellow-300  text-black font-semibold py-2 rounded-lg hover:bg-yellow-400">Reset passwod</button>
            </form>
        </div>
    </div>
  </section>
  )
}

export default UserNewPassword