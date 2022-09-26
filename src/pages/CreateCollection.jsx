import React from 'react'
import { Link } from 'react-router-dom';
import { Container, Row, Col } from "reactstrap";
import CommonHeader from '../components/ui/CommonHeader/CommonHeader'
import '../styles/createCollection.css'

function CreateCollection() {
  return (
    <div>
    <CommonHeader title={'Create New Collection'}/>
    <section>
      <Container>
        <Row>
          <Col lg='2'>

          </Col>
          <Col lg="8" md="8" sm="6">
            <div className="create-collection">
              <form>
                <div className="form-input">
                  <label htmlFor="">Collection Logo Image*</label>
                  <input type="file" className="upload-input" />
                </div>

                <div className="form-input mt-4">
                  <label htmlFor="">Collection Name*</label>
                  <input type="text" placeholder="Enter the Collection Name" />
                </div>

                <div className="form-input mt-4">
                  <label htmlFor="">Description*</label>
                  <textarea
                    name=""
                    id=""
                    rows="7"
                    placeholder="Enter description"
                    className="w-100"
                  ></textarea>
                </div>

                <div className="d-flex align-items-center gap-4 mt-5 mb-5">
                  <button className="btn create-collection-button d-flex align-items-center gap-2">
                      <Link to='/explore'>Create</Link>
                  </button>
                </div>



              </form>
            </div>
          </Col>
          <Col lg='2'>
            
            </Col>
        </Row>
      </Container>
    </section>
  </div>
  )
}

export default CreateCollection