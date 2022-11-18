import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container } from "reactstrap";
import CommonHeader from "../components/ui/CommonHeader/CommonHeader";
import "../styles/createCollection.css";
import CustomerServices from "../services/API/CustomerServices";
import FormData from "form-data";
import Loader from "../components/ui/Loader/Loader";
import { uploadFileToIPFS } from "../pinata";
import { Formik } from "formik";
import * as Yup from "yup";
import TextField from "@mui/material/TextField";
import HeightBox from "../components/HeightBox/HeightBox";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AuthServices from "../services/AuthServices";
import Token from "../services/Token";

function CreateCollection() {
  const Navigate = useNavigate();
  const initialValues = {
    logo: "",
    collectionName: "",
    collectionDescription: "",
  };

  const validationSchema = Yup.object().shape({
    logo: Yup.string().required("Required"),
    collectionName: Yup.string()
      .required("Collection Name is required")
      .label("Name"),
    collectionDescription: Yup.string()
      .required("Description is required")
      .label("Description"),
  });

  const [loader, setLoader] = useState(false);
  const [collectionIcon, setCollectionIcon] = useState(null);
  const [userWallet, setuserWallet] = useState();

  useEffect(() => {
    // const walletAddress = JSON.parse(localStorage.getItem("userAddress"));
    const walletAddress = Token.JWTDecodeWalletAddress();
    setuserWallet(walletAddress);
  }, []);

  async function OnChangeFile(e) {
    var file = e.target.files[0];
    try {
      //upload the file to IPFS
      const response = await uploadFileToIPFS(file);
      console.log("response is: ", response);
      if (response.success === true) {
        console.log("Uploaded image to Pinata: ", response.pinataURL);
        setCollectionIcon(response.pinataURL);
      }
    } catch (e) {
      console.log("Error during file upload", e);
    }
  }

  const handleSubmit = async (values) => {
    setLoader(true);

    try {
      const formData = values;

      formData["userid"] = userWallet;
      formData["logoImg"] = collectionIcon;
      formData["ownersCount"] = 0;

      const response = await CustomerServices.createCollection(formData);
      console.log("In the response", response);
      if (response.status === 202) {
        console.log("In the if and updated user details succesfully");
        Navigate(`/seller-profile/${userWallet}`);
      }
    } catch (error) {
      console.log("error", error);
    }
    setTimeout(() => {
      console.log("loader false calling");
      setLoader(false);
    }, 1500);
  };

  if (loader) {
    return <Loader isLoading={loader} />;
  } else {
    return (
      <Container>
        <CommonHeader title={"Create New Collection"} />
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
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
                  <HeightBox height={20} />
                  <TextField
                    type="file"
                    name="logo"
                    value={values.logo}
                    onChange={(e) => {
                      OnChangeFile(e);
                      handleChange(e);
                    }}
                    helperText={touched.logo && errors.logo ? errors.logo : ""}
                    error={errors.logo}
                    fullWidth
                    variant="outlined"
                  />
                  <HeightBox height={20} />
                  <TextField
                    type="text"
                    name="collectionName"
                    value={values.collectionName}
                    onChange={handleChange("collectionName")}
                    helperText={
                      touched.collectionName && errors.collectionName
                        ? errors.collectionName
                        : ""
                    }
                    error={errors.collectionName}
                    fullWidth
                    variant="outlined"
                    label="Collection Name"
                    placeholder="Collection Name"
                  />
                  <HeightBox height={20} />
                  <TextField
                    type="text"
                    name="collectionDescription"
                    value={values.collectionDescription}
                    onChange={handleChange("collectionDescription")}
                    helperText={
                      touched.collectionDescription &&
                      errors.collectionDescription
                        ? errors.collectionDescription
                        : ""
                    }
                    error={errors.collectionDescription}
                    fullWidth
                    variant="outlined"
                    label="Description"
                    placeholder="Description"
                  />
                  <HeightBox height={20} />
                  <Button
                    className="btn btn-primary"
                    type="submit"
                    onClick={handleSubmit}
                    fullWidth
                  >
                    Create
                  </Button>
                  <HeightBox height={20} />
                </form>
              </Box>
            );
          }}
        </Formik>
        <HeightBox height={50} />
      </Container>
    );
  }
}

export default CreateCollection;
