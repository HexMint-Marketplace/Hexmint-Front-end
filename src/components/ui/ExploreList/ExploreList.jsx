import React from 'react'
import {Container,Col,Row} from 'reactstrap'
import {NFT__DATA} from '../../../asssets/data/data.js'
import CollectionCard from '../CollectionCard/CollectionCard.jsx'

function ExploreList() {
  return (
    <section>
    <Container>
      <Row>

        {NFT__DATA.slice(0, 6).map((item) => (
          <Col lg="4" md="4" sm="6" className="mb-4">
            <CollectionCard key={item.id} item={item} />
          </Col>
        ))}
      </Row>
    </Container>
  </section>
  )
}

export default ExploreList