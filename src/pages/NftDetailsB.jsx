import React from 'react'
import {NFT__DATA} from '../asssets/data/data.js'
import BuyanNFT from '../components/ui/BuyanNFT/BuyanNFT'
import ExploreMore from '../components/ui/ExploreMore/ExploreMore'

function NFTDetailsB() {
  return (
    <section>
      <div>
        <BuyanNFT key={NFT__DATA.id} NFTData = {NFT__DATA}/>
        {/* <ExploreMore/> */}
        <ExploreMore/>
      </div>
    </section>

  )
}

export default NFTDetailsB