import React, { useState } from "react";
import { Link } from "react-router-dom";

import "../CollectionCard/CollectionCard.css";

const SellerNFTCard = (props) => {
  const { tokenId, seller, contractAddress, image, NFTname, description, collectionId } = props.item;
  // console.log("props.item ",props.item);
  return (
    <div className="single_collection_card">
      <div className="collection_img">
        <Link to={`/seller-profile/seller-collection/NFT/${tokenId}`} state={{ item: props.item }}>
          <img src={image} alt="" className="w-100" />
        </Link>
      </div>

      <div className="creator_info-wrapper">
        <div className="collection_content">
          <h5 className="collection_title mb-0">
            <Link to={`/seller-profile/seller-collection/NFT/${tokenId}`} state={{ item: props.item }}>
              {collectionId+" - "+NFTname}
            </Link>
          </h5>
        </div>
      </div>
    </div>
  );
};

export default SellerNFTCard;
