import { React, useState, useEffect } from "react";
import { Container, Col, Row } from "reactstrap";
import "../CollectionList/collectionList.css";
import "./exploreMore.css";
import CollectionCard from "../CollectionCard/CollectionCard";
import CustomerServices from "../../../services/API/CustomerServices";
import { toast } from "react-toastify";
import Loader from "../../ui/Loader/Loader";

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
        setAllCollections(response.data.collections);
      } else {
        toast.error("Error Occured!");
      }
    } catch (error) {
      toast.error("Error Occured!");
    }
    setTimeout(() => {
      setLoader(false);
    }, 200);
  };

  if (loader) {
    return <Loader isLoading={loader} />;
  } else {
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
              <CollectionCard key={item.id} item={item} />
            ))}
          </Row>
        </Container>
      </section>
    );
  }
}

export default ExploreMore;
