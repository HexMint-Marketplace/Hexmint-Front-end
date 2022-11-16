import React from "react";
import { Tab, Tabs } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { Container } from "reactstrap";
import NFTList from "../components/ui/NFTList/NFTList.jsx";
import SingleCollectionHead from "../components/ui/SingleCollectionHead/SingleCollectionHead";

function SingleCollection() {
  const location = useLocation();
  // use location from CollectionCard.jsx
  const { collectionData, data } = location.state;

  return (
    <section>
      <div>
        <SingleCollectionHead
          key={collectionData._id}
          collectionData={collectionData}
        />
        <Container>
          <Tabs
            defaultActiveKey="Buy Now"
            id="uncontrolled-tab-example"
            className="mb-3 mt-5 justify-content-center"
          >
            <Tab eventKey="Buy Now" title="Buy Now">
              <NFTList
                sellType = "Buy Now"
                key={collectionData._id}
                collectionData={collectionData}
                NFTData={data}
              />
            </Tab>

            <Tab eventKey="In Auction" title="In Auction">
              <NFTList
                sellType = "In Auction"
                key={collectionData._id}
                collectionData={collectionData}
                NFTData={data}
              />
            </Tab>
          </Tabs>
        </Container>
      </div>
    </section>
  );
}

export default SingleCollection;
