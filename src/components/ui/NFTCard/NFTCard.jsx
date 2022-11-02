import React, { useState } from "react";
import { Link } from "react-router-dom";

import "../CollectionCard/CollectionCard.css";

const NFTCard = (props) => {
  const {NFTname, collectionId, contractAddress, description, image, price, seller, tokenId} = props.item;
  // const { title, id, currentBid, creatorImg, imgUrl, creator } = props.item;

  return (
    <div className="single_collection_card">
      <div className="collection_img">
      <Link to={`/explore/collection/NFT/${tokenId}`}>
        <img src={image} alt="" className="w-100" />
      </Link>
      </div>

      <div className="creator_info-wrapper">

          <div className="collection_content">
            <h5 className="collection_title mb-0">
          <Link to={`/explore/collection/NFT/${tokenId}`}>{NFTname}</Link>
            </h5>

            <div className="nft-price-wrapper">
                    {/* {currentBid} */}
                    <span> ETH</span>   
            </div>
          </div>
        

      </div>


    </div>
  );
};

export default NFTCard;