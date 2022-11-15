import React from "react";
import { Container, Row, Col } from "reactstrap";
import "./singleCollectionHead.css";
import HeightBox from "../../HeightBox/HeightBox";
import Banner from "../../../asssets/images/banner.jpg";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Paper from "@mui/material/Paper";
import { borderRadius } from "@mui/system";

const SingleCollectionHead = (props) => {
  const {
    _v,
    _id,
    contractAddress,
    collectionDescription,
    collectionName,
    createdAt,
    logoImg,
    numberofNfts,
    ownersCount,
    totalPrice,
    floorPrize,
    updatedAt,
    userid,
  } = props.collectionData;
  console.log(props.collectionData);
  // if (listedNFTcount > 0);
  return (
    <Container>
      <HeightBox height="30px" />

      <Row>
        <div>
          <img src={Banner} alt="banner" className="banner-img" />
          <div className="ajust-logo">
            <img
              src={logoImg}
              alt=""
              className="rounded-circle rounded-0 border border-5 img-fluid float-start custom-logoimg"
            />
          </div>
        </div>
      </Row>

      <Row>
        <Col sm="12" md="4" lg="4" className="ajust-details">
          <div className="h2 collection-name">{collectionName}</div>

          <div className="collection-description">{collectionDescription}</div>
          <HeightBox height="5px" />
        </Col>

        <Col sm="12" md="8" lg="8">
          <Card
            variant="outlined"
            sx={{ p: 1, textAlign: "center", borderRadius: 3 }}
          >
            <CardContent>
              <Row>
                <Col>
                  <Paper sx={{ p: 1, m: 1 }} elevation={3}>
                    <h4>{numberofNfts + " total NFTs"}</h4>
                  </Paper>
                </Col>
                <Col>
                  <Paper sx={{ p: 1, m: 1 }} elevation={3}>
                    <h4>{"Total volume of " + totalPrice}</h4>
                  </Paper>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Paper sx={{ p: 1, m: 1 }} elevation={3}>
                    <h4>{ownersCount + " Owner(s)"}</h4>
                  </Paper>
                </Col>
                <Col>
                  <Paper sx={{ p: 1, m: 1 }} elevation={3}>
                    <h4>{"Floor Prize: " + floorPrize}</h4>
                  </Paper>
                </Col>
              </Row>
            </CardContent>
          </Card>
        </Col>
      </Row>

      <hr class="hr-primary mt-4" />
    </Container>
  );
};

export default SingleCollectionHead;
