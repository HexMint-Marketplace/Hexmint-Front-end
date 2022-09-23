import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";
import CommonHeader from "../../components/ui/CommonHeader/CommonHeader";
import "../../styles/create.css";

function ViewReports() {
  return (
    <div>
      <CommonHeader title={"Block an User"} />
      <section>
        <Container>
          <Row>
            <Col lg="2"></Col>
            <Col lg="8" md="8" sm="6">
              <div className="blk_user">
                <form>
                  <div className="form__input">
                    <label htmlFor="">User</label>
                    <select
                      class="form-select"
                      aria-label="Default select example"
                    >
                      <option selected>Open this select menu</option>
                      <option value="1">User 1</option>
                      <option value="2">User 2</option>
                      <option value="3">User 3</option>
                    </select>
                  </div>

                  <div className="form__input">
                    <label htmlFor="">Reason</label>
                    <textarea
                      name=""
                      id=""
                      rows="7"
                      placeholder="Enter Reason"
                      className="w-100"
                    ></textarea>
                  </div>

                  <div className="d-flex align-items-center gap-4 mt-5 mb-5">
                    <button className="btn mint_button d-flex align-items-center gap-2">
                      <Link to="">Block</Link>
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

export default ViewReports;
