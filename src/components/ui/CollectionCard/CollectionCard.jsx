import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import UserServices from "../../../services/API/UserServices";
import MarketplaceJSON from "../../../Marketplace.json";
import axios from "axios";
import "./CollectionCard.css";

const CollectionCard = (props) => {

  const [creatorImg, setCreatorImg] = useState();
  const [loader, setLoader] = useState(false);
  const [dataFetched, updateFetched] = useState(false);
  const [data, updateData] = useState([]);
  const [isListedNFTsExist, setListedNFTsExist] = useState(false);
  const {
    _v,
    _id,
    collectionDescription,
    collectionName,
    createdAt,
    logoImg,
    updatedAt,
    userid,
  } = props.item;

  // const date = new Date();
  // date.setTime(date.getTime() + 5 * 60 * 1000);
  // console.log("end date: ", date);
  // const date1 = new Date("2022-11-09T19:10:22.991+00:00");
  // const duration = date.getTime()-date1.getTime();
  // const days = Math.floor(duration/(1000 * 3600 * 24));
  // const hours = Math.floor((duration%(1000 * 3600 * 24))/(1000 * 3600));
  // const minutes = Math.floor(((duration%(1000 * 3600 * 24))%(1000 * 3600))/(1000*60));
  // console.log("created At: ", days, hours, minutes);
  // console.log("created            : ", new Date(date1.getTime()).toISOString());

  useEffect(() => {
    getuserdetails(userid);
    const fetchData = async () => {
      const _data = await getNFTData();
      updateData(_data);
      updateFetched(true);
    };
    fetchData().catch(console.error);
  }, []);

  const getuserdetails = async (userid) => {
    try {
      //Get user details by passing the user's wallet address
      const details = await UserServices.getUserDetailsFromUserId(userid);
      setCreatorImg(details.data.propic);
    } catch (err) {
      console.log(err);
    }
  };


  async function getNFTData() {
    const ethers = require("ethers");

    let sumPrice = 0;
    let numofNfts = 0;
    let floorPrize = Number.MAX_SAFE_INTEGER;

    //After adding your Hardhat network to metamask, get providers and signers
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner(MarketplaceJSON.address);

    //Pull the deployed contract instance
    let contract = new ethers.Contract(
      MarketplaceJSON.address,
      MarketplaceJSON.abi,
      signer
    );

    let transaction = await contract.getAllNFTs();

    const items = await Promise.all(
      transaction.map(async (i) => {
        const tokenURI = await contract.tokenURI(i.tokenId);
        let meta = await axios.get(tokenURI);
        meta = meta.data;
        let price = ethers.utils.formatUnits(i.price.toString(), "ether");
        if (meta.collectionId === props.item._id) {
          let item = {
            price,
            tokenId: i.tokenId.toNumber(),
            seller: i.seller,
            contractAddress: i._owner,
            image: meta.image,
            NFTname: meta.title,
            description: meta.description,
            collectionId: meta.collectionId,
          };
          sumPrice += Number(price);
          numofNfts += 1;
          if (Number(price) < floorPrize) {
            console.log("floor prize updated: ", price);
            floorPrize = Number(price);
          }
          return item;
        }
      })
    );

    props.item.numberofNfts = numofNfts;
    props.item.totalPrice = sumPrice;

    if (floorPrize === Number.MAX_SAFE_INTEGER) {
      props.item.floorPrize = 0;
    } else {
      props.item.floorPrize = floorPrize;
    }
    // updateTotalPrice(sumPrice.toPrecision(3));
    console.log("items_: ", items);
    const items_ = items.filter((element) => {
      return element !== undefined;
    });
    console.log("items_: ", items_);
    if (items_.length > 0) {
      setListedNFTsExist(true);
    }
    return items_;
  }
  // console.log("isListedNFTsExist: ", isListedNFTsExist);
  if (!isListedNFTsExist) {
    return null;
  }

  return (
    <div className="single_collection_card">
      <div className="collection_img">
        <Link
          to={`/explore/collection/${_id}`}
          state={{ collectionData: props.item , data: data}}
        >
          <img
            data-testid="collection_image"
            src={logoImg}
            alt=""
            className="w-100"
          />
        </Link>
      </div>

      <div className="creator_info-wrapper d-flex gap-3  align-items-center">
        <div className="creator_img">
          <Link
            to={`/explore/collection/${_id}`}
            state={{ collectionData: props.item , data: data}}
          >
            <img src={creatorImg} alt="" className="creator_image w-100" />
          </Link>
        </div>

        <div className="collection_content">
          <h5 className="collection_title">
            <Link
              to={`/explore/collection/${_id}`}
              state={{ collectionData: props.item, data: data }}
            >
              {collectionName}
            </Link>
          </h5>
        </div>
      </div>
    </div>
  );
};

export default CollectionCard;
