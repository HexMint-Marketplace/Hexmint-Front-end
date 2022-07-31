import React from 'react'
import { Link } from 'react-router-dom';
import { Container, Row, Col } from "reactstrap";
import CommonHeader from '../components/ui/CommonHeader/CommonHeader'
import '../styles/create.css'

function Create() {
  return (
    <div>
      <CommonHeader title={'Create New Item'}/>
      <section>
        <Container>
          <Row>
            <Col lg='2'>

            </Col>
            <Col lg="8" md="8" sm="6">
              <div className="create__item">
                <form>
                  <div className="form__input">
                    <label htmlFor="">Upload File</label>
                    <input type="file" className="upload__input" />
                  </div>

                  <div className="form__input">
                    <label htmlFor="">Title</label>
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

                  <div className="form__input">
                    <label htmlFor="">Collection</label>
                    <select class="form-select" aria-label="Default select example">
                      <option selected>Open this select menu</option>
                      <option value="1">One</option>
                      <option value="2">Two</option>
                      <option value="3">Three</option>
                    </select>
                  </div>

                  <div className="d-flex align-items-center gap-4 mt-5 mb-5">
                    <button className="btn mint_button d-flex align-items-center gap-2">
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

export default Create