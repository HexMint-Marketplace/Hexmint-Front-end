import React from 'react'
import { Link } from 'react-router-dom';
import { Container, Row, Col } from "reactstrap";
import CommonHeader from '../CommonHeader/CommonHeader'


function Create() {
  return (
    <div>
      <CommonHeader title={'Create New Collection'}/>
      <section>
        <Container>
          <Row>
            <Col lg='2'>

            </Col>
            <Col lg="8" md="8" sm="6">
              <div className="create__item">
                <form>
                  <div className="form__input">
                    <label htmlFor="">Collection Logo Image</label>
                    <input type="file" className="upload__input" />
                  </div>

                  <div className="form__input">
                    <label htmlFor="">Name</label>
                    <input type="text" placeholder="Enter title" />
                  </div>

                  <div className="form__input">
                    <label htmlFor="">Description</label>
                    <textarea
                      name=""
                      id=""
                      rows="7"
                      placeholder="Enter description"
                      className="w-100"
                    ></textarea>
                  </div>

                  <div className="d-flex align-items-center gap-4 mt-5 mb-5">
                    <button className="btn mint_button d-flex align-items-center gap-2">
                        <Link to='/explore'>Create Collection</Link>
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

export default Create