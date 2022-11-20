import React from "react";
import { Container, Col, Row } from "reactstrap";
import SellerNFTCard from "../SellerNFTCard/SellerNFTCard";

function UserNFTList(props) {

    const {data} = props;
    return (
        <section>
        <Container>
            <Row>
                {data.map((value, index) => (
                    <Col lg="3" md="4" sm="6" className="mb-4">
                        <SellerNFTCard key={index} item={value} />
                    </Col>
                ))}
            </Row>
        </Container>
  </section>
  )

}

export default UserNFTList;
