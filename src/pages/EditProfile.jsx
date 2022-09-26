import React from 'react'
import { Link } from 'react-router-dom';
import { Container, Row, Col } from "reactstrap";
import CommonHeader from '../components/ui/CommonHeader/CommonHeader'
import '../styles/editProfile.css'

function EditProfile() {
  return (
    <div>
    <CommonHeader title={'Edit Profile'}/>
    <section>
      <Container>
        <Row>
          <Col lg='2'>

          </Col>
          <Col lg="8" md="8" sm="6">
            <div className="edit-profile">
              <form>
                <div className="form-input">
                  <label htmlFor="">Profile Picture</label>
                  <input type="file" className="upload-input" />
                </div>

                <div className="form-input mt-4">
                  <label htmlFor="">Name</label>
                  <input type="text" placeholder="Enter Your Name" />
                </div>

                <div className="form-input mt-4">
                  <label htmlFor="">Username</label>
                  <input type="text" placeholder="Enter Your Name" />
                </div>

                <div className="d-flex align-items-center gap-4 mt-5 mb-5">
                  <button className="btn edit-profile-button d-flex align-items-center gap-2">
                      <Link to='/seller-profile'>Save</Link>
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

export default EditProfile