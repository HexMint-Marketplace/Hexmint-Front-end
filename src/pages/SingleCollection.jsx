import React from "react";
import { useLocation } from "react-router-dom";
import NFTList from "../components/ui/NFTList/NFTList.jsx";
import SingleCollectionHead from "../components/ui/SingleCollectionHead/SingleCollectionHead";

function SingleCollection() {
  const location = useLocation();
  // use location from CollectionCard.jsx
  const { collectionData,data } = location.state;

  return (
    <section>
      <div>
        <SingleCollectionHead
          key={collectionData._id}
          collectionData={collectionData}
        />
        <NFTList
          key={collectionData._id}
          collectionData={collectionData}
          NFTData={data}
        />
      </div>
    </section>
  );
}

export default SingleCollection;
