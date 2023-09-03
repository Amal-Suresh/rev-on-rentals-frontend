import {configureStore} from "@reduxjs/toolkit"
import userSlice from "./userSlice";
import partnerSlice from "./partnerSlice";
import adminSlice from "./adminSlice";

const  store = configureStore({
    reducer:{
        user:userSlice,
        partner:partnerSlice,
        admin:adminSlice
    }

});

export default store;