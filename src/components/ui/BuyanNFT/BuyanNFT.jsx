import { React, useState } from "react";
import { Container, Row, Col } from "reactstrap";
import "./buyanNFT.css";
import { Link } from "react-router-dom";
import MarketplaceJSON from "../../../Marketplace.json";

const BuyanNFT = (props) => {
  const [message, updateMessage] = useState();
  const [buyerWalletAddress, updateBuyerWalletAddress] = useState();
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
        //run the executeSale function
        let transaction = await contract.executeSale(tokenId, {value:salePrice});
        await transaction.wait();

        alert('You successfully bought the NFT!');
        updateMessage("");
    }
    catch(e) {
        alert("Upload Error: "+e)
    }
}

  return (
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
  );
};

export default BuyanNFT;
