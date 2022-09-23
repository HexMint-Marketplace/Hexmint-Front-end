import React from "react";
import Home from "../pages/Home";
import Contact from "../pages/Contact";
import Create from "../pages/Create";
import EditProfile from "../pages/EditProfile";
import Explore from "../pages/Explore";
import NftDetails from "../pages/NftDetailsB";
import SellerProfile from "../pages/SellerProfile";
import Wallet from "../pages/Wallet";
import { Routes, Route, Navigate } from "react-router-dom";
import NFTs from "../pages/NFTs";
import CreateCollection from "../pages/CreateCollection";
import SingleCollection from "../pages/SingleCollection";

import NormalAdminDashboard from "../pages/Nadmin/Dashboard";
import ViewReports from "./../pages/Nadmin/ViewReports";
import BlockUsers from "./../pages/Nadmin/BlockUsers";
import SuperAdminDashboard from "../pages/Sadmin/Dashboard";
import ViewAdmins from "./../pages/Sadmin/ViewAdmins";
import AddAdmin from "../pages/Sadmin/AddAdmin";
import AdminRequests from "../pages/Sadmin/AdminRequests";

function Routers() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/home" element={<Home />} />
      <Route path="/explore" element={<Explore />} />
      <Route path="/create" element={<Create />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/explore/collection/:id" element={<SingleCollection />} />
      <Route path="/edit-profile" element={<EditProfile />} />
      <Route path="/explore/:id" element={<NftDetails />} />
      <Route path="/seller-profile" element={<SellerProfile />} />
      <Route path="/wallet" element={<Wallet />} />
      <Route path="/NFTs" element={<NFTs />} />
      <Route path="/create-collection" element={<CreateCollection />} />

      <Route path="/nadmin-dashboard" element={<NormalAdminDashboard />} />
      <Route path="/nadmin-viewreports" element={<ViewReports />} />
      <Route path="/nadmin-blockusers" element={<BlockUsers />} />
      <Route path="/sadmin-dashboard" element={<SuperAdminDashboard />} />
      <Route path="/sadmin-viewadmins" element={<ViewAdmins />} />
      <Route path="/sadmin-addadmin" element={<AddAdmin />} />
      <Route path="/sadmin-adminrequests" element={<AdminRequests />} />
    </Routes>
  );
}

export default Routers;
