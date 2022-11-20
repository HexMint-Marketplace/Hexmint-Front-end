import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import UserServices from "../../../services/API/UserServices";
import { Col } from "reactstrap";
import MarketplaceJSON from "../../../Marketplace.json";
import axios from "axios";
import "./CollectionCard.css";
import { toast } from "react-toastify";

const CollectionCard = (props) => {
  const [creatorImg, setCreatorImg] = useState();
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
    // NFTData
  } = props.item;

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
      toast.error(err);
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

    const items_ = items.filter((element) => {
      return element !== undefined;
    });

    if (items_.length > 0) {
      setListedNFTsExist(true);
    }
    return items_;
  }

  if (!isListedNFTsExist) {
    return <></>;
  }

  return (
    <Col lg="4" md="4" sm="6" className="mb-4">
      <div className="single_collection_card">
        <div className="collection_img">
          <Link
            to={`/explore/collection/${_id}`}
            state={{ collectionData: props.item, data: data }}
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
              state={{ collectionData: props.item, data: data }}
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
    </Col>
  );
};

export default CollectionCard;
