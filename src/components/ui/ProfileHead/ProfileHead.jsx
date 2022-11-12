import React, { useState } from "react";
import { Container, Row, Col } from "reactstrap";
import "../../ui/SingleCollectionHead/singleCollectionHead.css";
import "../ProfileHead/profileHead.css";
import { Link } from "react-router-dom";
import Loader from "../Loader/Loader";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import EditProfile from "../../../pages/EditProfile";
import EditAdminDetails from "../../../pages/EditAdminDetails";
import UserNFTList from "../../ui/UserNFTList/UserNFTList";
import UserActivity from "../../ui/UserActivity/UserActivity";
import HeightBox from "../../HeightBox/HeightBox";
import Card from "@mui/material/Card";

const NAV_LINKS = [
  {
    display: "COLLECTIONS",
    url: "/home",
  },
  {
    display: "ACTIVITY",
    url: "/explore",
  },
  {
    display: "EDIT PROFILE",
    url: "/edit-profile",
  },
];
const ProfileHead = (props) => {
  const [isShown, setisShown] = useState(false);

  const { collectionIcon } = props.collectionData[0];
  const { userWallet, userType, name, userName, propic, data } = props;

  const { email, DOB, mobile } = props;

  console.log("Pro pic is", propic);

  const { walletaddress } = props;
  const userActivityDetails = props.userActivityDetails;

  // console.log("In profile head to find user type", userType);
  // console.log(props.collectionData);
  // console.log("props: ",props);

  const showAddress = userWallet?.address
    ? userWallet.address.substring(0, 4) +
      "...." +
      userWallet.address.substring(38, 42)
    : "@";
  console.log(typeof showAddress);

  const handleClick = (e) => {
    setisShown(!isShown);
  };

  return (
    <Container>
      <HeightBox height="70px" />
      <div className="px-4 text-center">
        {propic == null ? (
          <img
            src={collectionIcon}
            alt=""
            className="rounded-circle rounded border border-5 img-fluid"
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
          {/* {showAddress} */}
          {userType === "Customer"
            ? name === "Customer"
              ? showAddress
              : name
            : name === "Admin"
            ? showAddress + "(Admin)"
            : name}
        </div>

        <div className="text-center px-4 collection-name">@{userName}</div>

        {userType === "Customer" ? (
          <div className="d-flex justify-content-end">
            <Link to={"/create-collection"}>
              <button className="btn gap-2 align-items-center ">
                <b>Create a Collection</b>
              </button>
            </Link>
          </div>
        ) : (
          (userType === "Admin" || userType === "Super Admin") && (
            <>
              <hr class="hr-primary mt-3" />
              <Row>
                <Col lg="3" md="3" sm="0"></Col>
                <Col lg="6" md="6" sm="12">
                  <Card variant="outlined" sx={{ p: 5, textAlign: "center" }}>
                    <h5>Name : {name}</h5>
                    <h5>Email : {email}</h5>
                    <h5>DOB : {DOB.substring(0, 10)}</h5>
                    <h5>Mobie : {mobile}</h5>
                  </Card>
                </Col>
                <Col lg="3" md="3" sm="0"></Col>
              </Row>
              <div className="d-flex justify-content-center py-4">
                <button
                  onClick={handleClick}
                  className="btn gap-2 align-items-center "
                >
                  <b>Edit Profile</b>
                </button>
              </div>

              <div>
                {isShown && (
                  <EditAdminDetails
                    walletaddress={userWallet.address}
                    setissubmit={props.setissubmit}
                  />
                )}
              </div>
            </>
          )
        )}
      </div>

      {userType === "Customer" && (
        <Row>
          <Col lg="12" md="3" sm="12">
            <Tabs
              defaultActiveKey="COLLECTIONS"
              id="uncontrolled-tab-example"
              className="mb-3 mt-5 justify-content-center"
            >
              <Tab eventKey="COLLECTIONS" title="COLLECTIONS">
                <UserNFTList data={data} />
              </Tab>
              <Tab eventKey="ACTIVITY" title="ACTIVITY">
                {/* <Sonnet /> <div>"Have to build</div> */}
                <UserActivity userActivityDetails={userActivityDetails} />
              </Tab>
              <Tab eventKey="EDIT PROFILE" title="EDIT PROFILE">
                <EditProfile
                  walletaddress={userWallet.address}
                  setissubmit={props.setissubmit}
                />
              </Tab>
            </Tabs>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default ProfileHead;
