import React from 'react'
import { Container, Row, Col} from 'reactstrap'
import {Link} from 'react-router-dom'
import './ServiceSection.css'


function ServiceSection() {
  return (
    <section>
        <Container>
            <Row >
                <Col lg='12' className='mb-4'>
                    <h3 className="service_title">Create and Sell your NFTS</h3>
                </Col>

                <Col lg='3' md='4' sm='6' className='mb-3'>
                    <div className="single_service">
                        <div className="single_service_content">
                            <h5>
                                <Link to='/wallet'>Connect Your Wallet</Link>
                            </h5>
                            <p className='mt-3'>
                                Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum
                            </p>
                        </div>
                    </div>
                </Col>

                <Col lg='3' md='4' sm='6'  className='mb-3'>
                    <div className="single_service">
                        <div className="single_service_content">
                            <h5>
                                <Link to='/wallet'>Create Your Collection</Link>
                            </h5>
                            <p className='mt-3'>
                                Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum
                            </p>
                        </div>
                    </div>
                </Col>

                <Col lg='3' md='4' sm='6'  className='mb-3'>
                    <div className="single_service">
                        <div className="single_service_content">
                            <h5>
                                <Link to='/create'>Mint Your NFTs</Link>
                            </h5>
                            <p className='mt-3'>
                                Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum
                            </p>
                        </div>
                    </div>
                </Col>

                <Col lg='3' md='4' sm='6'  className='mb-3'>
                    <div className="single_service">
                        <div className="single_service_content">
                            <h5>
                                <Link to='/wallet'>List Your NFTs</Link>
                            </h5>
                            <p className='mt-3'>
                                Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum
                            </p>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    </section>
  )
}

export default ServiceSection