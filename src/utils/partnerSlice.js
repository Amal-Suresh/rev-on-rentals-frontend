import { createSlice } from "@reduxjs/toolkit";

const partnerSlice =createSlice({
    name:"partner",
    initialState:{
        partnerD:{
            token:null,
            name:null
        } 
    },
    reducers:{
        addPartner:(state,action)=>{
            state.partnerD.token=action.payload.token;
            state.partnerD.name=action.payload.username;
    
        },
        removePartner:(state,action)=>{
            state.partnerD.token=null
            state.partnerD.name=null
        }
    }
})

export const {addPartner,removePartner}=partnerSlice.actions
export default partnerSlice.reducer