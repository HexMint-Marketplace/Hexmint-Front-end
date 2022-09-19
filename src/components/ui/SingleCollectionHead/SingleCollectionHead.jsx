import React from 'react'
import { Container, Row, Col } from 'reactstrap';
import "./singleCollectionHead.css";

const SingleCollectionHead = (props) => {
  const{contractAddress, collectionName, description, collectionIcon} = props.collectionData[0];
  console.log(props.collectionData)
  return (
    <section>
    <Container>
        <Row>
        <Row>
            <Col lg="3" md="3" sm="12">
                <div className='px-4'>
                    <img src={collectionIcon} alt="" className='w-100 rounded-circle rounded-0 border border-5 img-fluid float-start'/>
                </div>
            </Col>
        </Row>

        <Row>
            <Col lg="8" md="3" sm="12">
                <div className='h2 px-4 mt-3 collection-name'>
                    {collectionName}
                </div>

                <div className='px-4 mt-3 collection-description'>
                    {description}
                </div>
            </Col>

            <Col lg="4" md="3" sm="12">
                <div className='d-flex'>
                <div className='NFT-count p-2 mt-4 mx-5'>
                    127 NFTs
                </div>

                <div className='owners-count p-2 mt-4'>
                    32 Owners
                </div>
                </div>
            </Col>
        </Row>
        <hr class="hr-primary mt-4" />
        </Row>
    </Container>
    </section>
  )
}

export default SingleCollectionHead