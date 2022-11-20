import React from "react";
import { Link } from "react-router-dom";
import { Container } from "reactstrap";

import "./RequestCard.css";

const ReportCard = (props) => {
  const { user, id, reason, walletAddress } = props.item;

  return (
    <Container>
      <div className="single_request_card">
        <h3 className="user-name">{user}</h3>
        <p>
          <b>Wallet Address : </b>
          {walletAddress}
        </p>

        <h5 className="reason-title">Reason</h5>
        <p className="reason">{reason}</p>

        <div className="row">
          <div className="col-lg-6 d-flex align-items-center gap-4 mt-5 mb-5">
            <button className="btn mint_button d-flex align-items-center gap-2">
              <Link to="">Approve</Link>
            </button>
          </div>
          <div className="col-lg-6 d-flex align-items-center gap-4 mt-5 mb-5">
            <button className="btn mint_button d-flex align-items-center gap-2">
              <Link to="">Decline</Link>
            </button>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ReportCard;
