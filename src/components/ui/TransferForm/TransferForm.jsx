import React from 'react'
import { useParams } from 'react-router-dom'
import { Container, Row, Col } from 'reactstrap';
import img01 from "../../../asssets/collectionImages/Apes.jpg";
import {Link} from 'react-router-dom'

console.log(img01)
const TransferForm = () => {
    // let {img} = useParams();
// console.log(useParams());
  return (
    <div>
        
        <section>
        <Container>
        <Row>
            <Col lg="12" md="3" sm="12">
                <div className='px-4 text-center'>
                    <h1 className='mt-5 mb-3'>Transfer</h1>
                    <img src={img01} alt="" className='rounded-circle rounded border border-5 img-fluid' height="200" width="200"/>
                </div>
            </Col>
            <Col lg='2' md='8' sm='6' className='' ></Col>
            <Col lg='8' md='8' sm='6' className='' >
            <div className="create__item mt-5">
                <form className='text-center'>
                  <div className="form__input">
                    <label htmlFor="" className='text-center'>Receiver's Wallet Address</label>
                    <input type="text" placeholder="Enter Receiver's Wallet Address" />
                  </div>

                  <button type='submit' className='btn text-center p-2 px-5 mt-3 mb-5'>
                    <Link to=''>Transfer</Link>
                    {/* <Link to={{pathname:'seller-profile/NFT/transfer-form',img:imgUrl}}>Transfer</Link> */}
                </button>
                </form>



            </div>
            </Col>
            <Col lg='2' md='8' sm='6' className='' ></Col>
        </Row>

        <Row>
            <Col lg="12" md="3" sm="12">


            </Col>
        </Row>
        </Container>
        </section>
    </div>
  )
}

export default TransferForm