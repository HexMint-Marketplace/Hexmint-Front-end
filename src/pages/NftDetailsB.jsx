import React from "react";
import { NFT__DATA } from "../asssets/data/data.js";
import BuyanNFT from "../components/ui/BuyanNFT/BuyanNFT";
import ExploreMore from "../components/ui/ExploreMore/ExploreMore";
import { useLocation } from "react-router-dom";

function NFTDetailsB() {
  const location = useLocation();
  const { NFTData, collectionData } = location.state;
  return (
    <section>
      <div>
        <BuyanNFT
          key={NFTData.id}
          NFTData={NFTData}
          collectionData={collectionData}
        />
        {/* <ExploreMore/> */}
        <ExploreMore />
      </div>
    </section>
  );
}

export default NFTDetailsB;
