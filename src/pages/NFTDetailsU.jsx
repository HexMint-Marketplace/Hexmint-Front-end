import React from 'react'
import {NFT__DATA} from '../asssets/data/data.js'
import SellanNFT from '../components/ui/SellanNFT/SellanNFT'
import ExploreMore from '../components/ui/ExploreMore/ExploreMore'
import { useLocation } from 'react-router-dom'

function NFTDetailsU() {
  const location = useLocation();
  const {item} = location.state;
  console.log("location: ", item.tokenId);
  return (
    <section>
      <div>
        <SellanNFT key={item.tokenId} NFTData = {item}/>
        {/* <ExploreMore/> */}
        <ExploreMore/>
      </div>
    </section>

  )
}

export default NFTDetailsU