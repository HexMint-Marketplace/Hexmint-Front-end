import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";
import CommonHeader from "../components/ui/CommonHeader/CommonHeader";
import "../styles/createCollection.css";
import CustomerServices from "../services/API/CustomerServices";
import FormData from "form-data";
import Loader from "../components/ui/Loader/Loader";
import { uploadFileToIPFS } from "../pinata";

function CreateCollection() {
  const [loader, setLoader] = useState(false);
  const [collectionIcon, setCollectionIcon] = useState(null);
  const [collectionName, setCollectionName] = useState("");
  const [collectionDescription, setCollectionDescription] = useState("");
  // const [NFTcount, setCollectionNFTcount] = useState("");
  const [userWallet, setuserWallet] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const walletAddress = JSON.parse(localStorage.getItem("userAddress"));
    setuserWallet(walletAddress.address);
  }, []);

  async function OnChangeFile(e) {
    var file = e.target.files[0];
    try {
      //upload the file to IPFS
      const response = await uploadFileToIPFS(file);
      // console.log("response is: ", response);
      if (response.success === true) {
        console.log("Uploaded image to Pinata: ", response.pinataURL);
        setCollectionIcon(response.pinataURL);
      }
    } catch (e) {
      console.log("Error during file upload", e);
    }
  }

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      setLoader(true);
      const formData = new FormData();
      // console.log("walletAddress: ", userWallet);
      formData.append("userid", userWallet);
      formData.append("collectionName", collectionName);
      formData.append("collectionDescription", collectionDescription);
      formData.append("logoImg", collectionIcon);
      formData.append("ownersCount", 1);
      // console.log("In the form data", formData);
      const response = await CustomerServices.createCollection(formData);
      console.log("In the response", response);
      if (response.status === 202) {
        setTimeout(() => {
          console.log("loader false calling");
          setLoader(false);
        }, 1500);
        // navigate(`/seller-profile/${walletaddress}`);
        console.log("In the if and updated user details succesfully");
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div>
      <CommonHeader title={"Create New Collection"} />
      <section>
        <Container>
          <Row>
            <Col lg="2"></Col>
            <Col lg="8" md="8" sm="6">
              <div className="create-collection">
                <form>
                  <div className="form-input">
                    <label htmlFor="logoImg">Collection Logo Image*</label>
                    <input
                      name="logoImg"
                      id="logoImg"
                      type="file"
                      className="upload-input"
                      onChange={OnChangeFile}
                    />
                  </div>

                  <div className="form-input mt-4">
                    <label htmlFor="collectionName">Collection Name*</label>
                    <input
                      name="collectionName"
                      type="text"
                      placeholder="Enter the Collection Name"
                      onChange={(e) => setCollectionName(e.target.value)}
                    />
                  </div>

                  <div className="form-input mt-4">
                    <label htmlFor="collectionDescription">Description*</label>
                    <textarea
                      name="collectionDescription"
                      id=""
                      rows="7"
                      placeholder="Enter description"
                      className="w-100"
                      onChange={(e) => setCollectionDescription(e.target.value)}
                    ></textarea>
                  </div>

                  {/* <div className="form-input mt-4">
                    <label htmlFor="NFTcount">Total NFTs*</label>
                    <input
                      name="NFTcount"
                      type="text"
                      placeholder="Enter total NFT count for this collection"
                      onChange={(e) => setCollectionNFTcount(e.target.value)}
                    />
                  </div> */}

                  <div className="d-flex align-items-center gap-4 mt-5 mb-5">
                    <button
                      className="btn create-collection-button d-flex align-items-center gap-2"
                      type="submit"
                      onClick={handleSubmit}
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

export default CreateCollection;
