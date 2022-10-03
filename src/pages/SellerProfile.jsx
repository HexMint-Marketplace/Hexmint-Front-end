import { React, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { COLLECTION_DATA } from "../asssets/data/data.js";
import NFTList from "../components/ui/NFTList/NFTList.jsx";
import ProfileHead from "../components/ui/ProfileHead/ProfileHead";
import UserCollectionList from "../components/ui/UserCollectionList/UserCollectionList";
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
  const [proPic, setProPic] = useState("");
  const [email, setemail] = useState("");
  const [DOB, setDOB] = useState("");
  const [mobile, setmobile] = useState("");
  // const [showAddress,setShowAddress] = useState([])
  const [issubmit, setissubmit] = useState(false);

  const [data, updateData] = useState([]);
  const [dataFetched, updateFetched] = useState(false);
  const [address, updateAddress] = useState("0x");
  const [totalPrice, updateTotalPrice] = useState("0");

  useEffect(() => {
    setLoader(true);
    const walletAddress = JSON.parse(localStorage.getItem("userAddress"));
    setuserWallet(walletAddress);
    // console.log("Should display",showAddress);

    // call the backend and get details
    getuserdetails(walletAddress.address);
    // console.log("Before checking user type", uType);
    // if (uType === "Customer") {
    //   getuserdetails(walletAddress.address);
    // } else {
    //   getadmindetails(walletAddress.address);
    // }

    console.log("I fire once");
    console.log("In user Effect", userWallet);
    // setLoader(false)
    setTimeout(() => {
      console.log("loader false calling");
      setLoader(false);
    }, 2000);
  }, [issubmit]);

  const toggleisSubmit = () => {
    setissubmit(!issubmit);
  };

  async function getNFTData(tokenId) {
    const ethers = require("ethers");
    let sumPrice = 0;
    //After adding your Hardhat network to your metamask, this code will get providers and signers
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
          owner: i.owner,
          image: meta.image,
          name: meta.name,
          description: meta.description,
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

  // const getuserType = async (walletAddress) => {
  //   try {
  //     const details = await UserServices.getUserType(walletAddress);
  //     console.log("in user type -", details);
  //     console.log("From get user type", details.data.usertype);
  //     const userType = details.data.usertype;
  //     setUserType(userType);
  //     return userType;
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const getuserdetails = async (walletAddress) => {
    try {
      const details = await UserServices.getUserDetails(walletAddress);
      console.log("In get user details", details);
      console.log("In user details. details -", details);

      if (details.data.usertype === "Customer") {
        const userType = details.data.usertype;
        setUserType(userType);

        const name = details.data.name;
        setName(name);

        const userName = details.data.username;
        setUserName(userName);

        const proPic = details.data.profilePic;
        setProPic(proPic);
      } else {
        const userType = details.data.usertype;
        setUserType(userType);

        const name = details.data.name;
        setName(name);

        const userName = details.data.username;
        setUserName(userName);

        const proPic = details.data.profilePic;
        setProPic(proPic);

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

  // const getadmindetails = async (walletAddress) => {
  //   try {
  //     const details = await AdminServices.getAdminDetails(walletAddress);

  //     const email = details.data.email;
  //     setemail(email);

  //     const DOB = details.data.DOB;
  //     setDOB(DOB);

  //     const mobile = details.data.mobile;
  //     setmobile(mobile);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  return (
    <section>
      {loader ? (
        <div>
          <Loader />
        </div>
      ) : (
        <div>
          <ProfileHead
            userWallet={userWallet}
            userType={userType}
            name={name}
            userName={userName}
            proPic={proPic}
            email={email}
            DOB={DOB}
            mobile={mobile}
            key={COLLECTION_DATA.collectionId}
            collectionData={COLLECTION_DATA}
            data={data} 
    
            // profileUpdate = {profileUpdate}
            setissubmit={toggleisSubmit}
            // reloadNow  = {reloadNow}
          />
        </div>
      )}

      {/* <div className="flex flex-col text-center items-center mt-11 text-white">
        <h2 className="font-bold">Your NFTs</h2>
        <div className="flex justify-center flex-wrap max-w-screen-xl">
          {data.map((value, index) => {
            return <NFTs data={value} key={index}></NFTs>;
          })}
        </div>
        <div className="mt-10 text-xl">
          {data.length == 0
            ? "Oops, No NFT data to display (Are you logged in?)"
            : ""}
        </div>
      </div> */}
    </section>
  );
}

export default SellerProfile;
