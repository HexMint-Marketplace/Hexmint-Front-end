import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Container } from "reactstrap";

import "./AdminCard.css";

const AdminCard = (props) => {
  const { user, id, email, dob, mobile, walletAddress } = props.item;

  return (
    <Container>
      <div className="single_admin_card">
        <h3 className="user-name">{user}</h3>
        <p>
          <b>Wallet Address : </b>
          {walletAddress}
        </p>
        <h6>Email : {email}</h6>
        <h6>DoB : {dob}</h6>
        <h6>Mobile : {mobile}</h6>

        <div className="d-flex align-items-center gap-4 mt-5 mb-5">
          <button className="btn mint_button d-flex align-items-center gap-2">
            <Link to="">Delete</Link>
          </button>
        </div>
      </div>
    </Container>
  );
};

export default AdminCard;
