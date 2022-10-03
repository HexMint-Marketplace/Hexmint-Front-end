import React from 'react'
import {Container,Col,Row} from 'reactstrap'
import {USER_COLLECTION_DATA} from '../../../asssets/data/data'
import CollectionCard from '../CollectionCard/CollectionCard'
import NFTs from "../../../pages/NFTs";

function UserCollectionList(props) {
  const {data} = props
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

      <Row>
        <Col lg="3" md="4" sm="6">
            <div className="">
                <div className="">
                  {data.map((value, index) => {
                    return <NFTs data={value} key={index}></NFTs>;
                })}
                </div>
                <div className="mt-10 text-xl">
                  {data.length == 0
                    ? "Oops, No NFT data to display (Are you logged in?)"
                    : ""}
                </div>
            </div>
        </Col>
      </Row>
    </Container>
  </section>
  )
}

export default UserCollectionList