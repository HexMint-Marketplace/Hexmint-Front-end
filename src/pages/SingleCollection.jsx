import React from 'react'
import {COLLECTION_DATA} from '../asssets/data/data.js'
import NFTList from '../components/ui/NFTList/NFTList.jsx';
import SingleCollectionHead from '../components/ui/SingleCollectionHead/SingleCollectionHead'

function SingleCollection() {
  return (
    <section>
      <div>
        <SingleCollectionHead key={COLLECTION_DATA.collectionId} collectionData = {COLLECTION_DATA}/>
        <NFTList/>
      </div>
    </section>

  )
}

export default SingleCollection