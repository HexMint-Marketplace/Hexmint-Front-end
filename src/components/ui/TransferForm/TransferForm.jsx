import React from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import { useState } from "react";
import { Container, Row, Col } from "reactstrap";
import Marketplace from "../../../Marketplace.json";

function TransferForm() {
  const [receiverWalletAddress, setReceiverWalletAddress] = useState();
  const location = useLocation();
  const ethers = require("ethers");
  const [message, updateMessage] = useState("");
  const { NFTData } = location.state;
  const [loader, setLoader] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      //get providers and signers
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      // console.log("before update message");
      updateMessage("Please wait.. uploading (upto 5 mins)");

      //Pull the deployed contract instance
      let contract = new ethers.Contract(
        Marketplace.address,
        Marketplace.abi,
        signer
      );
      //transfer the NFT
      let transaction = await contract.transferNFT(NFTData.tokenId,receiverWalletAddress);
      console.log("after create token method called");
      await transaction.wait();
      // console.log("await for transaction");

      alert("Successfully minted your NFT!");
      updateMessage("");
      setReceiverWalletAddress("");
      window.location.replace("/");
    } catch (e) {
      alert("Upload error" + e);
    }
  }
  return (
    <div>
      <section>
        <Container>
          <Row>
            <Col lg="12" md="3" sm="12">
              <div className="px-4 text-center">
                <h1 className="mt-5 mb-3">Transfer</h1>
                <img
                  src={NFTData.image}
                  alt=""
                  className="rounded-circle rounded border border-5 img-fluid"
                  height="200"
                  width="200"
                />
              </div>
            </Col>
            <Col lg="2" md="8" sm="6" className=""></Col>
            <Col lg="8" md="8" sm="6" className="">
              <div className="create__item mt-5">
                <form className="text-center">
                  <div className="form__input">
                    <label
                      htmlFor="receiverWalletAddress"
                      className="text-center"
                    >
                      Receiver's Wallet Address
                    </label>
                    <input
                      type="text"
                      placeholder="Enter Receiver's Wallet Address"
                      onChange={(e) => setReceiverWalletAddress(e.target.value)}
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn text-center p-2 px-5 mt-3 mb-5"
                    onClick={handleSubmit}
                  >Transfer
                    {/* <Link to=''>Transfer</Link> */}

                    {/* <Link to={{pathname:'seller-profile/NFT/transfer-form',img:imgUrl}}>Transfer</Link> */}
                  </button>
                </form>
              </div>
            </Col>
            <Col lg="2" md="8" sm="6" className=""></Col>
          </Row>

          <Row>
            <Col lg="12" md="3" sm="12"></Col>
          </Row>
        </Container>
      </section>
    </div>
  );
}

export default TransferForm;
