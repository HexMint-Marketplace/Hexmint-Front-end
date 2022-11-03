import React from "react";
import { useState, useEffect } from "react";
import { uploadFileToIPFS, uploadJSONToIPFS } from "../pinata";
import { Link } from "react-router-dom";
import Marketplace from "../Marketplace.json";
import { useLocation } from "react-router";
import { Container, Row, Col } from "reactstrap";
import CommonHeader from "../components/ui/CommonHeader/CommonHeader";
import "../styles/create.css";
import CustomerServices from "../services/API/CustomerServices";
import { toast } from "react-toastify";

function Create() {
  const [tokenIDValue, settokenIDValue] = useState("");
  const [transaction, setTransaction] = useState(0);
  const [formParams, updateFormParams] = useState({
    title: "",
    description: "",
    collectionId: "",
  });
  const [fileURL, setFileURL] = useState(null);
  const ethers = require("ethers");
  const [message, updateMessage] = useState("");
  // let tokenID = "";

  //getting user wallet address
  // const location = useLocation();
  // // const walletAddress = location.userAddress;

  const [allCollections, setAllCollections] = useState([]);
  const [loader, setLoader] = useState(false);

  const { PINATA_API_KEY } = process.env;

  //This function uploads the NFT image to IPFS
  async function OnChangeFile(e) {
    var file = e.target.files[0];
    // console.log("e from onchange function: ", e);
    // console.log("file: ", file);
    console.log("process: ", PINATA_API_KEY);
    //check for file extension
    try {
      //upload the file to IPFS
      const response = await uploadFileToIPFS(file);
      // console.log("response is: ", response);
      if (response.success === true) {
        // console.log("Uploaded image to Pinata: ", response.pinataURL);
        setFileURL(response.pinataURL);
      }
    } catch (e) {
      console.log("Error during file upload", e);
    }
  }

  //This function uploads the metadata to IPFS
  async function uploadMetadataToIPFS() {
    const { title, description, collectionId } = formParams;
    //Make sure that none of the fields are empty
    // console.log(
    //   "title: ",
    //   title,
    //   " description: ",
    //   description,
    //   " collectionId: ",
    //   collectionId,
    //   " fileURL: ",
    //   fileURL
    // );
    if (!title || !description || !collectionId || !fileURL) return;

    const nftJSON = {
      title,
      description,
      collectionId,
      image: fileURL,
    };

    try {
      //upload the metadata JSON to IPFS
      const response = await uploadJSONToIPFS(nftJSON);
      if (response.success === true) {
        // console.log("Uploaded JSON to Pinata: ", response);
        return response.pinataURL;
      }
    } catch (e) {
      console.log("error uploading JSON metadata:", e);
    }
  }

  async function mintNFT(e) {
    e.preventDefault();
    // console.log("e from mintNFT function: ",e.target.files[0]);
    //Upload data to IPFS
    try {
      // console.log("before await");
      const metadataURL = await uploadMetadataToIPFS();
      // console.log("metadataURL: ", metadataURL);
      //After adding your Hardhat network to your metamask, this code will get providers and signers
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

          const tokenID = tokenId.toString();
          settokenIDValue(tokenId.toString());
          console.log("tokenID: ", tokenID);
        }
      );

      //massage the params to be sent to the create NFT request
      // console.log("before price");
      // const price = ethers.utils.parseUnits(formParams.price, "ether");
      // let listingPrice = await contract.getListPrice();
      // console.log("after get listing price");
      // listingPrice = listingPrice.toString();

      //actually create the NFT
      // console.log("before create token method called");
      let transac = await contract.createToken(metadataURL.toString());
      // console.log("after create token method called");
      await transac.wait();
      setTransaction(transac);
      console.log("await for transaction", transaction);

      const transactionTime = new Date();
      // // update the user activity(mint) in the database for the user
      // //Activity type, from wallet address, prize, transaction hash,

      alert("Successfully minted your NFT!");

      console.log("Successfully minted your NFT!");

      // saveUserActivity("minted", transaction, tokenID, transactionTime);
      console.log("after save user activity");

      // const transactionTime = new Date();
      // // update the user activity(mint) in the database for the user
      // //Activity type, from wallet address, prize, transaction hash,
      // saveUserActivity("minted", transaction, transactionTime);

      updateMessage("");
      updateFormParams({
        title: "",
        description: "",
        collectionId: "",
      });
      console.log("after update form params");
      // window.location.replace("/");
    } catch (e) {
      alert("Upload error" + e);
    }
  }

  useEffect(() => {
    if (tokenIDValue && transaction) {
      saveUserActivity("minted", transaction, tokenIDValue, new Date());
      settokenIDValue("");
    }
  }, [tokenIDValue]);

  // console.log("Working", process.env);

  useEffect(() => {
    getCollections();
  }, []);

  const getCollections = async () => {
    setLoader(true);
    try {
      const response = await CustomerServices.getAllCollections();

      if (response.status === 200) {
        // console.log("hi new data........", response.data.collections);
        setAllCollections(response.data.collections);
      } else {
        toast.error("Error Occured!");
      }
    } catch (error) {
      console.log("Error occur", error);
      toast.error("Error Occured!");
    }
    setTimeout(() => {
      setLoader(false);
    }, 200);
  };

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
      } else {
        toast.error("Error Occured!");
      }
    } catch (error) {
      console.log("Error occur", error);
      toast.error("Error Occured!");
    }
  };

  return (
    <div>
      <CommonHeader title={"Create New Item"} />
      <section>
        <Container>
          <Row>
            <Col lg="2"></Col>
            <Col lg="8" md="8" sm="6">
              <div className="create__item">
                <form>
                  <div className="form__input">
                    <label htmlFor="image">Upload File</label>
                    <input
                      type={"file"}
                      onChange={OnChangeFile}
                      className="upload__input"
                      required
                    />
                  </div>

                  <div className="form__input">
                    <label htmlFor="title">Title</label>
                    <input
                      id="title"
                      type="text"
                      onChange={(e) =>
                        updateFormParams({
                          ...formParams,
                          title: e.target.value,
                        })
                      }
                      placeholder="Enter title"
                      required
                    ></input>
                  </div>

                  <div className="form__input">
                    <label htmlFor="description">Description</label>
                    <textarea
                      name=""
                      id="description"
                      rows="7"
                      placeholder="Enter description"
                      className="w-100"
                      onChange={(e) =>
                        updateFormParams({
                          ...formParams,
                          description: e.target.value,
                        })
                      }
                      required
                    ></textarea>
                  </div>

                  <div className="form__input">
                    <label htmlFor="collection">Collection</label>
                    <select
                      class="form-select"
                      aria-label="Default select example"
                      onChange={(e) =>
                        updateFormParams({
                          ...formParams,
                          collectionId: e.target.value,
                        })
                      }
                    >
                      <option selected>Open this select menu</option>
                      {allCollections.map((row) => (
                        <option value={row._id}>{row.collectionName}</option>
                      ))}
                      required
                    </select>
                  </div>

                  <div className="d-flex align-items-center gap-4 mt-5 mb-5">
                    <button
                      onClick={mintNFT}
                      className="btn mint_button d-flex align-items-center gap-2"
                    >
                      <Link to="/explore">Create</Link>
                    </button>
                  </div>
                </form>
              </div>
            </Col>
            <Col lg="2"></Col>
          </Row>
        </Container>
      </section>
    </div>
  );
}

export default Create;
