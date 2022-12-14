import { React, useState, useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import "./buyanNFT.css";
import MarketplaceJSON from "../../../Marketplace.json";
import Loader from "../Loader/Loader";
import CustomerServices from "../../../services/API/CustomerServices";
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
  const [buyerWalletAddress, updateBuyerWalletAddress] = useState();
  const [transactionObj, settransactionObj] = useState({});
  const [tokenid, settokenid] = useState({});
  const [loader, setLoader] = useState(false);
  const [BuyerUserType, setBuyerUserType] = useState("");
  const { address, isConnected } = useAccount();

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

  useEffect(() => {
    const walletAddress = Token.JWTDecodeWalletAddress();
    const userType = Token.JWTDecodeUserType();
    updateBuyerWalletAddress(walletAddress);
    setBuyerUserType(userType);
  }, []);

  useEffect(() => {
    if (
      Object.keys(tokenid).length !== 0 &&
      Object.keys(transactionObj).length !== 0
    ) {
      saveUserActivity("bought", transactionObj, tokenid, new Date());
      settokenid({});
      settransactionObj({});
    }
  }, [tokenid, transactionObj]);

  async function buyNFT(tokenId) {
    if (!isConnected) {
      toast.info("Please connect your wallet");
      return;
    }
    setLoader(true);
    toast.info("Please wait while we continue the transaction");
    try {
      const ethers = require("ethers");
      //After adding your Hardhat network to your metamask, this code will get providers and signers
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      updateBuyerWalletAddress(signer.getAddress());

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
        }
      );

      const referralRate = parseInt(await contract.getReferralRate());
      const totalFee = (price * (referralRate + 100)) / 100;
      const salePrice = ethers.utils.parseEther(totalFee.toString());

      //run the executeSale function
      let transaction = await contract.executeSale(tokenId, {
        value: salePrice,
      });
      await transaction.wait();
      transaction.referralRate = referralRate;
      settransactionObj(transaction);
    } catch (e) {
      toast.error("Upload Error: " + e);
      setLoader(false);
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
        toast.success("Successfully bought the NFT!");
        setTimeout(() => {
          window.location.replace("/");
        }, 4000);
      } else {
        toast.error("Error Occured!");
        setLoader(false);
      }
    } catch (error) {
      toast.error("Error Occured!");
      setLoader(false);
    }
  };

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
                  {buyerWalletAddress !== props.NFTData.seller ||
                  !isConnected ? (
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
