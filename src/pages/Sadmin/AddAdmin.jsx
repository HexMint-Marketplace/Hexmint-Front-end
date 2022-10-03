import React, { useState } from "react";
import CommonHeader from "../../components/ui/CommonHeader/CommonHeader";
import { Link, useNavigate } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";
import "../../styles/create.css";
import SuperAdminNav from "../../components/SideNav/SuperAdmin/SuperAdminNav";
import "../../styles/superAdmin.css";
import AdminServices from "../../services/AdminServices";
import { toast } from "react-toastify";
import Loader from "../../components/ui/Loader/Loader";

function AddAdmin() {
  const formValues = {
    name: "",
    walletaddress: "",
    email: "",
    mobilenumber: "",
    DOB: "",
  };

  const navigate = useNavigate();

  var [state, setState] = useState(formValues);
  const [loader, setLoader] = useState(false);
  // const navigate = useNavigate();

  const handleChange = (event) => {
    console.log("in handle change");
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
    console.log(state);
  };

  const handleSubmit = async (e) => {
    setLoader(true);
    e.preventDefault();
    state = { ...state };
    console.log(state);
    try {
      const response = await AdminServices.addAdmin(state);
      console.log(response);
      if (response.status === 201) {
        toast.success(response.data.message);
      } else if (response.status === 200) {
        toast.info(response.data.message);
      } else {
        toast.error(response.data.message);
      }
      navigate("/sadmin-viewadmins");
    } catch (error) {
      toast.error("Error Occured!");
    }
    setTimeout(() => {
      setLoader(false);
    }, 200);
  };

  if (loader) {
    return <Loader />;
  } else {
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
                      <input
                        type="text"
                        name="name"
                        className="form-control"
                        placeholder="Enter Name"
                        onChange={handleChange}
                      />
                    </div>

                    <div className="form__input">
                      <label htmlFor="">Wallet Address</label>
                      <input
                        type="text"
                        name="walletaddress"
                        className="form-control"
                        placeholder="Enter Wallet Address"
                        onChange={handleChange}
                      />
                    </div>

                    <div className="form__input">
                      <label htmlFor="">Email</label>
                      <input
                        type="email"
                        name="email"
                        className="form-control"
                        placeholder="Enter Email"
                        onChange={handleChange}
                      />
                    </div>

                    <div className="form__input">
                      <label htmlFor="">Phone Number</label>
                      <input
                        type="text"
                        name="mobilenumber"
                        className="form-control"
                        placeholder="Enter Phone Number"
                        onChange={handleChange}
                      />
                    </div>

                    <div className="form__input">
                      <label htmlFor="">DoB</label>
                      <input
                        type="date"
                        name="DOB"
                        className="form-control"
                        placeholder="Enter Date of Birth"
                        onChange={handleChange}
                      />
                    </div>

                    <div className="d-flex align-items-center gap-4 mt-5 mb-5">
                      <button
                        className="btn mint_button d-flex align-items-center gap-2"
                        onClick={handleSubmit}
                      >
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
}

export default AddAdmin;

// onClick={() => {connect();}}
