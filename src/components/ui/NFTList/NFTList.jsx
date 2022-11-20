import React from "react";
import { Container, Col, Row } from "reactstrap";

import NFTCard from "../NFTCard/NFTCard";

const NFTList = (props) => {
  const data = props.NFTData;
  return (
    <section>
      <Container>
        {props.sellType == "Buy Now" && (
          <Row>
            {data.slice(0, 6).map((item) => (
              <Col lg="3" md="4" sm="6" className="mb-4">
                <NFTCard
                  key={item.tokenId}
                  item={item}
                  collectionData={props.collectionData}
                  sellType={props.sellType}
                />
              </Col>
            ))}
          </Row>
        )}
        {props.sellType == "In Auction" && (
          <Row>
            {data.slice(0, 6).map((item) => (
              <Col lg="3" md="4" sm="6" className="mb-4">
                <NFTCard
                  key={item.tokenId}
                  item={item}
                  collectionData={props.collectionData}
                  sellType={props.sellType}
                />
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </section>
  );
};

export default NFTList;
