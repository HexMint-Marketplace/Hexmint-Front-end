import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Container, Col, Row } from "reactstrap";
import { NFT__DATA } from "../../../asssets/data/data.js";
import "../CollectionList/collectionList.css";
import "./exploreMore.css";
import CollectionCard from "../CollectionCard/CollectionCard";
import CustomerServices from "../../../services/API/CustomerServices";
import { toast } from "react-toastify";

function ExploreMore() {
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
              <h5 className="explore-more">Explore More</h5>
            </div>
          </Col>

          {allCollections.slice(0, 4).map((item) => (
            <Col lg="3" md="4" sm="6" className="mb-4">
              <CollectionCard key={item.id} item={item} />
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
}

export default ExploreMore;
