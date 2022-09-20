import React from 'react'
import {NFT__DATA} from '../asssets/data/data.js'
import SellanNFT from '../components/ui/SellanNFT/SellanNFT'
import ExploreMore from '../components/ui/ExploreMore/ExploreMore'

function NFTDetailsU() {
  return (
    <section>
      <div>
        <SellanNFT key={NFT__DATA.id} NFTData = {NFT__DATA}/>
        {/* <ExploreMore/> */}
        <ExploreMore/>
      </div>
    </section>

  )
}

export default NFTDetailsU