import React, { useState } from "react";
import { Container } from "reactstrap";
import CommonHeader from "../components/ui/CommonHeader/CommonHeader";
import "../styles/editProfile.css";
import AdminServices from "../services/API/AdminServices";
import Loader from "../components/ui/Loader/Loader";
import { uploadFileToIPFS } from "../pinata_2";
import { toast } from "react-toastify";
import { Formik } from "formik";
import * as Yup from "yup";
import TextField from "@mui/material/TextField";
import HeightBox from "../components/HeightBox/HeightBox";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

function EditAdminDetails(props) {
  const { walletaddress, setissubmit } = props;
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
    mobilenumber: Yup.number()
      .required("Mobile Number is required")
      .label("Mobile Number"),
  });

  async function OnChangeFile(e) {
    var file = e.target.files[0];
    try {
      //upload the file to IPFS
      const response = await uploadFileToIPFS(file);
      if (response.success === true) {
        setprofilePic(response.pinataURL);
      }
    } catch (e) {
      toast.error("Error uploading file to IPFS");
    }
  }

  //Update user details
  const handleSubmit = async (values) => {
    setLoader(true);
    try {
      const formData = values;
      formData["walletaddress"] = walletaddress;
      formData["propic"] = profilePic;
      const response = await AdminServices.updateAdminDetails(formData);
      if (response.status === 200) {
        setissubmit(true);
        toast.success("Profile Edit request submitted successfully");
      } else {
        toast.error(response.data.message);
        setLoader(false);
      }
    } catch (error) {
      toast.error("Something went wrong");
      setLoader(false);
    }
    setTimeout(() => {
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
