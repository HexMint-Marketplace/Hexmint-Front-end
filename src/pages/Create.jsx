import React from "react";
import { useState } from "react";
import { uploadFileToIPFS, uploadJSONToIPFS } from "../pinata";
import { Link } from "react-router-dom";
import Marketplace from "../Marketplace.json";
import { useLocation } from "react-router";
import { Container, Row, Col } from "reactstrap";
import CommonHeader from "../components/ui/CommonHeader/CommonHeader";
import "../styles/create.css";

function Create() {
  const [formParams, updateFormParams] = useState({
    title: "",
    description: "",
    price: "",
    collection: "",
  });
  const [fileURL, setFileURL] = useState(null);
  const ethers = require("ethers");
  const [message, updateMessage] = useState("");
  const location = useLocation();

  const { PINATA_API_KEY } = process.env;

  //This function uploads the NFT image to IPFS
  async function OnChangeFile(e) {
    var file = e.target.files[0];
    console.log("file: ", file);
    console.log("process: ", PINATA_API_KEY);
    //check for file extension
    try {
      //upload the file to IPFS
      const response = await uploadFileToIPFS(file);
      console.log("response is: ", response);
      if (response.success === true) {
        console.log("Uploaded image to Pinata: ", response.pinataURL);
        setFileURL(response.pinataURL);
      }
    } catch (e) {
      console.log("Error during file upload", e);
    }
  }

  //This function uploads the metadata to IPFS
  async function uploadMetadataToIPFS() {
    const { title, description, price, collection } = formParams;
    //Make sure that none of the fields are empty
    console.log(
      "title: ",
      title,
      " description: ",
      description,
      " price: ",
      price,
      " collection: ",
      collection,
      " fileURL: ",
      fileURL
    );
    if (!title || !description || !price || !collection || !fileURL) return;

    const nftJSON = {
      title,
      description,
      price,
      collection,
      image: fileURL,
    };

    try {
      //upload the metadata JSON to IPFS
      const response = await uploadJSONToIPFS(nftJSON);
      if (response.success === true) {
        console.log("Uploaded JSON to Pinata: ", response);
        return response.pinataURL;
      }
    } catch (e) {
      console.log("error uploading JSON metadata:", e);
    }
  }

  async function listNFT(e) {
    e.preventDefault();

    //Upload data to IPFS
    try {
      console.log("before await");
      const metadataURL = await uploadMetadataToIPFS();
      console.log("metadataURL: ", metadataURL);
      //After adding your Hardhat network to your metamask, this code will get providers and signers
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      console.log("before update message");
      updateMessage("Please wait.. uploading (upto 5 mins)");

      //Pull the deployed contract instance
      let contract = new ethers.Contract(
        Marketplace.address,
        Marketplace.abi,
        signer
      );

      //massage the params to be sent to the create NFT request
      console.log("before price");
      const price = ethers.utils.parseUnits(formParams.price, "ether");
      let listingPrice = await contract.getListPrice();
      console.log("after get listing price");
      listingPrice = listingPrice.toString();

      //actually create the NFT
      console.log("before create token method called");
      let transaction = await contract.createToken(
        metadataURL.toString(),
        price,
        {
          value: listingPrice,
        }
      );
      console.log("after create token method called");
      await transaction.wait();
      console.log("await for transaction");

      alert("Successfully listed your NFT!");
      updateMessage("");
      updateFormParams({
        title: "",
        description: "",
        price: "",
        collection: "",
      });
      window.location.replace("/");
    } catch (e) {
      alert("Upload error" + e);
    }
  }

  console.log("Working", process.env);

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
                    ></textarea>
                  </div>

                  <div className="form__input">
                    <label htmlFor="price">Price (in ETH)</label>
                    <input
                      type="number"
                      placeholder="Min 0.01 ETH"
                      step="0.01"
                      value={formParams.price}
                      onChange={(e) =>
                        updateFormParams({
                          ...formParams,
                          price: e.target.value,
                        })
                      }
                    ></input>
                  </div>

                  <div className="form__input">
                    <label htmlFor="collection">Collection</label>
                    <select
                      class="form-select"
                      aria-label="Default select example" onChange={(e) => updateFormParams({...formParams, collection: e.target.value,})}
                    >
                      <option selected>Open this select menu</option>
                      <option value="1">One</option>
                      <option value="2">Two</option>
                      <option value="3">Three</option>
                    </select>
                  </div>

                  <div className="d-flex align-items-center gap-4 mt-5 mb-5">
                    <button
                      onClick={listNFT}
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
