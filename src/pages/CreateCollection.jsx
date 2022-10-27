import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";
import CommonHeader from "../components/ui/CommonHeader/CommonHeader";
import "../styles/createCollection.css";
import CustomerServices from "../services/API/CustomerServices";
import FormData from "form-data";
import Loader from "../components/ui/Loader/Loader";

function CreateCollection() {
  const [loader, setLoader] = useState(false);
  const [base64_img, setBase64Img] = useState();
  const [collectionName, setCollectionName] = useState("");
  const [collectionDescription, setCollectionDescription] = useState("");
  const [NFTcount, setCollectionNFTcount] = useState("");
  const navigate = useNavigate();


  // Validate uploaded image file
  const fileValidation = () => {
    var fileInput = document.getElementById("logoImg");
    // console.log("In the file validation", fileInput);
    // console.log("In the file files", fileInput.files);

    // Image preview
    if (fileInput.files && fileInput.files[0]) {
      // console.log("In the if");
      // var filesSelected = fileInput[0];
      var reader = new FileReader();
      reader.onload = function (e) {
        const a = reader.result.replace("data:", "").replace(/^.+,/, "");
        console.log("In the reader", a);
        setBase64Img(a);
        // console.log("In the BASE 64", base64_img);
        // console.log("BASE 64 is", base64_img);
      };

      reader.readAsDataURL(fileInput.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      
      setLoader(true);
      const formData = new FormData();
      formData.append("collectionName", collectionName);
      formData.append("collectionDescription", collectionDescription);
      formData.append("logoImg", base64_img);
      formData.append("NFTcount",NFTcount);
      formData.append("floorprize","0.01");
      formData.append("totalprize","25.0");
      console.log("In the form data", formData);
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
                      onChange={fileValidation}
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

                  <div className="form-input mt-4">
                    <label htmlFor="NFTcount">Total NFTs*</label>
                    <input
                      name="NFTcount"
                      type="text"
                      placeholder="Enter total NFT count for this collection"
                      onChange={(e) => setCollectionNFTcount(e.target.value)}
                    />
                  </div>

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
