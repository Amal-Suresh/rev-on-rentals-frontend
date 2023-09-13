import { partnerAxiosInstance } from "./axios";


//register partner request
const registerPartnerRequest =async(formValues)=>{
   try {
    const response = await partnerAxiosInstance.post(`/join-us`,formValues)
    return response
   } catch (error) {
    console.log(error.message);
   }
}


export{
    registerPartnerRequest
}