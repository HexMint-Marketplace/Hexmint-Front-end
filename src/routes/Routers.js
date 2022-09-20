import React from 'react'
import Home from '../pages/Home'
import Contact from '../pages/Contact'
import Create from '../pages/Create'
import EditProfile from '../pages/EditProfile'
import Explore from '../pages/Explore'
import NftDetails from '../pages/NftDetailsB'
import SellerProfile from '../pages/SellerProfile'
import Wallet from '../pages/Wallet'
import { Routes, Route, Navigate } from 'react-router-dom'
import NFTs from '../pages/NFTs'
import CreateCollection from '../pages/CreateCollection'
import SingleCollection from '../pages/SingleCollection'
import NFTDetailsB from '../pages/NftDetailsB'
import NFTDetailsU from '../pages/NFTDetailsU'
import TransferForm from '../components/ui/TransferForm/TransferForm'
import ListingForm from '../components/ui/ListingForm/ListingForm'
import NewCollectionForm from '../pages/NewCollectionForm'

function Routers() {
  return <Routes>
    <Route path='/' element={<Navigate to = '/home' />}/>
    <Route path='/home' element={<Home/>}/>
    <Route path='/explore' element={<Explore/>}/>
    <Route path='/create' element={<Create/>}/>
    <Route path='/contact' element={<Contact/>}/>
    <Route path='/explore/collection/:id' element={<SingleCollection/>}/>
    <Route path='/edit-profile' element={<EditProfile/>}/>
    <Route path='/explore/:id' element={<NftDetails/>}/>
    <Route path='/seller-profile' element={<SellerProfile/>}/>
    <Route path='/wallet' element={<Wallet/>}/>
    <Route path='/NFTs' element={<NFTs/>}/>
    <Route path='/create-collection' element={<CreateCollection/>}/>
    <Route path='/explore/collection/NFT/:id' element={<NFTDetailsB/>}/>
    <Route path='/seller-profile/seller-collection/NFT' element={<NFTDetailsU/>} />
    <Route path='/seller-profile/seller-collection/NFT/transfer-form' element={<TransferForm/>} />
    <Route path='/seller-profile/seller-collection/NFT/listing-form' element={<ListingForm/>} />
    <Route path='/seller-profile/create-collection-form' element={<NewCollectionForm/>} />
    

  </Routes>
}

export default Routers
