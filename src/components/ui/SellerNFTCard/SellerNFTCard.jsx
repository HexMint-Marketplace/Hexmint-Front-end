import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import CustomerServices from "../../../services/API/CustomerServices";
import "../CollectionCard/CollectionCard.css";

function SellerNFTCard(props) {
  const {
    tokenId,
    seller,
    contractAddress,
    image,
    NFTname,
    description,
    collectionId,
  } = props.item;

  const [collectionName, setcollectionName] = useState("");

  useEffect(() => {
    getCollectionName(collectionId);
  }, []);

  const getCollectionName = async (collectionId) => {
    try {
      const response = await CustomerServices.getCollectionName(collectionId);

      setcollectionName(response.data.collectionName);
    } catch (e) {
      toast.error("Error in getting collection name");
    }
  };
  return (
    <>
      {props.isViewUser && (
        <div className="single_collection_card">
          <div className="collection_img">
            <img src={image} alt="" className="w-100" />
          </div>

          <div className="creator_info-wrapper">
            <div className="collection_content">
              <div className="mb-0">
                <div>
                  {collectionName} - {NFTname}#{tokenId}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {!props.isViewUser && (
        <div className="single_collection_card">
          <div className="collection_img">
            <Link
              to={`/seller-profile/seller-collection/NFT/${tokenId}`}
              state={{ item: props.item }}
            >
              <img src={image} alt="" className="w-100" />
            </Link>
          </div>

          <div className="creator_info-wrapper">
            <div className="collection_content">
              <h5 className="collection_title mb-0">
                <Link
                  to={`/seller-profile/seller-collection/NFT/${tokenId}`}
                  state={{ item: props.item }}
                >
                  {collectionName} - {NFTname}#{tokenId}
                </Link>
              </h5>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default SellerNFTCard;
