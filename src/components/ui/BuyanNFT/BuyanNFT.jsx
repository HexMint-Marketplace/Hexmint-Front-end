import { React, useState, useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import "./buyanNFT.css";
import MarketplaceJSON from "../../../Marketplace.json";
import Loader from "../Loader/Loader";
import CustomerServices from "../../../services/API/CustomerServices";
import AuthServices from "../../../services/AuthServices";
import Token from "../../../services/Token";
import { toast } from "react-toastify";
import Card from "@mui/material/Card";
import HeightBox from "./../../HeightBox/HeightBox";
import CardContent from "@mui/material/CardContent";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { useAccount, useConnect, useEnsName } from "wagmi";
import { Link, useNavigate } from "react-router-dom";
import SellIcon from "@mui/icons-material/Sell";

const BuyanNFT = (props) => {
  const [message, updateMessage] = useState();
  // const [tokenid, settokenid] = useState("");
  const [buyerWalletAddress, updateBuyerWalletAddress] = useState();
  const [transactionObj, settransactionObj] = useState({});
  const [tokenid, settokenid] = useState({});
  const [loader, setLoader] = useState(false);
  const { address, isConnected } = useAccount();
  const [BuyerUserType, setBuyerUserType] = useState("");
  const navigate = useNavigate();

  const {
    _v,
    _id,
    contractAddress,
    collectionName,
    collectionDescription,
    createdAt,
    floorPrize,
    logoImg,
    numberofNfts,
    ownersCount,
    totalPrice,
    updatedAt,
    userid,
  } = props.collectionData;

  const { NFTname, collectionId, description, image, price, seller, tokenId } =
    props.NFTData;

  console.log("props.NFTData: ", props.collectionData);

  async function buyNFT(tokenId) {
    if (!isConnected) {
      toast.info("Please connect your wallet");
      return;
    }
    setLoader(true);
    toast.info("Please wait while we countinue the transaction");
    try {
      const ethers = require("ethers");
      //After adding your Hardhat network to your metamask, this code will get providers and signers
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      console.log("signer.getAddress(): ", signer.getAddress());
      updateBuyerWalletAddress(signer.getAddress());
      console.log("buyerWalletAddress: ", buyerWalletAddress);
      //Pull the deployed contract instance
      let contract = new ethers.Contract(
        MarketplaceJSON.address,
        MarketplaceJSON.abi,
        signer
      );

      contract.on(
        "TokenStatusUpdatedSuccess",
        (tokenId, contractAddress, seller, price, currentlyListed, event) => {
          let info = {
            tokenId: tokenId,
            contractAddress: contractAddress,
            seller: seller,
            price: price,
            currentlyListed: currentlyListed,
            data: event,
          };

          settokenid(info);
          // settokenIDValue(tokenId.toString());
          console.log("tokenID: in use state ", tokenid);
        }
      );

      console.log("contract: ", contract);
      const referralRate = parseInt(await contract.getReferralRate());
      console.log("rate: ", referralRate);
      console.log("price: ", (price * (referralRate + 100)) / 100);
      const totalFee = (price * (referralRate + 100)) / 100;
      console.log("total feeeeeeeeeeee: ", totalFee);
      const salePrice = ethers.utils.parseEther(totalFee.toString());

      updateMessage("Buying the NFT... Please Wait (Upto 5 mins)");
      console.log("update message");
      //run the executeSale function
      let transaction = await contract.executeSale(tokenId, {
        value: salePrice,
      });
      await transaction.wait();
      console.log("transaction: ", transaction);
      settransactionObj(transaction);
      console.log("transactionObj: in use state ", transactionObj);
    } catch (e) {
      // alert("Upload Error: " + e);
      toast.error("Upload Error: " + e);
    }
  }

  const saveUserActivity = async (
    activityType,
    transaction,
    contractInfo,
    transactionTime
  ) => {
    try {
      const response = await CustomerServices.saveUserActivity(
        activityType,
        transaction,
        contractInfo,
        transactionTime
      );
      if (response.status === 200) {
        console.log("User activity saved successfully");
        toast.success("Successfully bought the NFT!");
        setTimeout(() => {
          window.location.replace("/");
        }, 4000);
      } else {
        toast.error("Error Occured!");
        setLoader(false);
      }
    } catch (error) {
      console.log("Error occur", error);
      toast.error("Error Occured!");
      setLoader(false);
    }
  };

  useEffect(() => {
    console.log("use effect called -------------------------------");
    console.log(
      "in use effect tokenid: ",
      tokenid,
      "in use effect transactionObj: ",
      transactionObj
    );
    if (
      Object.keys(tokenid).length !== 0 &&
      Object.keys(transactionObj).length !== 0
    ) {
      console.log("In the saveuseractivity use effect function");
      saveUserActivity("bade", transactionObj, tokenid, new Date());

      settokenid({});
      settransactionObj({});
      // settokenIDValue("");
    }
  }, [tokenid, transactionObj]);

  useEffect(() => {
    const walletAddress = Token.JWTDecodeWalletAddress();
    const userType = Token.JWTDecodeUserType();
    updateBuyerWalletAddress(walletAddress);
    setBuyerUserType(userType);
  }, []);
  if (buyerWalletAddress == undefined) {
    return null;
  }

  if (loader) {
    return <Loader isLoading={loader} />;
  } else {
    return (
      <Container>
        <HeightBox height="20px" />
        <div className="mt-4 d-flex align-items-center">
          <Card sx={{ borderRadius: 4 }}>
            <CardContent>
              <Row>
                <Col lg="6" md="6" sm="12">
                  <div>
                    <img
                      src={image}
                      alt=""
                      className="w-100 img-fluid bnft-icon"
                    />
                  </div>
                </Col>
                <Col lg="6" md="6" sm="12">
                  <Card sx={{ p: 3 }} elevation={3}>
                    <CardContent>
                      <h4>
                        {NFTname}
                        <span> #{tokenId}</span>
                      </h4>
                      <div className="bcollection-name">{collectionName}</div>
                      <Card sx={{ p: 0.2, mt: 0.5, mb: 2 }}>
                        {buyerWalletAddress !== props.NFTData.seller ? (
                          <CardContent>
                            <h6 className="d-inline">Owned By : </h6>
                            <Link to={`/profile-view/${seller}`}>
                              <span className="d-inline">
                                {seller.substring(0, 16) + "........"}
                              </span>
                            </Link>
                          </CardContent>
                        ) : (
                          <CardContent>
                            <h6 className="d-inline">Owned By : </h6>
                            <span className="d-inline">You</span>
                          </CardContent>
                        )}
                      </Card>
                      <div className="prize-is">
                        <h5 className="py-2">Price : {price} ETH</h5>
                      </div>
                    </CardContent>
                  </Card>
                  {buyerWalletAddress !== props.NFTData.seller ? (
                    <Button
                      sx={{ mt: 3, mb: 3 }}
                      className="buyNow_button  d-flex align-items-center"
                      onClick={() => buyNFT(tokenId)}
                      fullWidth
                      disabled={BuyerUserType !== "Customer" ? true : false}
                    >
                      <span className="text-white">
                        {" "}
                        <SellIcon /> Buy this NFT
                      </span>
                    </Button>
                  ) : (
                    <Paper sx={{ p: 3, m: 1 }} elevation={3}>
                      <span className="text-white">
                        You are the owner of this NFT
                      </span>
                    </Paper>
                  )}
                </Col>
              </Row>
            </CardContent>
          </Card>
        </div>
      </Container>
    );
  }
};

export default BuyanNFT;
