import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";
import img01 from "../../../asssets/collectionImages/Apes.jpg";
import { Link } from "react-router-dom";
import Marketplace from "../../../Marketplace.json";
import Loader from "../Loader/Loader";
import CustomerServices from "../../../services/API/CustomerServices";
import { toast } from "react-toastify";
import { Formik } from "formik";
import * as Yup from "yup";
import TextField from "@mui/material/TextField";
import HeightBox from "../../HeightBox/HeightBox";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";

// console.log(img01);
const ListingForm = () => {
  const location = useLocation();
  // const [ListingType, setListingType] = useState("");
  // const [listingPrize, setListingPrize] = useState();
  const [message, updateMessage] = useState("");
  // const [Duration, setDuration] = useState();
  const ethers = require("ethers");
  const { NFTData } = location.state;

  const [transactionObj, settransactionObj] = useState({});
  // const [tokenid, settokenid] = useState("");
  const [tokenid, settokenid] = useState({});
  const [loader, setLoader] = useState(false);

  const initialValues = {
    ListingType: "",
    listingPrize: "",
    Duration: "",
  };

  const validationSchema = Yup.object().shape({
    ListingType: Yup.string().required("Listing Type is required"),
    listingPrize: Yup.string().required("Listing Prize is required"),
    Duration: Yup.string().when("ListingType", {
      is: "2",
      then: Yup.string().required("Duration is required"),
    }),
  });

  console.log("NFTData: ", NFTData);

  async function listNFT(values) {
    // setListingType(values.ListingType);
    // setListingPrize(values.listingPrize);
    // setDuration(values.Duration);
    console.log("values: ", values);
    setLoader(true);
    toast.info("Please wait while we list your NFT");

    try {
      //get providers and signers
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      // console.log("before update message");
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
          console.log("info: ", info);
          console.log("tokenId: ", tokenId);
          settokenid(info);
          // settokenIDValue(tokenId.toString());
          console.log("tokenID: in use state ", tokenid);
        }
      );
      //transfer the NFT'

      console.log("listing prize: ", values.listingPrize);
      const price = ethers.utils.parseEther(values.listingPrize);

      // let listingPrice = await contract.getListPrice();
      // listingPrice = listingPrice.toString();

      let transaction = await contract.ListToken(NFTData.tokenId, price);
      console.log("after create token method called");
      await transaction.wait();
      // console.log("await for transaction");
      console.log("await for transaction", transaction);
      transaction.listingType = values.ListingType;
      if (values.ListingType == 2) {
        transaction.currentbid = values.listingPrize;
        //duration has to be calculated in frontend/backend
        let endDate = new Date();
        if (values.Duration === "5d") {
          endDate.setTime(endDate.getTime() + 5 * 24 * 3600 * 1000);
        } else if (values.Duration === "1w") {
          endDate.setTime(endDate.getTime() + 7 * 24 * 3600 * 1000);
        } else if (values.Duration === "2w") {
          endDate.setTime(endDate.getTime() + 2 * 7 * 24 * 3600 * 1000);
        } else if (values.Duration === "3w") {
          endDate.setTime(endDate.getTime() + 3 * 7 * 24 * 3600 * 1000);
        } else if (values.Duration === "1m") {
          endDate.setTime(endDate.getTime() + 1 * 4 * 7 * 24 * 3600 * 1000);
        } else if (values.Duration === "2m") {
          endDate.setTime(endDate.getTime() + 2 * 4 * 7 * 24 * 3600 * 1000);
        } else if (values.Duration === "2min") {
          endDate.setTime(endDate.getTime() + 2 * 60 * 1000);
        } else if (values.Duration === "5min") {
          endDate.setTime(endDate.getTime() + 5 * 60 * 1000);
        }

        transaction.endDate = endDate.toISOString();
      }

      settransactionObj(transaction);
      console.log("transactionObj: in use state ", transactionObj);

      updateMessage("");
    } catch (e) {
      alert("Upload error" + e);
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
        console.log("User activity saved successfully");
        toast.success("Successfully listed your NFT!");
        setTimeout(() => {
          window.location.replace("/");
        }, 4000);
      } else {
        toast.error("Error Occured!");
        setLoader(false);
      }
    } catch (error) {
      console.log("Error occur", error);
      toast.error("Error Occured!");
      setLoader(false);
    }
  };

  useEffect(() => {
    console.log("use effect called -------------------------------");
    // if (tokenid && transactionObj) {
    if (
      Object.keys(tokenid).length !== 0 &&
      Object.keys(transactionObj).length !== 0
    ) {
      console.log("In the saveuseractivity use effect function");
      saveUserActivity("listed", transactionObj, tokenid, new Date());

      settokenid({});
      settransactionObj({});
      // settokenIDValue("");
    }
  }, [tokenid, transactionObj]);

  if (loader) {
    return <Loader isLoading={loader} />;
  } else {
    return (
      <Container>
        <HeightBox height="100px" />
        <div className="px-4 text-center">
          <h1 className="mt-5 mb-3">List Item For Sale</h1>
          <HeightBox height="20px" />
          <img
            src={NFTData.image}
            alt=""
            className="rounded-circle rounded border border-5 img-fluid"
            height="200"
            width="200"
          />
          <HeightBox height="20px" />
        </div>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={listNFT}
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
                    id="outlined-select-currency"
                    select
                    fullWidth
                    label="Select"
                    value={values.ListingType}
                    onChange={handleChange("ListingType")}
                    helperText={
                      touched.ListingType && errors.ListingType
                        ? errors.ListingType
                        : ""
                    }
                    error={errors.ListingType}
                  >
                    <MenuItem key="1" value="1">
                      Fixed Price
                    </MenuItem>
                    <MenuItem key="2" value="2">
                      Timed Auction
                    </MenuItem>
                  </TextField>
                  <HeightBox height="20px" />

                  {values.ListingType === "1" && (
                    <TextField
                      type="text"
                      name="listingPrize"
                      value={values.listingPrize}
                      onChange={handleChange("listingPrize")}
                      helperText={
                        touched.listingPrize && errors.listingPrize
                          ? errors.listingPrize
                          : ""
                      }
                      error={errors.listingPrize}
                      fullWidth
                      variant="outlined"
                      label="Listing Price"
                      placeholder="Listing Price"
                    />
                  )}
                  <HeightBox height="20px" />
                  {values.ListingType === "2" && (
                    <div>
                      <TextField
                        type="text"
                        name="listingPrize"
                        value={values.listingPrize}
                        onChange={handleChange("listingPrize")}
                        helperText={
                          touched.listingPrize && errors.listingPrize
                            ? errors.listingPrize
                            : ""
                        }
                        error={errors.listingPrize}
                        fullWidth
                        variant="outlined"
                        label="Start Price"
                        placeholder="Start Price"
                      />
                      <HeightBox height="20px" />
                      <TextField
                        id="outlined-select-currency"
                        select
                        fullWidth
                        label="Select"
                        value={values.Duration}
                        onChange={handleChange("Duration")}
                        helperText={
                          touched.Duration && errors.Duration
                            ? errors.Duration
                            : ""
                        }
                        error={errors.Duration}
                      >
                        <MenuItem key="1" value="5d">
                          5 days
                        </MenuItem>
                        <MenuItem key="2" value="1w">
                          1 week
                        </MenuItem>
                        <MenuItem key="3" value="2w">
                          2 week
                        </MenuItem>
                        <MenuItem key="4" value="3w">
                          3 week
                        </MenuItem>
                        <MenuItem key="5" value="1m">
                          1 month
                        </MenuItem>
                        <MenuItem key="6" value="2m">
                          2 month
                        </MenuItem>
                        {/* should be removed below menu items */}
                        <MenuItem key="7" value="2min">
                          2 minutes
                        </MenuItem>
                        <MenuItem key="8" value="5min">
                          5 minutes
                        </MenuItem>
                      </TextField>
                      <HeightBox height="20px" />
                    </div>
                  )}

                  <Button
                    type="submit"
                    className="btn btn-primary"
                    fullWidth
                    onClick={handleSubmit}
                  >
                    Complete Listing
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
};

export default ListingForm;
