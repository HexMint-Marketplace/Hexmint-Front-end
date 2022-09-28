import React, { useRef, useEffect, useState } from "react";
import { Container, Row, Col } from "reactstrap";
import "../../ui/SingleCollectionHead/singleCollectionHead.css";
import "../ProfileHead/profileHead.css";
import { NavLink, Link } from "react-router-dom";
import Loader from "../Loader/Loader";

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
  const { contractAddress, collectionName, description, collectionIcon } =
    props.collectionData[0];
  const { userWallet } = props;
  const { userType } = props;
  console.log("In profile head to find user type", userType);
  console.log(props.collectionData);

  const showAddress = userWallet?.address
    ? userWallet.address.substring(0, 4) +
      "...." +
      userWallet.address.substring(38, 42)
    : "@";
  console.log(typeof showAddress);

  return (
    <section>
      <Container>
        <Row>
          <Row>
            <Col lg="12" md="3" sm="12">
              <div className="px-4 text-center">
                <img
                  src={collectionIcon}
                  alt=""
                  className="rounded-circle rounded border border-5 img-fluid"
                  height="200"
                  width="200"
                />
              </div>
            </Col>
          </Row>

          <Row>
            <Col lg="12" md="3" sm="12">
              <div className="">
                <div className="text-center h2 px-4 mt-3 collection-name">
                  {/* {showAddress} */}
                  {userType === "Customer" ? showAddress : "Admin"}
                </div>

                <div className="text-center px-4 collection-name">
                  @{showAddress}
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
                  <div className="d-flex justify-content-center py-4">
                    <Link to={"/edit-admin-details"}>
                      <button className="btn gap-2 align-items-center ">
                        <b>Edit Profile</b>
                      </button>
                    </Link>
                  </div>
                )}
              </div>

              {userType === "Customer" && (
                <div className="nav_menu d-flex justify-content-center mt-4">
                  <ul className="nav_list d-flex align-items-center">
                    {NAV_LINKS.map((item, index) => (
                      <li className="nav_item" key={index}>
                        <NavLink
                          to={item.url}
                          className={(navClass) =>
                            navClass.isActive ? "active" : ""
                          }
                        >
                          {item.display}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                </div>
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
