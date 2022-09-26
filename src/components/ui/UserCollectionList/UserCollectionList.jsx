import React from 'react'
import {Container,Col,Row} from 'reactstrap'
import {USER_COLLECTION_DATA} from '../../../asssets/data/data'
import CollectionCard from '../CollectionCard/CollectionCard'


function UserCollectionList() {
  return (
    <section>
    <Container>
      <Row>

        {USER_COLLECTION_DATA.slice(0, 6).map((item) => (
          <Col lg="3" md="4" sm="6" className="mb-4">
            <CollectionCard key={item.id} item={item} />
          </Col>
        ))}

      </Row>
    </Container>
  </section>
  )
}

export default UserCollectionList