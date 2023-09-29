import { createSlice } from "@reduxjs/toolkit";

const userSlice =createSlice({
    name:"user",
    initialState:{
        userD:{
            token:null,
            name:null,
            id:null
            
        } 
    },
    reducers:{
        addUser:(state,action)=>{
            state.userD.token=action.payload.token;
            state.userD.name=action.payload.username;
            state.userD.id=action.payload.id;

        },
        removeUser:(state,action)=>{
            state.userD.token=null
            state.userD.name=null
            state.userD.id=null;

        }
    }
})

export const {addUser,removeUser}=userSlice.actions
export default userSlice.reducer
