import React, { useState } from "react";
import { Link } from "react-router-dom";

import "../CollectionCard/CollectionCard.css";

const NFTCard = (props) => {
  const { title, id, currentBid, creatorImg, imgUrl, creator } = props.item;

  return (
    <div className="single_collection_card">
      <div className="collection_img">
      <Link to={`/explore/collection/NFT/${id}`}>
        <img src={imgUrl} alt="" className="w-100" />
      </Link>
      </div>

      <div className="creator_info-wrapper">

          <div className="collection_content">
            <h5 className="collection_title mb-0">
          <Link to={`/explore/collection/NFT/${id}`}>{title}</Link>
            </h5>

            <div className="nft-price-wrapper">
                    {currentBid}
                    <span> ETH</span>   
            </div>
          </div>
        

      </div>


    </div>
  );
};

export default NFTCard;