import { React, useState, useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import "./sellanNFT.css";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import HeightBox from "./../../HeightBox/HeightBox";
import CardContent from "@mui/material/CardContent";
import Marketplace from "../../../Marketplace.json";

const SellanNFT = (props) => {
  const {
    NFTname,
    collectionId,
    contractAddress,
    description,
    image,
    price,
    seller,
    tokenId,
  } = props.NFTData;

  const [currentlyListed, setCurrentlyListed] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const _data = await getListCondition(tokenId);
      setCurrentlyListed(_data);
    };
    fetchData().catch(console.error);
  }, []);

  async function getListCondition(tokenId) {
    const ethers = require("ethers");
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    let contract = new ethers.Contract(
      Marketplace.address,
      Marketplace.abi,
      signer
    );
    let transaction = await contract.getTokenForId(tokenId);
    return transaction.currentlyListed;
  }

  return (
    <Container>
      <HeightBox height="100px" />
      <div className="mt-4 d-flex align-items-center">
        <Card sx={{ maxWidth: 1000, borderRadius: 4 }}>
          <Row>
            <Col lg="5" md="5" sm="6">
              <CardContent>
                <div>
                  <img
                    src={image}
                    alt=""
                    className="w-100 img-fluid snft-icon"
                    style={{ borderRadius: "10%" }}
                  />
                </div>
              </CardContent>
            </Col>

            <Col lg="7" md="7" sm="6">
              <CardContent sx={{ p: 5 }}>
                <div className="h2 snft-name">
                  {[NFTname, "    #", tokenId]}
                </div>
                <div className="h2 snft-name">{description}</div>
                <div className="scollection-name">{collectionId}</div>

                <div className="mt-4 d-flex align-items-center">
                  <div className="bowner-name">Owned By You</div>
                </div>

                <div className="sell_buttons d-flex align-items-center gap-4 mb-2">
                  <Row>
                    <Col lg="6" md="6" sm="12">
                      {currentlyListed && (
                        <button
                          className="sellNow_button  d-flex align-items-center common_btn"
                          title="Already Listed!!!"
                        >
                          Sell Now
                        </button>
                      )}
                      {!currentlyListed && (
                        <button className="sellNow_button  d-flex align-items-center common_btn">
                          <Link
                            to="/seller-profile/seller-collection/NFT/listing-form"
                            state={{ NFTData: props.NFTData }}
                          >
                            Sell Now
                          </Link>
                        </button>
                      )}
                    </Col>
                    <Col lg="6" md="6" sm="12">
                      <button className="transfer_button d-flex align-items-center common_btn">
                        <Link
                          to="/seller-profile/seller-collection/NFT/transfer-form"
                          state={{ NFTData: props.NFTData }}
                        >
                          Transfer
                        </Link>
                      </button>
                    </Col>
                  </Row>
                </div>
              </CardContent>
            </Col>
          </Row>
        </Card>
      </div>
    </Container>
  );
};

export default SellanNFT;
