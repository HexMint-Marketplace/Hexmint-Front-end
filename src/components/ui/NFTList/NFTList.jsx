import { PropaneSharp } from "@mui/icons-material";
import React, { useState, useEffect } from "react";
import { Container, Col, Row } from "reactstrap";
import { NFT__DATA } from "../../../asssets/data/data.js";
import NFTCard from "../NFTCard/NFTCard";
import MarketplaceJSON from "../../../Marketplace.json";
import axios from "axios";

const NFTList = (props) => {
  console.log("props: ", props);
  // const { _id } = props.collectionData;
  const data = props.NFTData;
  return (
    <section>
      <Container>
        <Row>
          {data.slice(0, 6).map((item) => (
            <Col lg="3" md="4" sm="6" className="mb-4">
              <NFTCard key={item.tokenId} item={item} collectionData={props.collectionData} />
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default NFTList;
