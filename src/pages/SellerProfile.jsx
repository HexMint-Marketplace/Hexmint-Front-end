import React from 'react'
import {COLLECTION_DATA} from '../asssets/data/data.js'
import NFTList from '../components/ui/NFTList/NFTList.jsx';
import ProfileHead from '../components/ui/ProfileHead/ProfileHead'
import UserCollectionList from '../components/ui/UserCollectionList/UserCollectionList'

function SellerProfile() {
  return (
    <section>
      <div>
        <ProfileHead key={COLLECTION_DATA.collectionId} collectionData = {COLLECTION_DATA}/>
        <UserCollectionList/>
      </div>
    </section>

  )
}

export default SellerProfile