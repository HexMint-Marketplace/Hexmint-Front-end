import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";
import CommonHeader from "../components/ui/CommonHeader/CommonHeader";
import "../styles/editProfile.css"
import FormData from "form-data";
import AdminServices from "../services/API/AdminServices";
import Loader from "../components/ui/Loader/Loader";
import { uploadFileToIPFS } from "../pinata"
import { toast } from "react-toastify";

function EditAdminDetails(props) {
  const { walletaddress, setissubmit } = props;
  console.log("In the admin details edit and wallet address is", walletaddress);
  const [loader, setLoader] = useState(false);

  const [profilePic, setprofilePic] = useState();
  // const [base64_img, setBase64Img] = useState("");
  const [email, setemail] = useState("");
  const [mobilenumber, setmobilenumber] = useState("");
  const navigate = useNavigate();

  // Validate uploaded image file
  // const fileValidation = () => {
  //   var fileInput = document.getElementById("propic");
  //   console.log("In the file validation", fileInput);
  //   console.log("In the file files", fileInput.files);

  //   // Image preview
  //   if (fileInput.files && fileInput.files[0]) {
  //     console.log("In the if");
  //     // var filesSelected = fileInput[0];
  //     var reader = new FileReader();
  //     reader.onload = function (e) {
  //       const a = reader.result.replace("data:", "").replace(/^.+,/, "");
  //       console.log("In the reader", a);
  //       setBase64Img(a);
  //       // console.log("In the BASE 64", base64_img);
  //       console.log("BASE 64 is", base64_img);
  //     };

  //     reader.readAsDataURL(fileInput.files[0]);
  //   }
  // };

  async function OnChangeFile(e) {
    var file = e.target.files[0];
    try {
      //upload the file to IPFS
      const response = await uploadFileToIPFS(file);
      // console.log("response is: ", response);
      if (response.success === true) {
        console.log("Uploaded image to Pinata: ", response.pinataURL);
        setprofilePic(response.pinataURL);
      }
    } catch (e) {
      console.log("Error during file upload", e);
    }
  }

  //Update user details
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setLoader(true);
      const formData = new FormData();
      console.log("In the form data and wallet address is", walletaddress,
        "email is", email, "mobile number is", mobilenumber);
      formData.append("walletaddress", walletaddress);
      formData.append("email", email);
      formData.append("mobilenumber", mobilenumber);
      formData.append("propic", profilePic);
      console.log("In the form data", formData);
      //Update user details API call
      const response = await AdminServices.updateAdminDetails(formData);
      console.log("In the response", response);
      if (response.status === 200) {
  
        setissubmit(true);
        setTimeout(()=>{
          console.log("loader false calling")
          setLoader(false)
        },1500 )
        toast.success("Profile Edit request submitted successfully");
        // setissubmit(true);
        // navigate(`/seller-profile/${walletaddress}`);
        console.log("In the if and updated admin details succesfully");
      }
    } catch (error) {
      console.log("error", error);
    }
  };



  return (
    <div>
      <h2>Edit Profile</h2>
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
                    <label htmlFor="">Email</label>
                    <input
                      type="email"
                      placeholder="Enter Your Email Address"
                      name="email"
                      onChange={(e) => setemail(e.target.value)}
                    />
                  </div>

                  <div className="form-input mt-4">
                    <label htmlFor="">Mobile Number</label>
                    <input
                      type="text"
                      placeholder="Enter Your Mobile Number"
                      name="mobilenumber"
                      onChange={(e) => setmobilenumber(e.target.value)}
                    />
                  </div>

                  <div className="d-flex align-items-center gap-4 mt-5 mb-5">
                    <button
                      className="btn edit-profile-button d-flex align-items-center gap-2"
                      type="submit"
                      onClick={handleSubmit}
                      data-setid = "submit"
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

export default EditAdminDetails;
