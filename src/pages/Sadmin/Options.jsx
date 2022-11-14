import React from "react";
import HeightBox from "./../../components/HeightBox/HeightBox";
import { Container } from "reactstrap";
import CommonHeader from "../../components/ui/CommonHeader/CommonHeader";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { Formik } from "formik";
import * as Yup from "yup";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

function Options() {
  const [expandedOne, setExpandedOne] = React.useState(false);
  const [expandedTwo, setExpandedTwo] = React.useState(false);
  const [amount, setAmount] = React.useState("10 ETH");
  const [currentProfit, setCurrentProfit] = React.useState("0.01");

  const initialValuesOne = {
    withdrawAmount: "",
  };

  const initialValuesTwo = {
    newProfit: "",
  };

  const validationSchemaOne = Yup.object().shape({
    withdrawAmount: Yup.string()
      .required("Field is required")
      .label("Withdraw Amount"),
  });

  const validationSchemaTwo = Yup.object().shape({
    newProfit: Yup.string()
      .required("Field is required")
      .label("New Commision Rate"),
  });

  const handleWithdraw = async (values) => {
    console.log(values.withdrawAmount);
  };

  const handleProfitChange = async (values) => {
    console.log(values.newProfit);
  };

  const handleExpandClickOne = () => {
    setExpandedOne(!expandedOne);
  };

  const handleExpandClickTwo = () => {
    setExpandedTwo(!expandedTwo);
  };

  return (
    <Container>
      <CommonHeader title="Marketplace Options" />
      <HeightBox height="20px" />
      {/* -------------------------------------------withdraw card--------------------------------------------------- */}
      <Card>
        <CardHeader />
        <Paper elevation={24} sx={{ p: 3 }}>
          <h3>Your Balance : {amount}</h3>
        </Paper>
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            This is the maximum amount that you can withdraw from the system.
            You can withdraw any amount less than or equal to this.
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <ExpandMore
            expand={expandedOne}
            onClick={handleExpandClickOne}
            aria-expanded={expandedOne}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
        <Collapse in={expandedOne} timeout="auto" unmountOnExit>
          <CardContent>
            <Formik
              initialValues={initialValuesOne}
              validationSchema={validationSchemaOne}
              onSubmit={handleWithdraw}
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
                    <HeightBox height="20px" />
                    <TextField
                      type="text"
                      name="withdrawAmount"
                      value={values.withdrawAmount}
                      onChange={handleChange("withdrawAmount")}
                      helperText={
                        touched.withdrawAmount && errors.withdrawAmount
                          ? errors.withdrawAmount
                          : ""
                      }
                      error={errors.withdrawAmount}
                      fullWidth
                      variant="outlined"
                      label="Withdraw Amount"
                      placeholder="Enter the amount to withdraw"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">ETH</InputAdornment>
                        ),
                      }}
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
                      Withdraw
                    </Button>
                    <HeightBox height="20px" />
                  </Box>
                );
              }}
            </Formik>
          </CardContent>
        </Collapse>
      </Card>
      {/* -------------------------------------------profit change card--------------------------------------------------- */}
      <HeightBox height="50px" />
      <Card>
        <CardHeader />
        <Paper elevation={24} sx={{ p: 3 }}>
          <h3>Your Current Commision Rate : {currentProfit}%</h3>
        </Paper>
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            This is the current commision rate of marketplace. You can change
            this anytime you want.
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <ExpandMore
            expand={expandedTwo}
            onClick={handleExpandClickTwo}
            aria-expanded={expandedTwo}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
        <Collapse in={expandedTwo} timeout="auto" unmountOnExit>
          <CardContent>
            <Formik
              initialValues={initialValuesTwo}
              validationSchema={validationSchemaTwo}
              onSubmit={handleProfitChange}
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
                    <HeightBox height="20px" />
                    <TextField
                      type="text"
                      name="newProfit"
                      value={values.newProfit}
                      onChange={handleChange("newProfit")}
                      helperText={
                        touched.newProfit && errors.newProfit
                          ? errors.newProfit
                          : ""
                      }
                      error={errors.newProfit}
                      fullWidth
                      variant="outlined"
                      label="New Commision Rate"
                      placeholder="Enter the new commision rate"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">%</InputAdornment>
                        ),
                      }}
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
                      Withdraw
                    </Button>
                    <HeightBox height="20px" />
                  </Box>
                );
              }}
            </Formik>
          </CardContent>
        </Collapse>
      </Card>
      <HeightBox height="50px" />
    </Container>
  );
}

export default Options;