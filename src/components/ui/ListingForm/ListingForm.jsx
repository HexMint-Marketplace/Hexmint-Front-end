import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";
import img01 from "../../../asssets/collectionImages/Apes.jpg";
import { Link } from "react-router-dom";
import Marketplace from "../../../Marketplace.json";
import Loader from "../Loader/Loader";
import CustomerServices from "../../../services/API/CustomerServices";
import { toast } from "react-toastify";

// console.log(img01);
const ListingForm = () => {
  const location = useLocation();
  const [ListingType, setListingType] = useState("1");
  const [listingPrize, setListingPrize] = useState();
  const [message, updateMessage] = useState("");
  const [Duration, setDuration] = useState();
  const ethers = require("ethers");
  const { NFTData } = location.state;

  const [transactionObj, settransactionObj] = useState({});
  // const [tokenid, settokenid] = useState("");
  const [tokenid, settokenid] = useState({});
  const [loader, setLoader] = useState(false);

  console.log("NFTData: ",NFTData);
  async function handleSubmit(e) {
    setLoader(true);
    toast.info("Please wait while we list your NFT");
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
          settokenid(info);
          // settokenIDValue(tokenId.toString());
          console.log("tokenID: in use state ", tokenid);
        }
      );

      //transfer the NFT'
      const price = ethers.utils.parseUnits(listingPrize, "ether");
      let listingPrice = await contract.getListPrice();
      listingPrice = listingPrice.toString();

      let transaction = await contract.ListToken(NFTData.tokenId, price, {
        value: listingPrice,
      });
      console.log("after create token method called");
      await transaction.wait();
      // console.log("await for transaction");

      console.log("await for transaction", transaction);
      settransactionObj(transaction);
      console.log("transactionObj: in use state ", transactionObj);


      updateMessage("");

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
    // if (tokenid && transactionObj) {
    if (Object.keys(tokenid).length !== 0  && Object.keys(transactionObj).length !== 0) {
      console.log("In the saveuseractivity use effect function");
      saveUserActivity("listed", transactionObj, tokenid, new Date());

      settokenid({});
      settransactionObj({});
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
    <div>
      <section>
        <Container>
          <Row>
            <Col lg="12" md="3" sm="12">
              <div className="px-4 text-center">
                <h1 className="mt-5 mb-3">List Item For Sale</h1>
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
              <div className="create__item mt-4">
                <form>
                  <div className="form__input">
                    <label htmlFor="">Listing Type</label>
                    <select
                      onChange={(e) => setListingType(e.target.value)}
                      class="form-select"
                      aria-label="Default select example"
                    >
                      <option selected>Open this select menu</option>
                      <option value="1" name="fixedPrize">
                        Fixed Prize
                      </option>
                      <option value="2" name="timedAuction">
                        Timed-Auction
                      </option>
                    </select>
                  </div>

                  {ListingType === "1" ? (
                    <div className="form__input mt-3">
                      <label htmlFor="">Prize</label>
                      <input
                        type="text"
                        placeholder="Enter Prize"
                        onChange={(e) => setListingPrize(e.target.value)}
                      />
                    </div>
                  ) : (
                    <div>
                      <div className="form__input mt-3">
                        <label htmlFor="">Staritng Prize</label>
                        <input
                          type="text"
                          placeholder="Enter Starting Prize"
                          onChange={(e) => setListingPrize(e.target.value)}
                        />
                      </div>

                      <div className="form__input">
                        <label htmlFor="">Duration</label>
                        <select
                          onChange={(e) => setDuration(e.target.value)}
                          class="form-select"
                          aria-label="Default select example"
                        >
                          <option selected>Open this select menu</option>
                          <option value="1" name="fivedays">
                            5 days
                          </option>
                          <option value="2" name="oneweek">
                            1 week
                          </option>
                          <option value="1" name="twoweek">
                            2 week
                          </option>
                          <option value="2" name="threeweek">
                            3 week
                          </option>
                          <option value="1" name="onemonth">
                            1 month
                          </option>
                          <option value="2" name="twomonth">
                            2 month
                          </option>
                        </select>
                      </div>
                    </div>
                  )}

                  {/* <div className="form__input">
                    <label htmlFor="">Description</label>
                    <textarea
                      name=""
                      id=""
                      rows="7"
                      placeholder="Enter description"
                      className="w-100"
                    ></textarea>
                  </div> */}

                  <div class="col-md-12 text-center">
                    <button
                      type="submit"
                      className="btn text-center p-2 px-5 mt-3 mb-5"
                      onClick={handleSubmit}
                    >
                      Complete Listing
                      {/* <Link to="">Complete Listing</Link> */}
                      {/* <Link to={{pathname:'seller-profile/NFT/transfer-form',img:imgUrl}}>Transfer</Link> */}
                    </button>
                  </div>
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
    )}
    </div>
  );
};

export default ListingForm;
