import React from 'react'
import {Container,Col,Row} from 'reactstrap'
import {NFT__DATA} from '../../../asssets/data/data.js'
import NFTCard from '../NFTCard/NFTCard'

function NFTList() {
  return (
    <section>
    <Container>
      <Row>

        {NFT__DATA.slice(0, 6).map((item) => (
          <Col lg="3" md="4" sm="6" className="mb-4">
            <NFTCard key={item.id} item={item} />
          </Col>
        ))}
      </Row>
    </Container>
  </section>
  )
}

export default NFTList