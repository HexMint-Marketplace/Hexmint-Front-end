import React from "react";
import { Container, Col, Row } from "reactstrap";
import { REQUEST__DATA } from "../../../asssets/data/data.js";
import ReportCard from "../RequestCard/RequestCard.jsx";

function RequestList() {
  return (
    <section>
      <Container>
        <Row>
          {REQUEST__DATA.slice(0, 8).map((item) => (
            <Col lg="4" md="4" sm="6" className="mb-4">
              <ReportCard key={item.id} item={item} />
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
}

export default RequestList;
