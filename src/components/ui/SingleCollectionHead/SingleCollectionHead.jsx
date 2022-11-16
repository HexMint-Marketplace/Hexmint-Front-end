import React from "react";
import { Container, Row, Col } from "reactstrap";
import "./singleCollectionHead.css";
import HeightBox from "../../HeightBox/HeightBox";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Paper from "@mui/material/Paper";
import Banner from "../../../asssets/images/banner.png";

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
        <Col sm="12" md="6" lg="6" className="ajust-details">
          <div
            className="h1 fw-bold collection-name"
            style={{ fontSize: "4rem", paddingLeft: "10%" }}
          >
            {collectionName}
          </div>

          <div
            className="collection-description"
            style={{ fontSize: "1.5rem", paddingLeft: "10%" }}
          >
            {collectionDescription}
          </div>
          <HeightBox height="5px" />
        </Col>

        <Col sm="12" md="6" lg="6">
          <Card
            variant="outlined"
            sx={{
              p: 1,
              textAlign: "center",
              borderRadius: 3,
              border: 1,
              borderColor: "grey.500",
              backgroundColor: "transparent",
            }}
          >
            <CardContent>
              <Row>
                <Col>
                  <Paper
                    sx={{
                      p: 1,
                      m: 1,
                      border: 1,
                      borderColor: "",
                      backgroundColor: "#14141f",
                    }}
                    elevation={3}
                  >
                    <p>{numberofNfts + " total NFTs"}</p>
                  </Paper>
                </Col>
                <Col>
                  <Paper
                    sx={{
                      p: 1,
                      m: 1,
                      border: 1,
                      borderColor: "",
                      backgroundColor: "transparent",
                    }}
                    elevation={3}
                  >
                    <p>{"Total volume of " + totalPrice}</p>
                  </Paper>
                </Col>

                <Col>
                  <Paper
                    sx={{
                      p: 1,
                      m: 1,
                      border: 1,
                      borderColor: "",
                      backgroundColor: "transparent",
                    }}
                    elevation={3}
                  >
                    <p>{ownersCount + " Owner(s)"}</p>
                  </Paper>
                </Col>
                <Col>
                  <Paper
                    sx={{
                      p: 1,
                      m: 1,
                      border: 1,
                      borderColor: "",
                      backgroundColor: "transparent",
                    }}
                    elevation={3}
                  >
                    <p>{"Floor Prize: " + floorPrize}</p>
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
