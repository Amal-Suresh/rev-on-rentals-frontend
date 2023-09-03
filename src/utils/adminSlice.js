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
            state.userD.token=action.payload.token;
            state.userD.name=action.payload.username;
        },
        removeAdmin:(state,action)=>{
            state.userD.id=null
            state.userD.name=null
        }
    }
})

export const {addAdmin,removeAdmin}=adminSlice.actions
export default adminSlice.reducer