import { React, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { COLLECTION_DATA } from "../asssets/data/data.js";
import ProfileHead from "../components/ui/ProfileHead/ProfileHead";
import Loader from "../components/ui/Loader/Loader.jsx";
import UserServices from "../services/API/UserServices";
import MarketplaceJSON from "../Marketplace.json";
import axios from "axios";
import { Container } from "reactstrap";
import HeightBox from "./../components/HeightBox/HeightBox";
import Token from "../services/Token";
import { toast } from "react-toastify";

function SellerProfile() {
  const [userWallet, setuserWallet] = useState({});
  const [loader, setLoader] = useState(false);
  const [userType, setUserType] = useState("");
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [propic, setProPic] = useState("");
  const [email, setemail] = useState("");
  const [DOB, setDOB] = useState("");
  const [mobile, setmobile] = useState("");
  const [issubmit, setissubmit] = useState(false);

  const [data, updateData] = useState([]);
  const [dataFetched, updateFetched] = useState(false);
  const [address, updateAddress] = useState("0x");
  const [totalPrice, updateTotalPrice] = useState("0");

  useEffect(() => {
    setLoader(true);

    const walletaddress = Token.JWTDecodeWalletAddress();

    setuserWallet(walletaddress);
    getuserdetails(walletaddress);
  }, [issubmit]);

  const toggleisSubmit = () => {
    setissubmit(!issubmit);
  };

  const getuserdetails = async (walletAddress) => {
    try {
      //Get user details by passing the user's wallet address

      const details = await UserServices.getUserDetailsFromWalletAddress(
        walletAddress
      );

      //Get user type from token
      const tokenUserType = Token.JWTDecodeUserType();

      if (tokenUserType === "Customer") {
        const userType = tokenUserType;
        setUserType(userType);

        const name = details.data.name;
        setName(name);

        const userName = details.data.username;
        setUserName(userName);

        const propic = details.data.propic;
        setProPic(propic);
      } else {
        const userType = tokenUserType;
        setUserType(userType);

        const name = details.data.name;
        setName(name);

        const userName = details.data.username;
        setUserName(userName);

        const propic = details.data.propic;
        setProPic(propic);

        const email = details.data.email;
        setemail(email);

        const DOB = details.data.DOB;
        setDOB(DOB);

        const mobile = details.data.mobilenumber;
        setmobile(mobile);
      }
    } catch (err) {
      toast.error("Error in getting user details");
    }
    setTimeout(() => {
      setLoader(false);
    }, 2000);
  };

  async function getNFTData() {
    const ethers = require("ethers");
    let sumPrice = 0;
    //After adding your Hardhat network to metamask, get providers and signers
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const addr = await signer.getAddress();

    //Pull the deployed contract instance
    let contract = new ethers.Contract(
      MarketplaceJSON.address,
      MarketplaceJSON.abi,
      signer
    );

    //create an NFT Token
    let transaction = await contract.getMyNFTs();

    /*
     * Below function takes the metadata from tokenURI and the data returned by getMyNFTs() contract function
     * and creates an object of information that is to be displayed
     */

    const items = await Promise.all(
      transaction.map(async (i) => {
        const tokenURI = await contract.tokenURI(i.tokenId);
        let meta = await axios.get(tokenURI);
        meta = meta.data;
        let price = ethers.utils.formatUnits(i.price.toString(), "ether");
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
        return item;
      })
    );

    updateData(items);
    updateFetched(true);
    updateAddress(addr);
    updateTotalPrice(sumPrice.toPrecision(3));
  }

  const params = useParams();
  const tokenId = params.tokenId;
  if (!dataFetched) getNFTData(tokenId);

  return (
    <Container>
      <HeightBox height="60px" />
      {loader ? (
        <Loader isLoading={loader} />
      ) : (
        <ProfileHead
          userWallet={userWallet}
          userType={userType}
          name={name}
          userName={userName}
          propic={propic}
          email={email}
          DOB={DOB}
          mobile={mobile}
          key={COLLECTION_DATA.collectionId}
          collectionData={COLLECTION_DATA}
          data={data}
          setissubmit={toggleisSubmit}
        />
      )}
      <HeightBox height="50px" />
    </Container>
  );
}

export default SellerProfile;
