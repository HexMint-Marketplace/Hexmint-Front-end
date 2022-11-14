import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";
import CommonHeader from "../components/ui/CommonHeader/CommonHeader";
import "../styles/editProfile.css";
import FormData from "form-data";
import CustomerServices from "../services/API/CustomerServices";
import Loader from "../components/ui/Loader/Loader";
import { uploadFileToIPFS } from "../pinata";
import { Formik } from "formik";
import * as Yup from "yup";
import TextField from "@mui/material/TextField";
import HeightBox from "../components/HeightBox/HeightBox";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

function EditProfile(props) {
  const { walletaddress, setissubmit } = props;
  const [loader, setLoader] = useState(false);

  const [profilePic, setprofilePic] = useState();
  const [propic, setPropic] = useState("");
  const [name, setname] = useState("");
  const [username, setusername] = useState("");
  const navigate = useNavigate();

  const initialValues = {
    pro: "",
    name: "",
    username: "",
  };

  const validationSchema = Yup.object().shape({
    pro: Yup.string().required("Required"),
    name: Yup.string().required("Name is required").label("Name"),
    username: Yup.string().required("Username is required").label("Username"),
  });

  async function OnChangeFile(e) {
    var file = e.target.files[0];
    console.log(file);
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

  const Submit = async (values) => {
    console.log("calling submit");

    try {
      setLoader(true);
      const formData = values;
      formData["propic"] = propic;
      formData["walletaddress"] = walletaddress;
      console.log("formdata", formData);
      const response = await CustomerServices.updateUserDetails(formData);
      console.log("In the response", response);
      if (response.status === 200) {
        setissubmit(true);
        setTimeout(() => {
          console.log("loader false calling");
          setLoader(false);
        }, 1500);
        // setissubmit(true);
        // navigate(`/seller-profile/${walletaddress}`);
        console.log("In the if and updated user details succesfully");
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <Container>
      <CommonHeader title={"Edit Profile"} />

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={Submit}
      >
        {(formikProps) => {
          const { values, handleChange, handleSubmit, errors, touched } =
            formikProps;

          return (
            <Box
              sx={{
                boxShadow: 12,
                width: "100%",
                padding: 3,
                borderRadius: 2,
                marginBottom: 5,
              }}
            >
              <form>
                <HeightBox height={30} />
                <TextField
                  type="file"
                  name="pro"
                  value={values.pro}
                  onChange={(e) => {
                    OnChangeFile(e);
                    handleChange(e);
                  }}
                  helperText={touched.pro && errors.pro ? errors.pro : ""}
                  error={errors.pro}
                  fullWidth
                  variant="outlined"
                />
                <HeightBox height={20} />
                <TextField
                  type="text"
                  name="name"
                  value={values.name}
                  onChange={handleChange("name")}
                  helperText={touched.name && errors.name ? errors.name : ""}
                  error={errors.name}
                  fullWidth
                  variant="outlined"
                  label="Name"
                  placeholder="Name"
                />
                <HeightBox height="20px" />
                <TextField
                  type="text"
                  name="username"
                  value={values.username}
                  onChange={handleChange("username")}
                  helperText={
                    touched.username && errors.username ? errors.username : ""
                  }
                  error={errors.username}
                  fullWidth
                  variant="outlined"
                  label="User Name"
                  placeholder="User Name"
                />
                <HeightBox height="20px" />
                <Button
                  className="btn btn-primary"
                  type="submit"
                  onClick={handleSubmit}
                >
                  <Link to="/seller-profile">Save</Link>
                </Button>
              </form>
              <HeightBox height={20} />
            </Box>
          );
        }}
      </Formik>
    </Container>
  );
}

export default EditProfile;
