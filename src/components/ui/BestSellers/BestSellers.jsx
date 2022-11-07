import React from "react";
import "./BestSellers.css";
import { Row, Col, Container } from "reactstrap";

import { seller_data } from "../../../asssets/data/data.js";

function BestSellers() {
  return (
    <Container>
      <Row className="seller-row">
        <Col lg="12" className="mb-5">
          <div className="seller_section_title">
            <h3 data-testid="topsellers_txt">Top Sellers</h3>
          </div>
        </Col>

        {seller_data.map((item) => (
          <Col lg="2" md="3" sm="4" xs="6" key={item.id} className="mx-4 mb-3">
            <div className=" seller_card d-flex align-items-center gap-3">
              <div className="seller_image">
                <img
                  src={item.sellerImage}
                  alt=""
                  className="w-100"
                  data-testid="collection_image"
                />
              </div>

              <div className="seller_contact">
                <h6>{item.sellerWalletAddress}</h6>
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default BestSellers;
