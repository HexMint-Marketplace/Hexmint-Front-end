import React from 'react'
import { Link } from 'react-router-dom'
import {Container,Col,Row} from 'reactstrap'
import { NFT__DATA } from "../../../asssets/data/data.js";
import "./collectionList.css"
import CollectionCard from '../CollectionCard/CollectionCard';

function CollectionList() {
  return (
    <section>
      <Container>
        <Row>
          <Col lg="12" className="mb-5">
            <div className="explore_list d-flex align-items-center justify-content-between ">
              <h3>Explore</h3>
            </div>
          </Col>

          {NFT__DATA.slice(0, 6).map((item) => (
            <Col lg="4" md="4" sm="6" className="mb-4">
              <CollectionCard key={item.id} item={item} />
            </Col>
          ))}

          <Col lg="12" className='mb-5'>
              <div className='more'>
                <Link to="/explore">Explore more</Link>
              </div>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default CollectionList