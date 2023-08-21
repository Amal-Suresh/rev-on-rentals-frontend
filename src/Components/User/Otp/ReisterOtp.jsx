import React,{useState,useRef, useEffect} from 'react'
import { useLocation,useNavigate } from 'react-router-dom'
import  Axios  from 'axios'
import { toast } from 'react-hot-toast'
import { userApi } from '../../../API/api'

function ReisterOtp() {

  const location =useLocation()
  const navigate =useNavigate()
  const userData=location?.state.formValues
  const userEmail=userData?.email

  console.log(userData,"userdata");
  console.log(userData.email,"userEmail",userEmail);

  const sendOtp =async()=>{
    const response =await Axios.post(`${userApi}otp`,{email:userEmail})
    if(response.data.success){
      toast.success(response.data.message)
    }else{
      toast.error(response.data.message)
    }
  }


  const inputRef =useRef({})
  const [otp,setOtp]=useState({
    digitOne:"",
    digitTwo:"",
    digitThree:"",
    digitFour:""
  })

  useEffect(()=>{
    sendOtp()
    inputRef.current[0].focus()
    inputRef.current[0].addEventListener("paste",pasteText);

    // return (()=>inputRef.current[0].removeEventListener("paste",pasteText))



  },[])

  const pasteText =(e)=>{
   const pastedText= e.clipboardData.getData("text")
   console.log(pastedText);

   const feildValues ={}
   Object.keys(otp).forEach((keys,index)=>{
    feildValues[keys]=pastedText[index]
   })
   setOtp(feildValues)
   inputRef.current[3].focus()
   console.log(feildValues);

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
    
    // e.target.nextSibling.focus();


  }



  const handleBackSpace=(e,index)=>{
    if(e.key==='Backspace'){
      if(index > 0){
        inputRef.current[index-1].focus()
      }
    


    }

  }

  console.log(otp);
  console.log(inputRef.current);



  const renderInput = ()=>{
    return Object.keys(otp).map((keys,index)=>(
    <input 
        ref={(element)=>(inputRef.current[index]=element)}
        type="text"
        key={index} 
        name={keys} 
        value={otp[keys]}
        className='w-16 h-12 text-center text-white rounded-md mr-3 bg-gray-900 text-xl'
        onChange={(e)=>handleChange(e,index)}
        onKeyUp={(e)=>handleBackSpace(e,index)}
        />
      
      ))
  
  }

  const handleSubmit=async(e)=>{
    e.preventDefault()
   
    const joinedOtp = Object.values(otp).join("");
    if(joinedOtp.length===4){

      const response=await Axios.post(`${userApi}verifyOtp`,{data:userData,otp:joinedOtp})
      if(response.data.success){
        toast.success(response.data.message)
        toast("redirecting to login")
        navigate('/login')
      }else{
        toast.error(response.data.message)
      }
    }else{

    }
    
  }
  return (
    <div className='flex justify-center items-center w-screen  py-12'>
        <div className='w-[22rem] h-[22rem] bg-slate-500 flex justify-center items-center rounded-lg'>
        <form onSubmit={handleSubmit} >
            <h3 className='text-3xl text-center my-6'>Enter Otp Here</h3>
            <div className='flex justify-center '>
              {renderInput()}
            </div>
            <div  className='flex justify-center mt-20'>
                <button className='bg-black font-semibold text-yellow-400 py-2 px-5 rounded-lg hover:bg-yellow-400 hover:text-black ' type='submit'>Verify</button>
            </div>
        </form>
        </div>
    </div>
  )
}

export default ReisterOtp