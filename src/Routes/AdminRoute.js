import React from "react";
import {Routes,Route} from 'react-router-dom'
import AdminDashboadPage from "../Pages/Admin/AdminDashboadPage";
import PartnerRequest from "../Pages/Admin/PartnerRequestsPage";
import PartnerSingleViewPage from "../Pages/Admin/PartnerSingleViewPage";
import UserManagement from "../Pages/Admin/UserManagement";
import PartnerVerifiedList from "../Pages/Admin/PartnerVerifiedList";

function Admin() {
  return (
    
    <Routes>
        <Route path="/" element={<AdminDashboadPage/>}/>
        <Route path="/partnerRequests" element={<PartnerRequest/>}/>
        <Route path="/partnerSingleView" element={<PartnerSingleViewPage/>}/>
        <Route path="/users" element={<UserManagement/>}/>
        <Route path="/partnerVerifiedList" element={<PartnerVerifiedList/>}/>

        
    </Routes>
  )
}

export default Admin;