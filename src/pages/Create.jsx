import { React, useState, useEffect } from "react";
import { uploadFileToIPFS, uploadJSONToIPFS } from "../pinata";
import Marketplace from "../Marketplace.json";
import { Container } from "reactstrap";
import CommonHeader from "../components/ui/CommonHeader/CommonHeader";
import "../styles/create.css";
import CustomerServices from "../services/API/CustomerServices";
import UserServices from "../services/API/UserServices";
import { toast } from "react-toastify";
import Loader from "../components/ui/Loader/Loader";
import { Formik } from "formik";
import * as Yup from "yup";
import TextField from "@mui/material/TextField";
import HeightBox from "../components/HeightBox/HeightBox";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Token from "../services/Token";

function Create() {
  const [transactionObj, settransactionObj] = useState({});
  const [tokenid, settokenid] = useState({});
  const [fileURL, setFileURL] = useState(null);
  const ethers = require("ethers");
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

  const [allCollections, setAllCollections] = useState([]);
  const [loader, setLoader] = useState(false);

  //This function uploads the NFT image to IPFS
  async function OnChangeFile(e) {
    var file = e.target.files[0];
    //check for file extension
    try {
      //upload the file to IPFS
      const response = await uploadFileToIPFS(file);
      if (response.success === true) {
        setFileURL(response.pinataURL);
      }
    } catch (e) {
      toast.error("Error uploading file to IPFS");
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
        return response.pinataURL;
      }
    } catch (e) {
      toast.error("Error uploading metadata to IPFS");
    }
  }

  async function mintNFT(values) {
    setLoader(true);
    toast.info("Please wait while we mint your NFT");

    //Upload data to IPFS
    try {
      const metadataURL = await uploadMetadataToIPFS(values);
      //After adding Hardhat network to metamask, this code will get providers and signers
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

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

      //actually create the NFT
      const transac = await contract.createToken(metadataURL.toString());
      await transac.wait();
      settransactionObj(transac);
    } catch (e) {
      toast.error("Error while minting NFT");
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
        toast.error(response.data.message);
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
      saveUserActivity("minted", transactionObj, tokenid, new Date());

      settokenid({});
      settransactionObj({});
    }
  }, [tokenid, transactionObj]);

  useEffect(() => {
    getCollections();
  }, []);

  const getuserdetails = async (walletAddress) => {
    //Get user details by passing the user's wallet address

    const details = await UserServices.getUserDetailsFromWalletAddress(
      walletAddress
    );
    return details.data.userid;
  };

  const getCollections = async () => {
    setLoader(true);
    try {
      const response = await CustomerServices.getAllCollections();

      if (response.status === 200) {
        const walletAddress = Token.JWTDecodeWalletAddress();
        const userId = await getuserdetails(walletAddress.toString());
        const ownedCollections = response.data.collections.filter((element) => {
          return element.userid === userId;
        });
        setAllCollections(ownedCollections);
      } else {
        toast.error("Error Occured!");
      }
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
