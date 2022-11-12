import React, { useState } from "react";
import CommonHeader from "../../components/ui/CommonHeader/CommonHeader";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";
import "../../styles/create.css";
import "../../styles/superAdmin.css";
import AdminServices from "../../services/AdminServices";
import { toast } from "react-toastify";
import Loader from "../../components/ui/Loader/Loader";
import { Formik } from "formik";
import * as Yup from "yup";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import HeightBox from "./../../components/HeightBox/HeightBox";
import Button from "@mui/material/Button";

function AddAdmin() {
  const formValues = {
    name: "",
    walletaddress: "",
    email: "",
    mobilenumber: "",
    DOB: "",
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required").label("Name"),
    walletaddress: Yup.string()
      .required("Wallet Address is required")
      .label("Wallet Address"),
    email: Yup.string().email().required("Email is required").label("Email"),
    mobilenumber: Yup.string()
      .required("Mobile Number is required")
      .label("Mobile Number"),
    DOB: Yup.string().required("DOB is required").label("DOB"),
  });

  const navigate = useNavigate();

  // var [state, setState] = useState(formValues);
  const [loader, setLoader] = useState(false);
  // const navigate = useNavigate();

  // const handleChange = (event) => {
  //   console.log("in handle change");
  //   setState({
  //     ...state,
  //     [event.target.name]: event.target.value,
  //   });
  //   console.log(state);
  // };

  const handleSubmit = async (values) => {
    setLoader(true);

    try {
      const response = await AdminServices.addAdmin(values);
      console.log(response);
      if (response.status === 201) {
        toast.success(response.data.message);
      } else if (response.status === 200) {
        toast.info(response.data.message);
      } else {
        toast.error(response.data.message);
      }
      navigate("/sadmin-viewadmins");
    } catch (error) {
      toast.error("Error Occured!");
    }
    setTimeout(() => {
      setLoader(false);
    }, 200);
  };

  if (loader) {
    return <Loader isLoading={loader} />;
  } else {
    return (
      <div>
        <CommonHeader title={"Add an Admin"} />
        <section>
          <Container>
            <Row>
              <Col lg="2" md="2" sm="2"></Col>
              <Col lg="8" md="8" sm="8">
                <Formik
                  initialValues={formValues}
                  validationSchema={validationSchema}
                  onSubmit={handleSubmit}
                >
                  {(formikProps) => {
                    const {
                      values,
                      handleChange,
                      handleSubmit,
                      errors,
                      touched,
                    } = formikProps;

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
                          <HeightBox height="20px" />
                          <TextField
                            type="text"
                            name="name"
                            value={values.name}
                            onChange={handleChange("name")}
                            helperText={
                              touched.name && errors.name ? errors.name : ""
                            }
                            error={errors.name}
                            fullWidth
                            variant="outlined"
                            label="Name"
                            placeholder="Name"
                          />
                          <HeightBox height="20px" />
                          <TextField
                            type="text"
                            name="walletaddress"
                            value={values.walletaddress}
                            onChange={handleChange("walletaddress")}
                            helperText={
                              touched.walletaddress && errors.walletaddress
                                ? errors.walletaddress
                                : ""
                            }
                            error={errors.walletaddress}
                            fullWidth
                            variant="outlined"
                            label="Wallet Address"
                            placeholder="Wallet Address"
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
                          <TextField
                            type="date"
                            name="DOB"
                            value={values.DOB}
                            onChange={handleChange("DOB")}
                            helperText={
                              touched.DOB && errors.DOB ? errors.DOB : ""
                            }
                            error={errors.DOB}
                            fullWidth
                            variant="outlined"
                            label="Date of Birth"
                          />
                          <HeightBox height="20px" />
                          <div className="d-flex align-items-center gap-4 mt-5 mb-5">
                            <Button
                              color="primary"
                              onClick={handleSubmit}
                              fullWidth
                              variant="contained"
                              sx={{ mt: 2, mb: 2 }}
                            >
                              Add
                            </Button>
                          </div>
                        </form>
                      </Box>
                    );
                  }}
                </Formik>
              </Col>
              <Col lg="2" md="2" sm="2"></Col>
            </Row>
          </Container>
        </section>
      </div>
    );
  }
}

export default AddAdmin;

// onClick={() => {connect();}}
