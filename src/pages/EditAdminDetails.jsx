import React, { useState } from "react";
import { Container } from "reactstrap";
import CommonHeader from "../components/ui/CommonHeader/CommonHeader";
import "../styles/editProfile.css";
import AdminServices from "../services/API/AdminServices";
import Loader from "../components/ui/Loader/Loader";
import { uploadFileToIPFS } from "../pinata";
import { toast } from "react-toastify";
import { Formik } from "formik";
import * as Yup from "yup";
import TextField from "@mui/material/TextField";
import HeightBox from "../components/HeightBox/HeightBox";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

function EditAdminDetails(props) {
  const { walletaddress, setissubmit } = props;
  console.log("In the admin details edit and wallet address is", walletaddress);
  const [loader, setLoader] = useState(false);

  const [profilePic, setprofilePic] = useState();

  const initialValues = {
    pro: "",
    email: "",
    mobilenumber: "",
  };

  const validationSchema = Yup.object().shape({
    pro: Yup.string().required("Required"),
    email: Yup.string().email().required("Email is required").label("Email"),
    mobilenumber: Yup.string()
      .required("Mobile Number is required")
      .label("Mobile Number"),
  });

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
  const handleSubmit = async (values) => {
    setLoader(true);
    try {
      const formData = values;
      formData["walletaddress"] = walletaddress;
      formData["propic"] = profilePic;
      console.log(formData);
      const response = await AdminServices.updateAdminDetails(formData);
      console.log("In the response", response);
      if (response.status === 200) {
        setissubmit(true);

        toast.success("Profile Edit request submitted successfully");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
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
        <CommonHeader title={"Edit Profile"} />
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

                  <HeightBox height="20px" />
                  <TextField
                    type="emailS"
                    name="email"
                    value={values.email}
                    onChange={handleChange("email")}
                    helperText={
                      touched.email && errors.email ? errors.email : ""
                    }
                    error={errors.email}
                    fullWidth
                    variant="outlined"
                    label="Email"
                    placeholder="Email"
                  />
                  <HeightBox height="20px" />

                  <TextField
                    type="text"
                    name="mobilenumber"
                    value={values.mobilenumber}
                    onChange={handleChange("mobilenumber")}
                    helperText={
                      touched.mobilenumber && errors.mobilenumber
                        ? errors.mobilenumber
                        : ""
                    }
                    error={errors.mobilenumber}
                    fullWidth
                    variant="outlined"
                    label="Mobile Number"
                    placeholder="Mobile Number"
                  />
                  <HeightBox height="20px" />

                  <Button
                    color="primary"
                    onClick={handleSubmit}
                    className="btn btn-primary"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 2, mb: 2 }}
                  >
                    Save
                  </Button>
                </form>
              </Box>
            );
          }}
        </Formik>
      </Container>
    );
  }
}

export default EditAdminDetails;
