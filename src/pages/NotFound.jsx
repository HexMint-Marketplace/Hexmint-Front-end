import React from "react";
import "../styles/notFound.css";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";

const NotFound = () => {
  return (
    <div className="not-found">
      <h1>404</h1>
      <div class="cloak__wrapper">
        <div class="cloak__container">
          <div class="cloak"></div>
        </div>
      </div>
      <div class="info">
        <h2>We can't find that page</h2>
        <p>
          We're fairly sure that page used to be here, but seems to have gone
          missing. We do apologise on it's behalf.
        </p>
        <Link to="/">
          <Button
            className="btn btn-primary"
            sx={{
              paddingLeft: "50px",
              paddingRight: "50px",
              paddingTop: "10px",
              paddingBottom: "10px",
              borderRadius: "10px",
            }}
          >
            Home
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
