import { React, useState, useEffect, useRef } from "react";
import { uploadFileToIPFS, uploadJSONToIPFS } from "../pinata";
import { Link } from "react-router-dom";
import Marketplace from "../Marketplace.json";
import { useLocation } from "react-router";
import { Container, Row, Col } from "reactstrap";
import CommonHeader from "../components/ui/CommonHeader/CommonHeader";
import "../styles/create.css";
import CustomerServices from "../services/API/CustomerServices";
import { toast } from "react-toastify";
import Loader from "../components/ui/Loader/Loader";
import { Formik } from "formik";
import * as Yup from "yup";
import TextField from "@mui/material/TextField";
import HeightBox from "../components/HeightBox/HeightBox";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";

function Create() {
  // const [tokenIDValue, settokenIDValue] = useState("");
  // const [transaction, setTransaction] = useState(0);
  const initialValues = {
    logo: "",
    title: "",
    description: "",
    collectionId: "",
  };

  const validationSchema = Yup.object().shape({
    logo: Yup.string().required("Required"),
    title: Yup.string().required("Collection Name is required").label("Name"),
    description: Yup.string()
      .required("Description is required")
      .label("Description"),
    collectionId: Yup.string().required("Collection ID is required"),
  });
  // let transactionObj;
  // let tokenid = "";

  const [transactionObj, settransactionObj] = useState({});
  const [tokenid, settokenid] = useState({});

  const [fileURL, setFileURL] = useState(null);
  const ethers = require("ethers");
  const [message, updateMessage] = useState("");
  // let tokenID = "";

  //getting user wallet address
  // const location = useLocation();
  // // const walletAddress = location.userAddress;

  const [allCollections, setAllCollections] = useState([]);
  const [loader, setLoader] = useState(false);

  const [contractAddress, setContractAddress] = useState();
  const [price, setPrice] = useState();
  const [currentlyListed, serCurrentlyListed] = useState();
  // const stateRef = useRef(tokenid);

  const { PINATA_API_KEY } = process.env;

  //This function uploads the NFT image to IPFS
  async function OnChangeFile(e) {
    var file = e.target.files[0];
    // console.log("e from onchange function: ", e);
    // console.log("file: ", file);
    console.log("process: ", PINATA_API_KEY);
    //check for file extension
    try {
      console.log("In the try block on changeFile");
      //upload the file to IPFS
      const response = await uploadFileToIPFS(file);
      // console.log("response is: ", response);
      if (response.success === true) {
        // console.log("Uploaded image to Pinata: ", response.pinataURL);
        setFileURL(response.pinataURL);
      }
    } catch (e) {
      console.log("Error during file upload", e);
    }
  }

  //This function uploads the metadata to IPFS
  async function uploadMetadataToIPFS(values) {
    const { title, description, collectionId } = values;
    //Make sure that none of the fields are empty
    if (!title || !description || !collectionId || !fileURL) return;

    const nftJSON = {
      title,
      description,
      collectionId,
      image: fileURL,
    };

    try {
      //upload the metadata JSON to IPFS
      const response = await uploadJSONToIPFS(nftJSON);
      if (response.success === true) {
        // console.log("Uploaded JSON to Pinata: ", response);
        return response.pinataURL;
      }
    } catch (e) {
      console.log("error uploading JSON metadata:", e);
    }
  }

  async function mintNFT(values) {
    setLoader(true);
    toast.info("Please wait while we mint your NFT");

    // console.log("e from mintNFT function: ",e.target.files[0]);
    //Upload data to IPFS
    try {
      // console.log("before await");
      const metadataURL = await uploadMetadataToIPFS(values);
      // console.log("metadataURL: ", metadataURL);
      //After adding your Hardhat network to your metamask, this code will get providers and signers
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

      //massage the params to be sent to the create NFT request
      // console.log("before price");
      // const price = ethers.utils.parseUnits(formParams.price, "ether");
      // let listingPrice = await contract.getListPrice();
      // console.log("after get listing price");
      // listingPrice = listingPrice.toString();

      //actually create the NFT
      // console.log("before create token method called");
      let transac = await contract.createToken(metadataURL.toString());
      // console.log("after create token method called");

      await transac.wait();

      // setLoader(true);
      console.log("await for transaction", transac);
      settransactionObj(transac);
      console.log("transactionObj: in use state ", transactionObj);
      // setTransaction(transac);

      // setTimeout(() => {
      //   console.log("lader is calling");
      //   setLoader(false);
      // }, 5000);

      const transactionTime = new Date();
      // // update the user activity(mint) in the database for the user
      // //Activity type, from wallet address, prize, transaction hash,

      // alert("Successfully minted your NFT!");

      console.log("Successfully minted your NFT!");

      // saveUserActivity("minted", transaction, tokenID, transactionTime);
      console.log("after save user activity");

      // const transactionTime = new Date();
      // // update the user activity(mint) in the database for the user
      // //Activity type, from wallet address, prize, transaction hash,
      // saveUserActivity("minted", transaction, transactionTime);

      updateMessage("");

      console.log("after update form params");
      // window.location.replace("/");
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
        toast.success("Successfully minted your NFT!");
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
    if (
      Object.keys(tokenid).length !== 0 &&
      Object.keys(transactionObj).length !== 0
    ) {
      console.log("In the saveuseractivity use effect function");
      saveUserActivity("minted", transactionObj, tokenid, new Date());

      settokenid({});
      settransactionObj({});

      // settokenIDValue("");
    }
  }, [tokenid, transactionObj]);

  // console.log("Working", process.env);

  useEffect(() => {
    getCollections();
  }, []);

  const getCollections = async () => {
    setLoader(true);
    try {
      const response = await CustomerServices.getAllCollections();

      if (response.status === 200) {
        // console.log("hi new data........", response.data.collections);
        setAllCollections(response.data.collections);
      } else {
        toast.error("Error Occured!");
      }
    } catch (error) {
      console.log("Error occur", error);
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
      <Container>
        <CommonHeader title={"Create New Item"} />
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={mintNFT}
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
                    name="title"
                    value={values.title}
                    onChange={handleChange("title")}
                    helperText={
                      touched.title && errors.title ? errors.title : ""
                    }
                    error={errors.title}
                    fullWidth
                    variant="outlined"
                    label="Title"
                    placeholder="Title"
                  />
                  <HeightBox height={20} />
                  <TextField
                    type="text"
                    name="description"
                    value={values.description}
                    onChange={handleChange("description")}
                    helperText={
                      touched.description && errors.description
                        ? errors.description
                        : ""
                    }
                    error={errors.description}
                    fullWidth
                    variant="outlined"
                    label="Description"
                    placeholder="Description"
                  />
                  <HeightBox height={20} />
                  <TextField
                    id="outlined-select-currency"
                    select
                    fullWidth
                    label="Select"
                    value={values.collectionId}
                    onChange={handleChange("collectionId")}
                    helperText={
                      touched.collectionId && errors.collectionId
                        ? errors.collectionId
                        : ""
                    }
                    error={errors.collectionId}
                  >
                    {allCollections.map((row) => (
                      <MenuItem key={row._id} value={row._id}>
                        {row.collectionName}
                      </MenuItem>
                    ))}
                  </TextField>
                  <HeightBox height={20} />
                  <Button
                    onClick={handleSubmit}
                    className="btn btn-primary"
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

export default Create;
