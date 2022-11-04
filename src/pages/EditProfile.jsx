import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";
import CommonHeader from "../components/ui/CommonHeader/CommonHeader";
import "../styles/editProfile.css";
import FormData from "form-data";
import CustomerServices from "../services/API/CustomerServices";
import Loader from "../components/ui/Loader/Loader";
import { uploadFileToIPFS } from "../pinata";

function EditProfile(props) {
  const { walletaddress, setissubmit } = props;
  const [loader, setLoader] = useState(false);

  const [profilePic, setprofilePic] = useState();
  const [propic, setPropic] = useState("");
  const [name, setname] = useState("");
  const [username, setusername] = useState("");
  const navigate = useNavigate();

  async function OnChangeFile(e) {
    var file = e.target.files[0];
    try {
      //upload the file to IPFS
      const response = await uploadFileToIPFS(file);
      // console.log("response is: ", response);
      if (response.success === true) {
        console.log("Uploaded image to Pinata: ", response.pinataURL);
        setPropic(response.pinataURL);
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
      formData.append("walletaddress", walletaddress);
      formData.append("username", username);
      formData.append("name", name);
      formData.append("propic", propic);
      console.log("In the form data", formData);
      const response = await CustomerServices.updateUserDetails(formData);
      console.log("In the response", response);
      if (response.status === 200) {
  
        setissubmit(true);
        setTimeout(()=>{
          console.log("loader false calling")
          setLoader(false)
        },1500 )
        // setissubmit(true);
        // navigate(`/seller-profile/${walletaddress}`);
        console.log("In the if and updated user details succesfully");
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div>
      <CommonHeader title={"Edit Profile"} />
      <section>
        <Container>
          <Row>
            <Col lg="2"></Col>
            <Col lg="8" md="8" sm="6">
              <div className="edit-profile">
                <form>
                  <div className="form-input">
                    <label htmlFor="">Profile Picture</label>
                    <input
                      type="file"
                      className="upload-input"
                      id="propic"
                      name="propic"
                      onChange={OnChangeFile}
                    />
                  </div>

                  <div className="form-input mt-4">
                    <label htmlFor="">Name</label>
                    <input
                      type="text"
                      placeholder="Enter Your Name"
                      name="name"
                      onChange={(e) => setname(e.target.value)}
                    />
                  </div>

                  <div className="form-input mt-4">
                    <label htmlFor="">Username</label>
                    <input
                      type="text"
                      placeholder="Enter Your Name"
                      name="username"
                      onChange={(e) => setusername(e.target.value)}
                    />
                  </div>

                  <div className="d-flex align-items-center gap-4 mt-5 mb-5">
                    <button
                      className="btn edit-profile-button d-flex align-items-center gap-2"
                      type="submit"
                      onClick={handleSubmit}
                    >
                      <Link to="/seller-profile">Save</Link>
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

export default EditProfile;
