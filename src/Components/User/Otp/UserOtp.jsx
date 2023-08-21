    import React,{useEffect,useState} from 'react'
    import { useLocation } from 'react-router-dom'
    import  Axios  from 'axios'
import { userApi } from '../../../API/api'

    function UserOtp() {


        const location =useLocation()
        const userData=location?.state.formValues
        const email=userData.email
        const initialValues = { num1: "", num2: "", num3: "", num4: "",}
        const [formOtp, setFormOtp] = useState(initialValues)
      

        const handleChange = (e) => {
            const { value, name } = e.target;
            const newvalue = value.trim()
            setFormOtp({ ...formOtp, [name]: newvalue, });
        }
        const handleSubmit = (e) => {
            e.preventDefault()
            console.log(formOtp);
          

            }

        const sendOtp =async(email)=>{
            const response = await Axios.get(`${userApi}sendOtp`,{mailId:email})
        }


  


        useEffect(()=>{
            sendOtp()
        },[])

        return (
            <div>
                <div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-12">
                    <div className="relative bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
                        <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
                            <div className="flex flex-col items-center justify-center text-center space-y-2">
                                <div className="font-semibold text-3xl">
                                    <p>Email Verification</p>
                                </div>
                                <div className="flex flex-row text-sm font-medium text-gray-400">
                                    <p>We have sent a code to your email ba**@dipainhouse.com</p>
                                </div>
                            </div>

                            <div>
                                <form onSubmit={handleSubmit} >
                                    <div className="flex flex-col space-y-16">
                                        <div className="flex flex-row items-center justify-between mx-auto w-full max-w-xs">
                                            <div className="w-16 h-16 ">
                                                <input className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700 " type="number" name="num1" value={formOtp.num1} onChange={handleChange}/>
                                            </div>
                                            <div className="w-16 h-16 ">
                                                <input className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700" type="number" name="num2" value={formOtp.num2} onChange={handleChange} />
                                            </div>
                                            <div className="w-16 h-16 ">
                                                <input className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700" type="number" name="num3" value={formOtp.num3} onChange={handleChange} />
                                            </div>
                                            <div className="w-16 h-16 ">
                                                <input className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700" type="number" name="num4"  value={formOtp.num4} onChange={handleChange} />
                                            </div>
                                        </div>

                                        <div className="flex flex-col space-y-5">
                                            <div>
                                                <button type='submit' className="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-blue-700 border-none text-white text-sm shadow-sm">
                                                    Verify Account
                                                </button>
                                            </div>

                                            <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
                                                <p>Didn't recieve code?</p> <a className="flex flex-row items-center text-blue-600" href="http://" target="_blank" rel="noopener noreferrer">Resend</a>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    export default UserOtp