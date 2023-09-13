import { userAxiosInstance } from "./axios"

// check the email is created or not before register
const checkEmialBeforeRegister=async(userEmail)=>{
      try {
        const response = await userAxiosInstance.get(`checkEmail?email=${userEmail}`)
        return response
      } catch (error) {
        console.log(error.message);
      }
}

//sent email and entered otp
const sendEmailAndOtp=async(userData,otp)=>{
    try {
        const response = await userAxiosInstance.post(`verifyOtp`,{ data: userData, otp: otp })
        return response
    } catch (error) {
     console.log(error.message);   
    }
}

//submit userDetails and otp
const submitUserDetailsOtp =async(userEmail)=>{
    try {
       const response= await userAxiosInstance.post('resendOtp',{email:userEmail})
       return response  
    } catch (error) {
        console.log(error.message);
    }
}


export{
    checkEmialBeforeRegister,
    sendEmailAndOtp,
    submitUserDetailsOtp

}