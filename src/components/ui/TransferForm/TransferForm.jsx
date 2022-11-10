import React from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import Marketplace from "../../../Marketplace.json";
import Loader from "../Loader/Loader"
import { toast } from "react-toastify";
import CustomerServices from "../../../services/API/CustomerServices";

function TransferForm() {

  const [receiverWalletAddress, setReceiverWalletAddress] = useState();
  const location = useLocation();
  const ethers = require("ethers");
  const [message, updateMessage] = useState("");
  const { NFTData } = location.state;
  const [loader, setLoader] = useState(false);

  const [transactionObj, settransactionObj] = useState({});
  const [tokenid, settokenid] = useState("");

  async function handleSubmit(e) {
    setLoader(true);
    toast.info("Please wait while we transfer your NFT");
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
          settokenid(tokenId.toString());
          // settokenIDValue(tokenId.toString());
          console.log("tokenID: in use state ", tokenid);
        }
      );

      //transfer the NFT
      let transaction = await contract.transferNFT(NFTData.tokenId,receiverWalletAddress);
      console.log("after create token method called");
      await transaction.wait();
      console.log("await for transaction", transaction);
      settransactionObj(transaction);

      updateMessage("");
      setReceiverWalletAddress("");
    } catch (e) {
      alert("Upload error" + e);
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
        saveUserActivity("transferred", transactionObj, tokenid, new Date());
  
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
    )}
    </div>
  );
}

export default TransferForm;
