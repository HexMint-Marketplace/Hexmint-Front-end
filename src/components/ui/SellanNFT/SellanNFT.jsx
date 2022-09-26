import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import "./sellanNFT.css"
import {Link} from 'react-router-dom'

const SellanNFT = (props) => {
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
                                <img src={imgUrl} alt="" className='w-100 img-fluid snft-icon' />
                            </div>
                        </Col>
                        
                        <Col lg='7' md='7' sm='6'>
                            <div className='text-start'>

                                <div className='h2 snft-name'>
                                    {title}
                                </div>
                                <div className='scollection-name'>
                                    {collectionName}
                                </div>

                                <div className='mt-4 d-flex align-items-center'>
                                    <div className='bowner-name'>
                                        Owned By You
                                    </div>
                                    {/* <div className='NFT-count p-2 mx-5'>
                                        {createrUsername} */}
                                    {/* </div> */}
                                </div>  
                                
                                <div className="sell_buttons d-flex align-items-center gap-4 mb-2">
                                    <button className="sellNow_button  d-flex align-items-center">
                                 
                                        <Link to='/seller-profile/seller-collection/NFT/listing-form'>Sell Now</Link>
                                    </button>

                                    <button className='transfer_button d-flex align-items-center'>
                                        <Link to='/seller-profile/seller-collection/NFT/transfer-form'>Transfer</Link>
                                        {/* <Link to={{pathname:'seller-profile/NFT/transfer-form',img:imgUrl}}>Transfer</Link> */}
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

export default SellanNFT