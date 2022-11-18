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
import NFTDetailsB from "../pages/NftDetailsB";
import NFTDetailsU from "../pages/NFTDetailsU";
import TransferForm from "../components/ui/TransferForm/TransferForm";
import ListingForm from "../components/ui/ListingForm/ListingForm";
import ProfileView from "../pages/ProfileView"

import NormalAdminDashboard from "../pages/Nadmin/Dashboard";
import AdminProfile from "../pages/Nadmin/AdminProfile";
import ViewReports from "./../pages/Nadmin/ViewReports";
import BlockUsers from "./../pages/Nadmin/BlockUsers";
import ViewUsers from "./../pages/Nadmin/ViewUsers";
import SuperAdminDashboard from "../pages/Sadmin/Dashboard";
import ViewAdmins from "./../pages/Sadmin/ViewAdmins";
import AddAdmin from "../pages/Sadmin/AddAdmin";
import AdminRequests from "../pages/Sadmin/AdminRequests";
import EditAdminDetails from "../pages/EditAdminDetails";
import Options from "../pages/Sadmin/Options";

import NotFound from "../pages/NotFound";

// import SuperAdmin from "../pages/Sadmin/index";

function Routers() {
  return (
    <Routes>
      {/* <Route path="/" element={<Navigate to="/home" />} /> */}
      <Route path="/" element={<Home />} />
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
      {/* <Route path="/edit-profile" element={<EditProfile />} /> */}
      <Route path="/seller-profile/:address" element={<SellerProfile />} />
      <Route path="/explore/collection/NFT/:id" element={<NFTDetailsB />} />
      <Route
        path="/seller-profile/seller-collection/NFT/:tokenId"
        element={<NFTDetailsU />}
      />
      <Route
        path="/seller-profile/seller-collection/NFT/transfer-form"
        element={<TransferForm />}
      />
      <Route
        path="/seller-profile/seller-collection/NFT/listing-form"
        element={<ListingForm />}
      />
      <Route path="/profile-view/:address" element={<ProfileView/>}/>

      <Route path="/nadmin-dashboard" element={<NormalAdminDashboard />} />
      <Route path="/nadmin-viewreports" element={<ViewReports />} />
      <Route path="/nadmin-blockusers" element={<BlockUsers />} />
      <Route path="/nadmin-viewusers" element={<ViewUsers />} />
      <Route path="/sadmin-dashboard" element={<SuperAdminDashboard />} />
      <Route path="/sadmin-viewadmins" element={<ViewAdmins />} />
      <Route path="/sadmin-addadmin" element={<AddAdmin />} />
      <Route path="/sadmin-adminrequests" element={<AdminRequests />} />
      <Route path="/sadmin-options" element={<Options />} />
      <Route path="*" element={<NotFound />} />
      {/* <Route path="/admin-profile/:address" element={<AdminProfile />} /> */}
      {/* <Route path="/edit-admin-details" element={<EditAdminDetails />} /> */}
    </Routes>
  );
}

export default Routers;
