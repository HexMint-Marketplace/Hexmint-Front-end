import React from "react";
import BuyanNFT from "../components/ui/BuyanNFT/BuyanNFT";
import ExploreMore from "../components/ui/ExploreMore/ExploreMore";
import { useLocation } from "react-router-dom";

function NFTDetailsB() {
  const location = useLocation();
  // use location from NFTCard.jsx
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
