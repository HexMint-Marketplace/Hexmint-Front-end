import React from "react";
import CommonHeader from "../../components/ui/CommonHeader/CommonHeader";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";
import "../../styles/create.css";
import SuperAdminNav from "../../components/SideNav/SuperAdmin/SuperAdminNav";
import "../../styles/superAdmin.css";

function AddAdmin() {
  return (
    <div>
      <div className="side-bar">
        <SuperAdminNav />
      </div>
      <CommonHeader title={"Add an Admin"} />
      <section>
        <Container>
          <Row>
            <Col lg="2"></Col>
            <Col lg="8" md="8" sm="6">
              <div className="add_admin">
                <form>
                  <div className="form__input">
                    <label htmlFor="">Name</label>
                    <input type="text" placeholder="Enter Name" />
                  </div>

                  <div className="form__input">
                    <label htmlFor="">Email</label>
                    <input type="email" placeholder="Enter Email" />
                  </div>

                  <div className="form__input">
                    <label htmlFor="">Phone Number</label>
                    <input type="text" placeholder="Enter Phone Number" />
                  </div>

                  <div className="form__input">
                    <label htmlFor="">DoB</label>
                    <input type="date" placeholder="Enter Date of Birth" />
                  </div>

                  <div className="d-flex align-items-center gap-4 mt-5 mb-5">
                    <button className="btn mint_button d-flex align-items-center gap-2">
                      <Link to="">Add</Link>
                    </button>
                  </div>
                </form>
              </div>
            </Col>
            <Col lg="2"></Col>
          </Row>
        </Container>
      </section>
    </div>
  );
}

export default AddAdmin;
