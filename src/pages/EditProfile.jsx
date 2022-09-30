import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";
import CommonHeader from "../components/ui/CommonHeader/CommonHeader";
import "../styles/editProfile.css";
import FormData from "form-data";
import CustomerServices from "../services/API/CustomerServices";

function EditProfile(props) {
  const { walletaddress } = props;

  const [profilePic, setprofilePic] = useState();
  const [base64_img, setBase64Img] = useState("");
  const [name, setname] = useState("");
  const [username, setusername] = useState("");
  const navigate = useNavigate();

  // Validate uploaded image file
  const fileValidation = () => {
    var fileInput = document.getElementById("propic");
    console.log("In the file validation", fileInput);
    console.log("In the file files", fileInput.files);

    // Image preview
    if (fileInput.files && fileInput.files[0]) {
      console.log("In the if");
      // var filesSelected = fileInput[0];
      var reader = new FileReader();
      reader.onload = function (e) {
        const a = reader.result.replace("data:", "").replace(/^.+,/, "");
        console.log("In the reader", a);
        setBase64Img(a);
        // console.log("In the BASE 64", base64_img);
        console.log("BASE 64 is", base64_img);
      };

      reader.readAsDataURL(fileInput.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      console.log(
        "In the handle submit and wallet address : ",
        walletaddress,
        "Username: ",
        username,
        "Name : ",
        name,
        "propic : ",
        base64_img
      );
      const formData = new FormData();
      formData.append("walletaddress", walletaddress);
      formData.append("username", username);
      formData.append("name", name);
      formData.append("proiic", base64_img);
      console.log("In the form data", formData);
      const response = await CustomerServices.updateUserDetails(formData);
      if (response.status === 200) {
        // navigate("/seller-profile");
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
                      onChange={fileValidation}
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
