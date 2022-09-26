import React from 'react'
import { Link } from 'react-router-dom'
import {Container,Col,Row} from 'reactstrap'
import { NFT__DATA } from "../../../asssets/data/data.js";
import "../CollectionList/collectionList.css"
import './exploreMore.css'
import CollectionCard from '../CollectionCard/CollectionCard';

function ExploreMore() {
  return (
    <section>
      <Container>
        <Row>
          <Col lg="12" className="mb-5">
            <div className="explore_list d-flex align-items-center justify-content-between ">
              <h5 className='explore-more'>Explore More</h5>
            </div>
          </Col>

          {NFT__DATA.slice(0, 4).map((item) => (
            <Col lg="3" md="4" sm="6" className="mb-4">
              <CollectionCard key={item.id} item={item} />
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  )
}

export default ExploreMore