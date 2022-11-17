import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Col, Container, Row } from "reactstrap";
import Loader from "../components/ui/Loader/Loader";
import CustomerServices from "../services/API/CustomerServices";
import HeightBox from "../components/HeightBox/HeightBox";
import defaultProPic from "../asssets/collectionImages/Apes.jpg";
import { useAccount, useConnect, useEnsName } from "wagmi";

//Mui elements for pop up block user form
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Token from "../services/Token";
import { toast } from "react-toastify";

import MarketplaceJSON from "../Marketplace.json";
import axios from "axios";
import SellerNFTCard from "../components/ui/SellerNFTCard/SellerNFTCard";

function ProfileView() {
  const [loader, setLoader] = useState(false);
  const [userName, setUserName] = useState("");
  const [propic, setProPic] = useState("");
  const [name, setName] = useState("");
  const [sellerWalletAddress, setSellerWalletAddress] = useState("");
  const [ViewerAddress, setViewerAddress] = useState("");
  const [SellerNFTDetails, setSellerNFTDetails] = useState([]);
  const [isfetched, setisFetched] = useState(false);
  const walletAddress = useParams();
  const { address, isConnected } = useAccount();

  //mui elements for pop up block user form
  const [open, setOpen] = React.useState(false);
  const [reason, setReason] = React.useState("");

  const handleClickOpen = () => {
    if (isConnected) {
      setOpen(true);
    } else {
      toast.info("Please connect your wallet first");
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleReport = () => {
    setLoader(true);
    setOpen(false);
    console.log("Reason", reason);
    console.log("Seller Wallet Address", sellerWalletAddress);
    reportSeller();
  };
  const handleChange = (event) => {
    setReason(event.target.value);
  };

  //End of mui elements for pop up block user form

  console.log("in profile view walletaddress from params", walletAddress);

  useEffect(() => {
    setLoader(true);
    // const walletAddress = JSON.parse(localStorage.getItem("userAddress"));
    console.log("in profile view");

    setSellerWalletAddress(walletAddress.address);
    setViewerAddress(Token.JWTDecodeWalletAddress());
    console.log("in profile view after set", sellerWalletAddress);

    // setuserWallet(walletaddress);
    getuserdetails(walletAddress.address);
  }, []);

  async function filterSellersNFTs(Waddress) {
    const ethers = require("ethers");
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner(MarketplaceJSON.address);

    //Pull the deployed contract instance
    let contract = new ethers.Contract(
      MarketplaceJSON.address,
      MarketplaceJSON.abi,
      signer
    );

    let transaction = await contract.getAllNFTs();

    const items = await Promise.all(
      transaction.map(async (i) => {
        const tokenURI = await contract.tokenURI(i.tokenId);
        let meta = await axios.get(tokenURI);
        meta = meta.data;
        let price = ethers.utils.formatUnits(i.price.toString(), "ether");
        console.log(
          "seller from contract",
          i.seller,
          "......seller profile address",
          Waddress
        );
        if (i.seller === Waddress) {
          let item = {
            price,
            tokenId: i.tokenId.toNumber(),
            seller: i.seller,
            contractAddress: i._owner,
            image: meta.image,
            NFTname: meta.title,
            description: meta.description,
            collectionId: meta.collectionId,
          };

          return item;
        }
      })
    );
    console.log("items are ", items);
    const filteredItems = items.filter((item) => item !== undefined);
    console.log("filtered items", filteredItems);
    setSellerNFTDetails(filteredItems);
    if (filteredItems.length > 0) {
      console.log("in if fiktered items", filteredItems);
      setisFetched(true);
    }
  }

  const getuserdetails = async (Waddress) => {
    try {
      //Get user details by passing the user's wallet address

      const details =
        await CustomerServices.getCustomerDetailsFromWalletAddress(Waddress);
      console.log("In get user details", details);

      const name = details.data.name;
      setName(name);

      const userName = details.data.username;
      setUserName(userName);

      const propic = details.data.propic;
      setProPic(propic);
    } catch (err) {
      console.log(err);
    }
    await filterSellersNFTs(Waddress);
    setTimeout(() => {
      console.log("loader false calling");
      setLoader(false);
    }, 2000);
  };

  const reportSeller = async () => {
    console.log("in report seller in profile view and viewer", ViewerAddress);
    try {
      console.log("in try.............................");
      const response = await CustomerServices.reportSeller(
        sellerWalletAddress,
        reason,
        ViewerAddress
      );
      console.log("Report Seller Response");

      if (response.data.status === 200) {
        toast.success("Your Report Request Submited Successfully");
      } else if (response.status === 400) {
        toast.error(response.message);
      } else {
        toast.error("Something went wrong");
      }
    } catch (err) {
      toast.error("Something went wrong");
    }
    setTimeout(() => {
      setLoader(false);
    }, 2000);
  };

  const showAddress = sellerWalletAddress
    ? sellerWalletAddress.substring(0, 4) +
      "...." +
      sellerWalletAddress.substring(38, 42)
    : "@";

  return (
    <section>
      <Container>
        <HeightBox height="70px" />
        {loader ? (
          <Loader isLoading={loader} />
        ) : (
          <>
            <div className="px-4 text-center">
              {propic == null ? (
                <img
                  src={defaultProPic}
                  alt=""
                  className="rounded-circle rounded border border-5 img-fluid custom-rounded"
                  height="200"
                  width="200"
                />
              ) : (
                <img
                  src={propic}
                  alt=""
                  className="rounded-circle rounded border border-5 img-fluid custom-rounded"
                  height="200"
                  width="200"
                />
              )}
            </div>
            <div className="">
              <div className="text-center h2 px-4 mt-3 collection-name">
                {name === "Customer" ? showAddress : name}
              </div>
              <div className="text-center px-4 collection-name">
                @{userName}
              </div>
              <HeightBox height="20px" />

              <div className="d-flex justify-content-end">
                <button
                  className="btn gap-2 align-items-center "
                  onClick={handleClickOpen}
                >
                  <b>Report This User</b>
                </button>
                <Dialog open={open} onClose={handleClose} fullWidth>
                  <DialogTitle>Report This Account</DialogTitle>
                  <DialogContent>
                    <DialogContentText>
                      I think this account is......
                    </DialogContentText>
                    {/* <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  label="Email Address"
                  type="email"
                  fullWidth
                  variant="standard"
                /> */}
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      placeholder="Select A Reason"
                      fullWidth
                      //   label="Age"
                      onChange={handleChange}
                    >
                      <MenuItem
                        value={"        Fake collection or possible scam"}
                      >
                        Fake collection or possible scam
                      </MenuItem>
                      <MenuItem value={"Sensitive content"}>
                        Sensitive content
                      </MenuItem>
                      <MenuItem value={"Spam"}>Spam</MenuItem>
                      <MenuItem value={"Other"}>Other</MenuItem>
                    </Select>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleReport}>Report</Button>
                  </DialogActions>
                </Dialog>
              </div>
            </div>

            <hr class="hr-primary mt-3" />

            <Container>
              {isfetched === true && (
                <section>
                  <Container>
                    <Row>
                      {SellerNFTDetails.map((value, index) => (
                        <Col lg="3" md="4" sm="6" className="mb-4">
                          <SellerNFTCard
                            key={index}
                            item={value}
                            isViewUser={true}
                          />
                        </Col>
                      ))}
                    </Row>
                  </Container>
                </section>
              )}
            </Container>
          </>
        )}
      </Container>
    </section>
  );
}

export default ProfileView;
