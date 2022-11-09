import React from 'react'
import "../BestBuyers/bestBuyers.css"
import {Row, Col, Container} from 'reactstrap'
import { buyer_data } from '../../../asssets/data/data.js'

function BestBuyers() {
  return (
        <Container>
        <Row>
            <Col lg='12' className='mb-5'>
                <div className="buyer_section_title mt-5">
                    <h3 data-testid="topbuyers_txt">Top Buyers</h3>
                </div>
            </Col>

            {buyer_data.map((item) => (
                <Col lg='2' md='3' sm='4' xs='6' key={item.id} className='mx-4 mb-3'>
                    <div className=" buyer_card d-flex align-items-center gap-3">
                        <div className="buyer_image">
                            <img src={item.buyerImage} alt='' className='w-100'/>
                        </div>
            
                        <div className="buyer_contact">
                            <h6>{item.buyerWalletAddress}</h6>
                        </div>
                    </div>
            
                            
                </Col>
            ))}


        </Row>
        </Container>

  )
}

export default BestBuyers