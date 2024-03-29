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

// fetch userdetails for userProfile
const fetchUserProfile =async()=>{
    try {
      const response = await userAxiosInstance.post(`userProfile`,null)
      return response
    } catch (error) {
        console.log(error.message); 
    }
}

//update userProfile 
const updateUserProfile=async(formData)=>{
    try {
        const response =await userAxiosInstance.post(`editUserProfile`,formData)
        return response
    } catch (error) {
        console.log(error.message);
    }
}

//upload userProof
const uploadUserProof =async(formData)=>{
    try {
         const response = await userAxiosInstance.post(`uploadProof`,formData)
         return response 
    } catch (error) {
        console.log(error.message);
        
    }
}

//userLogin
const userLogin =async(formValues)=>{
    try {
        const response = await userAxiosInstance.post(`login`, formValues);
        return response
    } catch (error) {
        console.log(error.message);
        
    }

}
//forget password
const forgetPasswordNewpass=async(userData,joinedOtp)=>{
    try {
        const response=await userAxiosInstance.post(`verifyForgotOtp`,{data:userData,otp:joinedOtp})
        return response
    } catch (error) {
        console.log(error.message); 
    }
}

const forgePasswordResendOtp=async(userData)=>{
    try {
        const response =await userAxiosInstance.post(`forgetPassResendOtp`,{email:userData.email})
        return response
    } catch (error) {
        console.log(error.message);
        
    }
}

//forgetPassword first otp
const forgetPasswordOtp =async(formValues)=>{
    try {
        const response = await userAxiosInstance.post(`forgetpassword`,formValues)
        return response
    } catch (error) {
        console.log(error.message);
        
    }
}



export{
    checkEmialBeforeRegister,
    sendEmailAndOtp,
    submitUserDetailsOtp,
    fetchUserProfile,
    updateUserProfile,
    uploadUserProof,
    userLogin,
    forgetPasswordNewpass,
    forgePasswordResendOtp,
    forgetPasswordOtp

}