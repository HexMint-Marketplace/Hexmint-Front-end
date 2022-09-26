import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import "./buyanNFT.css"
import {Link} from 'react-router-dom'

const BuyanNFT = (props) => {
  const {id, title, desc, imgUrl, creator, createrUsername, creatorImg, currentBid, collectionName} = props.NFTData[0]
  return (

    <Container>
        <Row className=''>
            <Col lg='1'></Col>
                <Col lg='10' md='4' sm='6' className='mb-3 '>
                    <div className="single_service mt-5">
                        <Row>
                        <Col lg='5' md='5' sm='6'>
                            <div>
                                <img src={imgUrl} alt="" className='w-100 img-fluid bnft-icon' />
                            </div>
                        </Col>
                        
                        <Col lg='7' md='7' sm='6'>
                            <div className='text-start'>

                                <div className='h2 bnft-name'>
                                    {title}
                                </div>
                                <div className='bcollection-name'>
                                    {collectionName}
                                </div>

                                <div className='mt-3 d-flex align-items-center'>
                                    <div className='bowner-name'>
                                        Owned By
                                    </div>
                                    <div className='NFT-count p-2 mx-5'>
                                        {createrUsername}
                                    </div>
                                </div>

                                <div className='bprize-wrapper mt-4'>
                                    <div className="prize-is">
                                        prize
                                    </div>

                                    <div className="b-prize fw-bold fs-5">
                                        {currentBid} ETH
                                    </div>
                                </div>    
                                
                                <div className="buy_buttons align-items-center mb-2">
                                    <button className="buyNow_button  d-flex align-items-center">
                                 
                                        <Link to=''>Buy Now</Link>
                                    </button>
                                </div>

                            </div>
                        </Col>
                        </Row>
                    </div>
                </Col>
            <Col lg='1'></Col>
        </Row>
    </Container>

  )
}

export default BuyanNFT