import React from "react";
import "../BestCreators/bestCreators.css";
import { Row, Col, Container } from "reactstrap";
import { creator_data } from "../../../asssets/data/data.js";

function BestCreators() {
  return (
    <Container>
      <Row>
        <Col lg="12" className="mb-5">
          <div className="creator_section_title mt-5">
            <h3>Top Creators</h3>
          </div>
        </Col>

        {creator_data.map((item) => (
          <Col lg="2" md="3" sm="4" xs="6" key={item.id} className="mx-4 mb-3">
            <div className=" creator_card d-flex align-items-center gap-3">
              <div className="creator_image">
                <img src={item.creatorImage} alt="" className="w-100" />
              </div>

              <div className="creator_contact">
                <h6>{item.creatorWalletAddress}</h6>
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default BestCreators;
