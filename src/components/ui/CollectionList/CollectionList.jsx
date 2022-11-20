import { React, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Container, Col, Row } from "reactstrap";
import "./collectionList.css";
import CollectionCard from "../CollectionCard/CollectionCard";
import CustomerServices from "../../../services/API/CustomerServices";
import { toast } from "react-toastify";
import Loader from "../Loader/Loader";

function CollectionList() {
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
        setAllCollections(response.data.collections);
      } else {
        toast.error("Error Occured!");
      }
    } catch (error) {
      toast.error("Error Occured!");
    }
    setTimeout(() => {
      setLoader(false);
    }, 500);
  };

  return (
    <>
      {loader ? (
        <Loader isLoading={loader} />
      ) : (
        <section>
          <Container>
            <Row>
              <Col lg="12" className="mb-5">
                <div className="explore_list d-flex align-items-center justify-content-between ">
                  <h3 data-testid="explore_txt">Explore</h3>
                </div>
              </Col>

              {/* remove slice to avoid blanks */}
              {allCollections.slice(0, 6).map((item) => (
                <CollectionCard key={item.id} item={item} />
              ))}

              <Col lg="12" className="mb-5">
                <div className="more">
                  <Link to="/explore">Explore more</Link>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
      )}
    </>
  );
}

export default CollectionList;
