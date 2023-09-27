import { createSlice } from "@reduxjs/toolkit";

const userSlice =createSlice({
    name:"user",
    initialState:{
        userD:{
            token:null,
            name:null
        } 
    },
    reducers:{
        addUser:(state,action)=>{
            console.log(action.payload,"action payload");
            state.userD.token=action.payload.token;
            state.userD.name=action.payload.username;
        },
        removeUser:(state,action)=>{
            state.userD.token=null
            state.userD.name=null
        }
    }
})

export const {addUser,removeUser}=userSlice.actions
export default userSlice.reducer
