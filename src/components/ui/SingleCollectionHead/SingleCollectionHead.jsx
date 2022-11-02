import React from "react";
import { Container, Row, Col } from "reactstrap";
import "./singleCollectionHead.css";

const SingleCollectionHead = (props) => {
  const {
    _v,
    _id,
    contractAddress,
    collectionDescription,
    collectionName,
    createdAt,
    logoImg,
    ownersCount,
    updatedAt,
    userid,
  } = props.collectionData;
  //   console.log(props.collectionData);
  // if (listedNFTcount > 0);
  return (
    <section>
      <Container>
        <Row>
          <Row>
            <Col lg="3" md="3" sm="12">
              <div className="px-4">
                <img
                  src={logoImg}
                  alt=""
                  className="w-100 rounded-circle rounded-0 border border-5 img-fluid float-start"
                />
              </div>
            </Col>
          </Row>

          <Row>
            <Col lg="8" md="3" sm="12">
              <div className="h2 px-4 mt-3 collection-name">
                {collectionName}
              </div>

              <div className="px-4 mt-3 collection-description">
                {collectionDescription}
              </div>
            </Col>

            <Col lg="4" md="3" sm="12">
              <div className="d-flex">
                <div className="NFT-count p-2 mt-4 mx-5">
                  {/* {listedNFTcount + " total NFTs"} */}
                </div>

                <div className="owners-count p-2 mt-4">
                  {ownersCount + " Owner(s)"}
                </div>
                <div className="NFT-count p-2 mt-4 mx-5">
                  {/* {"Floor Prize: " + floorprize} */}
                </div>
              </div>
            </Col>
          </Row>
          <hr class="hr-primary mt-4" />
        </Row>
      </Container>
    </section>
  );
};

export default SingleCollectionHead;
