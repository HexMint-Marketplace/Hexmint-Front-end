import React, { useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";
import img01 from "../../../asssets/collectionImages/Apes.jpg";
import { Link } from "react-router-dom";

console.log(img01);
const ListingForm = () => {
  const location = useLocation();
  const [ListingType, setListingType] = useState("1");
  const [Duration, setDuration] = useState();
  const { NFTData } = location.state;
  // let {img} = useParams();
  // console.log(useParams());
  return (
    <div>
      <section>
        <Container>
          <Row>
            <Col lg="12" md="3" sm="12">
              <div className="px-4 text-center">
                <h1 className="mt-5 mb-3">List Item For Sale</h1>
                <img
                  src={NFTData.image}
                  alt=""
                  className="rounded-circle rounded border border-5 img-fluid"
                  height="200"
                  width="200"
                />
              </div>
            </Col>
            <Col lg="2" md="8" sm="6" className=""></Col>
            <Col lg="8" md="8" sm="6" className="">
              <div className="create__item mt-4">
                <form>
                  <div className="form__input">
                    <label htmlFor="">Listing Type</label>
                    <select
                      onChange={(e) => setListingType(e.target.value)}
                      class="form-select"
                      aria-label="Default select example"
                    >
                      <option selected>Open this select menu</option>
                      <option value="1" name="fixedPrize">
                        Fixed Prize
                      </option>
                      <option value="2" name="timedAuction">
                        Timed-Auction
                      </option>
                    </select>
                  </div>

                  {ListingType === "1" ? (
                    <div className="form__input mt-3">
                      <label htmlFor="">Prize</label>
                      <input type="text" placeholder="Enter Prize" />
                    </div>
                  ) : (
                    <div>
                      <div className="form__input mt-3">
                        <label htmlFor="">Staritng Prize</label>
                        <input type="text" placeholder="Enter Starting Prize" />
                      </div>

                      <div className="form__input">
                        <label htmlFor="">Duration</label>
                        <select
                          onChange={(e) => setDuration(e.target.value)}
                          class="form-select"
                          aria-label="Default select example"
                        >
                          <option selected>Open this select menu</option>
                          <option value="1" name="fivedays">
                            5 days
                          </option>
                          <option value="2" name="oneweek">
                            1 week
                          </option>
                          <option value="1" name="twoweek">
                            2 week
                          </option>
                          <option value="2" name="threeweek">
                            3 week
                          </option>
                          <option value="1" name="onemonth">
                            1 month
                          </option>
                          <option value="2" name="twomonth">
                            2 month
                          </option>
                        </select>
                      </div>
                    </div>
                  )}

                  {/* <div className="form__input">
                    <label htmlFor="">Description</label>
                    <textarea
                      name=""
                      id=""
                      rows="7"
                      placeholder="Enter description"
                      className="w-100"
                    ></textarea>
                  </div> */}

                  <div class="col-md-12 text-center">
                    <button
                      type="submit"
                      className="btn text-center p-2 px-5 mt-3 mb-5"
                    >
                      <Link to="">Complete Listing</Link>
                      {/* <Link to={{pathname:'seller-profile/NFT/transfer-form',img:imgUrl}}>Transfer</Link> */}
                    </button>
                  </div>
                </form>
              </div>
            </Col>
            <Col lg="2" md="8" sm="6" className=""></Col>
          </Row>

          <Row>
            <Col lg="12" md="3" sm="12"></Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default ListingForm;
