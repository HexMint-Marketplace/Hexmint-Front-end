import { React, useState, useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import "./buyanNFT.css";
import { Link } from "react-router-dom";
import MarketplaceJSON from "../../../Marketplace.json";
import Loader from "../Loader/Loader"
import CustomerServices from "../../../services/API/CustomerServices";
import { toast } from "react-toastify";

const BuyanNFT = (props) => {
  const [message, updateMessage] = useState();
  const [buyerWalletAddress, updateBuyerWalletAddress] = useState();

  const [transactionObj, settransactionObj] = useState({});
  const [tokenid, settokenid] = useState({});
  const [loader, setLoader] = useState(false);

  const {
    _v,
    _id,
    contractAddress,
    collectionDescription,
    collectionName,
    createdAt,
    logoImg,
    numberofNfts,
    ownersCount,
    totalPrice,
    floorPrize,
    updatedAt,
    userid,
  } = props.collectionData;

  const { NFTname, collectionId, description, image, price, seller, tokenId } =
    props.NFTData;

  async function buyNFT(tokenId) {
    setLoader(true);
    toast.info("Please wait while we countinue the transaction");
    try {
        const ethers = require("ethers");
        //After adding your Hardhat network to your metamask, this code will get providers and signers
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        updateBuyerWalletAddress(signer.getAddress());
        //Pull the deployed contract instance
        let contract = new ethers.Contract(MarketplaceJSON.address, MarketplaceJSON.abi, signer);
        const salePrice = ethers.utils.parseUnits(price, 'ether')
        updateMessage("Buying the NFT... Please Wait (Upto 5 mins)")
        
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
            console.log("info: ", info);
            console.log("tokenId: ", tokenId);
            settokenid(info);
            // settokenIDValue(tokenId.toString());
            console.log("tokenID: in use state ", tokenid);
          }
        );

        //run the executeSale function
        let transaction = await contract.executeSale(tokenId, {value:salePrice});
        await transaction.wait();

        console.log("transaction: ", transaction);
        settransactionObj(transaction);
        console.log("transactionObj: in use state ", transactionObj);

        updateMessage("");
    }
    catch(e) {
        alert("Upload Error: "+e)
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
      toast.success("Successfully minted your NFT!");
      setTimeout(() => {
        window.location.replace("/");
      }, 3000);


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
  if (tokenid && transactionObj) {
    console.log("In the saveuseractivity use effect function");
    saveUserActivity("bought", transactionObj, tokenid, new Date());

    // settokenIDValue("");
  }
}, [tokenid, transactionObj]);

  return (
    <div>
    {loader ? (
      <div>
        <Loader isLoading={loader} />
      </div>
    ) : (
    <Container>
      <Row className="">
        <Col lg="1"></Col>
        <Col lg="10" md="4" sm="6" className="mb-3 ">
          <div className="single_service mt-5">
            <Row>
              <form>
                <Col lg="5" md="5" sm="6">
                  <div>
                    <img
                      src={image}
                      alt=""
                      className="w-100 img-fluid bnft-icon"
                    />
                  </div>
                </Col>

                <Col lg="7" md="7" sm="6">
                  <div className="text-start">
                    <div className="h2 bnft-name">
                      {NFTname}
                      <span> #{tokenId}</span>
                    </div>
                    <div className="bcollection-name">{collectionName}</div>

                    <div className="mt-3 d-flex align-items-center">
                      <div className="bowner-name">Owned By</div>
                      <div className="NFT-count p-2 mx-5">{seller}</div>
                    </div>

                    <div className="bprize-wrapper mt-4">
                      <div className="prize-is">
                        {price}
                        <span> ETH</span>
                      </div>

                      <div className="b-prize fw-bold fs-5">
                        {/* {currentBid} ETH */}
                      </div>
                    </div>

                    <div className="buy_buttons align-items-center mb-2">
                    { buyerWalletAddress == props.NFTData.owner || buyerWalletAddress == props.NFTData.seller ?
                        <button className="buyNow_button  d-flex align-items-center" onClick={() => buyNFT(tokenId)}>Buy this NFT</button>
                        : <div className="text-emerald-700">You are the owner of this NFT</div>
                    }
                    
                    <div className="text-green text-center mt-3">{message}</div>
                      {/* <button
                        className="buyNow_button  d-flex align-items-center"
                        onClick={() => buyNFT(tokenId)}
                      > */}
                        {/* <Link to="">Buy Now</Link> */}
                        {/* Buy Now */}
                      {/* </button> */}
                    </div>
                  </div>
                </Col>
              </form>
            </Row>
          </div>
        </Col>
        <Col lg="1"></Col>
      </Row>
    </Container>
    )}
    </div>
  );
};

export default BuyanNFT;
