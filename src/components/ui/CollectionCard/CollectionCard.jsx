import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import UserServices from "../../../services/API/UserServices";

import "./CollectionCard.css";

const CollectionCard = (props) => {
  
  const {NFTcount, _v, _id, collectionDescription, collectionName, createdAt, floorprize, logoImg, totalprize, updatedAt, userid} = props.item;
  const [creatorImg, setCreatorImg] = useState();
  const [loader, setLoader] = useState(false);
  // const {creatorImg} = '';
  console.log("userid: ",userid);
  // const { title, id, currentBid, creatorImg, imgUrl, creator } = props.item;
  useEffect(() => {
    getuserdetails(userid);
  }, []);

  const getuserdetails = async (userid) => {
    try {
      //Get user details by passing the user's wallet address
      const details = await UserServices.getUserDetailsFromUserId(userid);
      console.log("In get user details", details.data);
      setCreatorImg(details.data.propic);
      

    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="single_collection_card">
      <div className="collection_img">

      <Link to={`/explore/collection/${_id}`} state={{collectionData: props.item}}>
        <img data-testid = 'collection_image' src={logoImg} alt="" className="w-100" />

      </Link>
      </div>

      <div className="creator_info-wrapper d-flex gap-3  align-items-center">
          <div className="creator_img">
            <Link to={`/explore/collection/${_id}`} state={{collectionData: props.item}}><img src={creatorImg} alt="" className="creator_image w-100" /></Link>
          </div>

          <div className="collection_content">
            <h5 className="collection_title">
          <Link to={`/explore/collection/${_id}`} state={{collectionData: props.item}}>{collectionName}</Link>
            </h5>
          </div>

      </div>


    </div>
  );
};

export default CollectionCard;