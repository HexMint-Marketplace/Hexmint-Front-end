import React, { useState, useEffect } from "react";
import { Container, Col, Row } from "reactstrap";
import { NFT__DATA } from "../../../asssets/data/data.js";
import CollectionCard from "../CollectionCard/CollectionCard.jsx";
import CustomerServices from "../../../services/API/CustomerServices";
import { toast } from "react-toastify";
import Loader from "../Loader/Loader";

function ExploreList() {
  const [allCollections, setAllCollections] = useState([]);
  const [loader, setLoader] = useState(false);
  useEffect(() => {
    setLoader(true);
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
    }, 1000);
  };

  return (
    <>
      {loader ? (
        <Loader isLoading={loader} />
      ) : (
        <section data-testid="collection_section">
          <Container>
            <Row>
              {allCollections.map((item) => (
                <Col lg="4" md="4" sm="6" className="mb-4">
                  <CollectionCard key={item.id} item={item} />
                </Col>
              ))}
            </Row>
          </Container>
        </section>
      )}
    </>
  );
}

export default ExploreList;
