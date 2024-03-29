import React,{useState,useRef, useEffect} from 'react'
import { useLocation,useNavigate } from 'react-router-dom'
import  Axios  from 'axios'
import { toast } from 'react-hot-toast'
import { partnerApi } from '../../../config/api'
import {PiClockCountdownFill} from 'react-icons/pi'

function PartnerForgotOtp() {
 
  let [count, setCount] = useState(5)
  const location =useLocation()
  const navigate =useNavigate()
  const userData=location.state.formValues
  const inputRef =useRef({})
  const [otp,setOtp]=useState({
    digitOne:"",
    digitTwo:"",
    digitThree:"",
    digitFour:""
  })

  useEffect(()=>{
    inputRef.current[0].focus()
    inputRef.current[0].addEventListener("paste",pasteText);
    const countDownTimer = setInterval(() => {
      if (count >= 0) {
        setCount(count--)
      } else {
        clearInterval(countDownTimer)
      }
    },500);
    return () => clearInterval(countDownTimer)
  },[count])

  const pasteText =(e)=>{
   const pastedText= e.clipboardData.getData("text")
   const feildValues ={}
   Object.keys(otp).forEach((keys,index)=>{
    feildValues[keys]=pastedText[index]
   })
   setOtp(feildValues)
   inputRef.current[3].focus()
  }

  const handleChange =(e,index)=>{
    const {name,value}=e.target
    if(/[a-z]/gi.test(value))return;
    setOtp((prev)=>({
      ...prev,[name]:value?.slice(-1),
    }))
    if(value && index < 3){
        inputRef.current[index+1].focus()
    }
  }

  const handleBackSpace=(e,index)=>{
    if(e.key==='Backspace'){
      if(index > 0){
        inputRef.current[index-1].focus()
      }
    }
  }

  const renderInput = ()=>{
    return Object.keys(otp).map((keys,index)=>(
    <input 
        ref={(element)=>(inputRef.current[index]=element)}
        type="text"
        key={index} 
        name={keys} 
        value={otp[keys]}
        className='w-16 h-12 text-center text-black rounded-md mr-3 bg-yellow-300 text-xl'
        onChange={(e)=>handleChange(e,index)}
        onKeyUp={(e)=>handleBackSpace(e,index)}
        />
      ))
  }

  const handleSubmit=async(e)=>{
    e.preventDefault()
    const joinedOtp = Object.values(otp).join("");
    if(joinedOtp.length===4){
      const response=await Axios.post(`${partnerApi}/verifyForgotOtp`,{data:userData,otp:joinedOtp})
      if(response.data.success){
        toast.success(response.data.message)
        toast("redirecting to login")
        navigate('/partner/login')
      }else{
        toast.error(response.data.message)
      }
    }else{
    }
  }

  const handleResend=async()=>{
    try {
      const response =await Axios.post(`${partnerApi}/resendOtp`,{email:userData.email})
      if(response.data.success){
        setCount(5)
        toast.success(response.data.message)
      }
    } catch (error) {
      
    }
    
  }

  return (
    <div className='flex justify-center items-center w-screen h-screen  bg-yellow-300  py-12'>
        <div className='w-[22rem] h-[20rem] bg-black flex justify-center items-center rounded-lg'>
        <form onSubmit={handleSubmit} >
            <h3 className='text-3xl text-center text-yellow-400 my-4'>Enter Otp Here</h3>
            <div className='flex justify-center '>
              {renderInput()}
            </div>
            <div  className='flex justify-center mt-10'>
                <button className='bg-black font-semibold border text-yellow-400 py-2 px-5 rounded-lg hover:bg-yellow-400 hover:text-black  ' type='submit'>Verify</button>
            </div>
            <div className='flex justify-center pt-4'> <h2 className='text-white'>{count===0?<span className='text-white font-bold underline cursor-pointer' onClick={handleResend}>resend</span>:<div className='flex justify-center items-center'><span className='pr-1 text-yellow-300 '><PiClockCountdownFill size={22}/></span><span className='text-red-600 font-bold text-2xl'>{count}</span></div>}</h2></div>
        </form>
        </div>
    </div>
  )
}


export default PartnerForgotOtp