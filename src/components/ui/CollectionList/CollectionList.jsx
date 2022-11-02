import { React, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Container, Col, Row } from "reactstrap";
import { NFT__DATA } from "../../../asssets/data/data.js";
import "./collectionList.css";
import CollectionCard from "../CollectionCard/CollectionCard";
import MarketplaceJSON from "../../../Marketplace.json";
import CustomerServices from "../../../services/API/CustomerServices";
import { toast } from "react-toastify";

function CollectionList() {

  const [allCollections, setAllCollections] = useState([]);
  const [loader, setLoader] = useState(false);
  useEffect(() => {
    getCollections();
  }, []);

  const getCollections = async () => {
    setLoader(true);
    try {
      const response = await CustomerServices.getAllCollections();

      if (response.status === 200) {
        // console.log("hi new data........", response.data.collections);
        setAllCollections(response.data.collections);
      } else {
        toast.error("Error Occured!");
      }
    } catch (error) {
      console.log("Error occur", error);
      toast.error("Error Occured!");
    }
    setTimeout(() => {
      setLoader(false);
    }, 200);
  };

  return (
    <section>
      <Container>
        <Row>
          <Col lg="12" className="mb-5">
            <div className="explore_list d-flex align-items-center justify-content-between ">
              <h3>Explore</h3>
            </div>
          </Col>

          {/* {NFT__DATA.slice(0, 6).map((item) => (
            <Col lg="4" md="4" sm="6" className="mb-4">
              <CollectionCard key={item.id} item={item} />
            </Col>
          ))} */}

          {allCollections.slice(0, 6).map((item) => (
            <Col lg="4" md="4" sm="6" className="mb-4">
              <CollectionCard key={item.id} item={item} />
            </Col>
          ))}

          <Col lg="12" className="mb-5">
            <div className="more">
              <Link to="/explore">Explore more</Link>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default CollectionList;
