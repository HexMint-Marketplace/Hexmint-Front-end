import React, { useState } from "react";
import { Link } from "react-router-dom";

import "../CollectionCard/CollectionCard.css";

const SellerNFTCard = (props) => {
  const { title, id, currentBid, creatorImg, imgUrl, creator } = props.item;

  return (
    <div className="single_collection_card">
      <div className="collection_img">
      <Link to={`/seller-profile/seller-collection/NFT/${id}`}>
        <img src={imgUrl} alt="" className="w-100" />
      </Link>
      </div>

      <div className="creator_info-wrapper">

          <div className="collection_content">
            <h5 className="collection_title mb-0">
           <Link to={`/seller-profile/seller-collection/NFT/${id}`}>{title}</Link>
            </h5>
          </div>
        

      </div>


    </div>
  );
};

export default SellerNFTCard;