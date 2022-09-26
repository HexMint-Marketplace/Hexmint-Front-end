import React, { useState } from "react";
import { Link } from "react-router-dom";

import "./CollectionCard.css";

const CollectionCard = (props) => {
  const { title, id, currentBid, creatorImg, imgUrl, creator } = props.item;

  return (
    <div className="single_collection_card">
      <div className="collection_img">
      <Link to={`/explore/collection/${id}`}>
        <img src={imgUrl} alt="" className="w-100" />
      </Link>
      </div>

      <div className="creator_info-wrapper d-flex gap-3  align-items-center">
          <div className="creator_img">
            <Link to={`/explore/collection/${id}`}><img src={creatorImg} alt="" className="creator_image w-100" /></Link>
          </div>

          <div className="collection_content">
            <h5 className="collection_title">
          <Link to={`/explore/collection/${id}`}>{title}</Link>
            </h5>
          </div>

      </div>


    </div>
  );
};

export default CollectionCard;