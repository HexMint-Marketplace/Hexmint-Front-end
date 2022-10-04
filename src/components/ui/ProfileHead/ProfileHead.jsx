import React, { useRef, useEffect, useState } from "react";
import { Container, Row, Col } from "reactstrap";
import "../../ui/SingleCollectionHead/singleCollectionHead.css";
import "../ProfileHead/profileHead.css";
import { NavLink, Link } from "react-router-dom";
import Loader from "../Loader/Loader";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import EditProfile from "../../../pages/EditProfile";
import { useNavigate } from "react-router-dom";
import EditAdminDetails from "../../../pages/EditAdminDetails";
import UserNFTList from "../../ui/UserNFTList/UserNFTList"

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

  const { contractAddress, collectionName, description, collectionIcon } =props.collectionData[0];
  const { userWallet, userType, name, userName, proPic, data } = props;
  const { email, DOB, mobile } = props;

  console.log("Pro pic is", proPic);

  const { walletaddress } = props;
  console.log("In profile head to find user type", userType);
  console.log(props.collectionData);

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
    <section>
      <Container>
        <Row>
          <Row>
            <Col lg="12" md="3" sm="12">
              <div className="px-4 text-center">
                {/* {proPic == null ? ( */}
                  <img
                    src={collectionIcon}
                    alt=""
                    className="rounded-circle rounded border border-5 img-fluid"
                    height="200"
                    width="200"
                  />
                {/* ) : ( */}
                  {/* <img
                    src={"data:image/png;base64,"+proPic}
                    alt=""
                    className="rounded-circle rounded border border-5 img-fluid"
                    height="200"
                    width="200"
                  />
                )} */}
              </div>
            </Col>
          </Row>

          <Row>
            <Col lg="12" md="3" sm="12">
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

                <div className="text-center px-4 collection-name">
                  @{userName}
                </div>

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
                        <Col lg="3" md="3" sm="12"></Col>
                        <Col lg="6" md="6" sm="12">
                          <div className="admin-details mt-3 p-4">
                            <h5>Name : {name}</h5>
                            <h5>Email : {email}</h5>
                            <h5>DOB : {DOB}</h5>
                            <h5>Mobie : {mobile}</h5>
                          </div>
                        </Col>
                        <Col lg="3" md="3" sm="12"></Col>
                      </Row>
                      <div className="d-flex justify-content-center py-4">
                        <button
                          onClick={handleClick}
                          className="btn gap-2 align-items-center "
                        >
                          <b>Edit Profile</b>
                        </button>
                      </div>

                      <Row>
                        <Col lg="12" md="3" sm="12">
                          <div>
                            {isShown && (
                              <EditAdminDetails
                                walletaddress={userWallet.address}
                                setissubmit={props.setissubmit}
                              />
                            )}
                          </div>
                        </Col>
                      </Row>
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
                        <UserNFTList
                          data ={data}
                        />
                      </Tab>
                      <Tab eventKey="ACTIVITY" title="ACTIVITY">
                        {/* <Sonnet /> */} <div>"Have to build</div>
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
            </Col>
          </Row>
          {userType === "Customer" && <hr class="hr-primary mt-0" />}
        </Row>
      </Container>
    </section>
  );
};

export default ProfileHead;
