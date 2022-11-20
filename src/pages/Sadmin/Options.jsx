import React, { useEffect } from "react";
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
import MarketplaceJSON from "../../Marketplace.json";
import { toast } from "react-toastify";

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
  const [amount, setAmount] = React.useState("10");
  const [currentReferralRate, setCurrentReferralRate] = React.useState("0.01");
  const [contract, setContract] = React.useState();
  const ethers = require("ethers");

  const initialValuesOne = {
    withdrawAmount: "",
  };

  const initialValuesTwo = {
    newProfit: "",
  };

  const validationSchemaOne = Yup.object().shape({
    withdrawAmount: Yup.number()
      .required("Field is required")
      .min(0, "Amount must be greater than 0")
      .max(Number(amount), "Amount must be less than or equal to " + amount)
      .label("Withdraw Amount"),
  });

  const validationSchemaTwo = Yup.object().shape({
    newProfit: Yup.number()
      .required("Field is required")
      .label("New Commision Rate"),
  });

  useEffect(() => {
    try {
      //After adding your Hardhat network to your metamask, this code will get providers and signers
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      //Pull the deployed contract instance
      const contract_ = new ethers.Contract(
        MarketplaceJSON.address,
        MarketplaceJSON.abi,
        signer
      );
      setContract(contract_);
      updateCurrentBalance(provider, contract_);
      updateCurrentReferralRate(contract_);
    } catch (e) {
      toast.error("Error Occured !");
    }
  }, []);

  const updateCurrentBalance = async (provider, contract) => {
    const balance = await provider.getBalance(contract.address);
    setAmount(balance.toString() / 10 ** 18);
  };

  const updateCurrentReferralRate = async (contract) => {
    const referralRate = await contract.getReferralRate();
    setCurrentReferralRate(referralRate.toString());
  };

  const handleWithdraw = async (values) => {
    const withdrawAmount = ethers.utils.parseEther(
      values.withdrawAmount.toString()
    );
    try {
      const transaction = await contract.withdraw(withdrawAmount);
      await transaction.wait();
      alert("withdraw = " + withdrawAmount / 10 ** 18 + " ETH successfully");
    } catch (e) {
      alert("upload error: " + e);
    }
  };

  const handleProfitChange = async (values) => {
    const newReferralRate = values.newProfit;
    try {
      const transaction = await contract.updateReferralRate(newReferralRate);
      await transaction.wait();
      alert("update referral rate = " + newReferralRate + "% successfully");
    } catch (e) {
      alert("upload error: " + e);
    }
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
          <h3>
            Your Balance : {amount}
            <span> ETH</span>
          </h3>
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
          <h3>Your Current Commision Rate : {currentReferralRate}%</h3>
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
                      Update
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
