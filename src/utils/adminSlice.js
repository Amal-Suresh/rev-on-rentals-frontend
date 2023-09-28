import { createSlice } from "@reduxjs/toolkit";

const adminSlice =createSlice({
    name:"admin",
    initialState:{
        adminD:{
            token:null,
            name:null
        } 
    },
    reducers:{
        addAdmin:(state,action)=>{
            console.log(action.payload,"action payload");
            state.adminD.token=action.payload.token;
            state.adminD.name=action.payload.username;
        },
        removeAdmin:(state,action)=>{
            state.adminD.token=null
            state.adminD.name=null
        }
    }
})

export const {addAdmin,removeAdmin}=adminSlice.actions
export default adminSlice.reducer