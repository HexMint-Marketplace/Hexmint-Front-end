import React from "react";
import SellanNFT from "../components/ui/SellanNFT/SellanNFT";
import ExploreMore from "../components/ui/ExploreMore/ExploreMore";
import { useLocation } from "react-router-dom";

function NFTDetailsU() {
  const location = useLocation();
  const { item } = location.state;

  return (
    <section>
      <div>
        <SellanNFT key={item.tokenId} NFTData={item} />
        <ExploreMore />
      </div>
    </section>
  );
}

export default NFTDetailsU;
