import React from "react";
import BuyanNFT from "../components/ui/BuyanNFT/BuyanNFT";
import ExploreMore from "../components/ui/ExploreMore/ExploreMore";
import { useLocation } from "react-router-dom";
import BidNFT from "../components/ui/BidanNFT/BidNFT";

function NFTDetailsB() {
  const location = useLocation();
  // use location from NFTCard.jsx
  const { NFTData, collectionData, sellType } = location.state;

  return (
    <section>
      {sellType == "Buy Now" && (
        <div>
          <BuyanNFT
            key={NFTData.id}
            NFTData={NFTData}
            collectionData={collectionData}
          />
          <ExploreMore />
        </div>
      )}
      {sellType == "In Auction" && (
        <div>
          <BidNFT
            key={NFTData.id}
            NFTData={NFTData}
            collectionData={collectionData}
          />
          <ExploreMore />
        </div>
      )}
    </section>
  );
}

export default NFTDetailsB;
