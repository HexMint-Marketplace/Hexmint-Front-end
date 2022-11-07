import { React, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { COLLECTION_DATA } from "../asssets/data/data.js";
import NFTList from "../components/ui/NFTList/NFTList.jsx";
import ProfileHead from "../components/ui/ProfileHead/ProfileHead";
import Loader from "../components/ui/Loader/Loader.jsx";
import UserServices from "../services/API/UserServices";
import AdminServices from "../services/API/AdminServices";
import { useNavigate } from "react-router-dom";
import MarketplaceJSON from "../Marketplace.json";
import axios from "axios";
import NFTs from "./NFTs";

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
    const walletAddress = JSON.parse(localStorage.getItem("userAddress"));
    setuserWallet(walletAddress);

    getuserdetails(walletAddress.address);

    setTimeout(() => {
      console.log("loader false calling");
      setLoader(false);
    }, 2000);
  }, [issubmit]);

  const toggleisSubmit = () => {
    setissubmit(!issubmit);
  };

  const getuserdetails = async (walletAddress) => {
    try {
      //Get user details by passing the user's wallet address
      const details = await UserServices.getUserDetailsFromWalletAddress(walletAddress);
      console.log("In get user details", details);

      if (details.data.usertype === "Customer") {
        const userType = details.data.usertype;
        setUserType(userType);

        const name = details.data.name;
        setName(name);

        const userName = details.data.username;
        setUserName(userName);

        const propic = details.data.propic;
        setProPic(propic);
      } else {
        const userType = details.data.usertype;
        setUserType(userType);

        const name = details.data.name;
        setName(name);

        const userName = details.data.username;
        setUserName(userName);

        const propic = details.data.profilePic;
        setProPic(propic);

        const email = details.data.email;
        setemail(email);

        const DOB = details.data.DOB;
        setDOB(DOB);

        const mobile = details.data.mobilenumber;
        setmobile(mobile);
      }
    } catch (err) {
      console.log(err);
    }
  };

  async function getNFTData() {
    const ethers = require("ethers");
    let sumPrice = 0;
    //After adding your Hardhat network to metamask, get providers and signers
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    console.log("signer: ",signer);
    // console.log("signer: ",signer);
    const addr = await signer.getAddress();
    console.log("addr: ",addr);

    //Pull the deployed contract instance
    let contract = new ethers.Contract(
      MarketplaceJSON.address,
      MarketplaceJSON.abi,
      signer
    );

    //create an NFT Token
    let transaction = await contract.getMyNFTs();
    console.log("transaction: ",transaction);
    /*
     * Below function takes the metadata from tokenURI and the data returned by getMyNFTs() contract function
     * and creates an object of information that is to be displayed
     */

    const items = await Promise.all(
      transaction.map(async (i) => {
        console.log("tokenID", i.tokenId);
        const tokenURI = await contract.tokenURI(i.tokenId);
        let meta = await axios.get(tokenURI);
        // console.log("meta: ", meta);
        meta = meta.data;
        // console.log("i: ", i);
        let price = ethers.utils.formatUnits(i.price.toString(), "ether");
        let item = {
          price,
          tokenId: i.tokenId.toNumber(),
          seller: i.seller,
          contractAddress: i.contractAddress,
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
    <section>
      {loader ? (
        <div>
          <Loader isLoading = {loader} />
        </div>
      ) : (
        <div>
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
        </div>
      )}
    </section>
  );
}

export default SellerProfile;
