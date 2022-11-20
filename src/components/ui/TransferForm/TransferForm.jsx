import React from "react";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Container } from "reactstrap";
import Marketplace from "../../../Marketplace.json";
import Loader from "../Loader/Loader";
import { toast } from "react-toastify";
import CustomerServices from "../../../services/API/CustomerServices";
import { Formik } from "formik";
import * as Yup from "yup";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import HeightBox from "../../HeightBox/HeightBox";
import Button from "@mui/material/Button";

function TransferForm() {
  const location = useLocation();
  const ethers = require("ethers");
  const [message, updateMessage] = useState("");
  const { NFTData } = location.state;
  const [loader, setLoader] = useState(false);
  const [transactionObj, settransactionObj] = useState({});
  const [tokenid, settokenid] = useState({});
  const initialValues = { receiverWalletAddress: "" };
  const validationSchema = Yup.object().shape({
    receiverWalletAddress: Yup.string()
      .required("Wallet Address is required")
      .min(42, "Wallet Address must be 42 characters")
      .max(42, "Wallet Address must be 42 characters"),
  });

  async function handleSubmit(values) {
    setLoader(true);
    toast.info("Please wait while we transfer your NFT");

    try {
      //get providers and signers
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      updateMessage("Please wait.. uploading (upto 5 mins)");

      //Pull the deployed contract instance
      let contract = new ethers.Contract(
        Marketplace.address,
        Marketplace.abi,
        signer
      );

      contract.on(
        "TokenStatusUpdatedSuccess",
        (tokenId, contractAddress, seller, price, currentlyListed, event) => {
          let info = {
            tokenId: tokenId,
            contractAddress: contractAddress,
            seller: seller,
            price: price,
            currentlyListed: currentlyListed,
            data: event,
          };

          settokenid(info);
        }
      );

      //transfer the NFT
      let transaction = await contract.transferNFT(
        NFTData.tokenId,
        values.receiverWalletAddress
      );

      await transaction.wait();

      settransactionObj(transaction);

      updateMessage("");
    } catch (e) {
      toast.error("Upload error" + e);
      setLoader(false);
    }
  }

  const saveUserActivity = async (
    activityType,
    transaction,
    contractInfo,
    transactionTime
  ) => {
    try {
      const response = await CustomerServices.saveUserActivity(
        activityType,
        transaction,
        contractInfo,
        transactionTime
      );
      if (response.status === 200) {
        toast.success("Successfully minted your NFT!");
        setTimeout(() => {
          window.location.replace("/");
        }, 4000);
      } else {
        toast.error("Error Occured!");
        setLoader(false);
      }
    } catch (error) {
      toast.error("Error Occured!");
      setLoader(false);
    }
  };

  useEffect(() => {
    if (
      Object.keys(tokenid).length !== 0 &&
      Object.keys(transactionObj).length !== 0
    ) {
      saveUserActivity("transferred", transactionObj, tokenid, new Date());

      settokenid({});
      settransactionObj({});
    }
  }, [tokenid, transactionObj]);

  if (loader) {
    return <Loader isLoading={loader} />;
  } else {
    return (
      <Container>
        <HeightBox height="100px" />
        <div className="px-4 text-center">
          <h1 className="mt-5 mb-3">Transfer</h1>
          <HeightBox height="20px" />
          <img
            src={NFTData.image}
            alt=""
            className="rounded-circle rounded border border-5 img-fluid"
            height="200"
            width="200"
          />
        </div>
        <HeightBox height="20px" />
        <div className="px-4 text-center">
          <h5>Transfer Your NFT</h5>
        </div>
        <HeightBox height="20px" />
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
                  <HeightBox height="20px" />
                  <TextField
                    type="text"
                    name="receiverWalletAddress"
                    value={values.receiverWalletAddress}
                    onChange={handleChange("receiverWalletAddress")}
                    helperText={
                      touched.receiverWalletAddress &&
                      errors.receiverWalletAddress
                        ? errors.receiverWalletAddress
                        : ""
                    }
                    error={errors.receiverWalletAddress}
                    fullWidth
                    variant="outlined"
                    label="Receiver's Wallet Address"
                    placeholder="Receiver's Wallet Address"
                  />
                  <HeightBox height="20px" />
                  <Button
                    type="submit"
                    className="btn btn-primary"
                    fullWidth
                    onClick={handleSubmit}
                  >
                    Transfer
                  </Button>
                  <HeightBox height="20px" />
                </form>
              </Box>
            );
          }}
        </Formik>
        <HeightBox height="50px" />
      </Container>
    );
  }
}

export default TransferForm;
