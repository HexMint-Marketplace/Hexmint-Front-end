import React from "react";
import { Link } from "react-router-dom";
import { Container } from "reactstrap";

import "./ReportCard.css";

const ReportCard = (props) => {
  const { user, id, reason, reporter } = props.item;

  return (
    <Container>
      <div className="single_report_card">
        <h3 className="user-name">{user}</h3>

        <h4 className="reason-title">Reason</h4>
        <p className="reason">{reason}</p>

        <h5 className="reporter">Reported by {reporter}</h5>

        <div className="row">
          <div className="col-lg-6 d-flex align-items-center gap-4 mt-5 mb-5">
            <button className="btn mint_button d-flex align-items-center gap-2">
              <Link to="">View User</Link>
            </button>
          </div>
          <div className="col-lg-6 d-flex align-items-center gap-4 mt-5 mb-5">
            <button className="btn mint_button d-flex align-items-center gap-2">
              <Link to="">Delete</Link>
            </button>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ReportCard;
