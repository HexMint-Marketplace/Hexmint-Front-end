import { React, useState, useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import "./bidNFT.css";
import MarketplaceJSON from "../../../Marketplace.json";
import Loader from "../Loader/Loader";
import CustomerServices from "../../../services/API/CustomerServices";
import UserServices from "../../../services/API/UserServices";
import Token from "../../../services/Token";
import { toast } from "react-toastify";
import Card from "@mui/material/Card";
import HeightBox from "./../../HeightBox/HeightBox";
import CardContent from "@mui/material/CardContent";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { useAccount, useConnect, useEnsName } from "wagmi";
import { Link } from "react-router-dom";
import AccessAlarmsIcon from "@mui/icons-material/AccessAlarms";
import SellIcon from "@mui/icons-material/Sell";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Formik } from "formik";
import * as Yup from "yup";

const BidNFT = (props) => {
  const [isShown, setisShown] = useState(false);
  const [buyerWalletAddress, updateBuyerWalletAddress] = useState();
  const [transactionObj, settransactionObj] = useState({});
  const [tokenid, settokenid] = useState({});
  const [loader, setLoader] = useState(false);
  const [BuyerUserType, setBuyerUserType] = useState("");
  const { address, isConnected } = useAccount();

  const initialValues = {
    biddingPrice: "",
  };

  const validationSchema = Yup.object().shape({
    biddingPrice: Yup.number()
      .required("Required")
      .min(
        Number(props.NFTData.price),
        "Price must be greater than" + props.NFTData.price
      )
      .label("biddingPrice"),
  });

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

  const {
    NFTname,
    collectionId,
    description,
    image,
    price,
    seller,
    tokenId,
    currentbid,
    currentBidder,
    remainingTime,
    endDate,
    initialBid,
  } = props.NFTData;

  async function bidNFT(values) {
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
      const referralRate = parseInt(await contract.getReferralRate());
      const totalFee = (values.biddingPrice * (referralRate + 100)) / 100;
      const salePrice = ethers.utils.parseEther(totalFee.toFixed(5));
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
      let transaction = await contract.chargeForbid(
        tokenId,
        currentBidder,
        referralRate,
        {
          value: salePrice,
        }
      );
      await transaction.wait();
      const details = await UserServices.getUserDetailsFromWalletAddress(
        seller
      );
      transaction.ownerId = details.data.userid;
      transaction.currentbid = values.biddingPrice;
      transaction.referralRate = referralRate;
      transaction.endDate = endDate;

      settransactionObj(transaction);
    } catch (e) {
      toast.error("Error while bidding NFT");
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
        toast.success("Successfully bade!");
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

  useEffect(() => {
    if (
      Object.keys(tokenid).length !== 0 &&
      Object.keys(transactionObj).length !== 0
    ) {
      saveUserActivity("bade", transactionObj, tokenid, new Date());
      settokenid({});
      settransactionObj({});
    }
  }, [tokenid, transactionObj]);

  useEffect(() => {
    const walletAddress = Token.JWTDecodeWalletAddress();
    const userType = Token.JWTDecodeUserType();
    updateBuyerWalletAddress(walletAddress);
    setBuyerUserType(userType);
  }, []);
  if (buyerWalletAddress == undefined) {
    return <></>;
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
                        <h5 className="py-2">Current bid : {price} ETH</h5>
                        <div>
                          <AccessAlarmsIcon /> {remainingTime}{" "}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  {buyerWalletAddress !== props.NFTData.seller  ||
                  !isConnected ? (
                    <>
                      <Button
                        sx={{ mt: 3, mb: 3 }}
                        className="buyNow_button  d-flex align-items-center"
                        onClick={() => setisShown(true)}
                        fullWidth
                        disabled={
                          BuyerUserType === "Customer" || !isConnected
                            ? false
                            : true
                        }
                      >
                        <span className="text-white">
                          <SellIcon /> Place Bid
                        </span>
                      </Button>
                      <>
                        {isShown && (
                          <Formik
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                            onSubmit={bidNFT}
                          >
                            {(formikProps) => {
                              const {
                                values,
                                handleChange,
                                handleSubmit,
                                errors,
                                touched,
                              } = formikProps;

                              return (
                                <Box
                                  sx={{
                                    boxShadow: 12,
                                    width: "100%",
                                    padding: 3,
                                    borderRadius: 2,
                                    marginBottom: 5,
                                    textAlign: "center",
                                    outline: "none",
                                  }}
                                >
                                  <form>
                                    <TextField
                                      type="number"
                                      name="biddingPrice"
                                      value={values.biddingPrice}
                                      onChange={handleChange("biddingPrice")}
                                      helperText={
                                        touched.bidPrice && errors.bidPrice
                                      }
                                      fullWidth
                                      error={errors.biddingPrice}
                                      variant="outlined"
                                      label="biddingPrice"
                                      placeholder="Enter Bid Amount"
                                    />

                                    <Button
                                      color="primary"
                                      onClick={handleSubmit}
                                      className="btn btn-primary"
                                      variant="contained"
                                      sx={{ mt: 2, mb: 2 }}
                                    >
                                      Bid Now
                                    </Button>
                                  </form>
                                </Box>
                              );
                            }}
                          </Formik>
                        )}
                      </>
                    </>
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

export default BidNFT;
