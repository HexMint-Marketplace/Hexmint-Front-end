import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import BestCreators from "../../components/ui/BestCreators/BestCreators";
import BestSellers from "../../components/ui/BestSellers/BestSellers";
import BestBuyers from "../../components/ui/BestBuyers/BestBuyers";
import "../../styles/superAdmin.css";
import "../../styles/nAdminDashboard.css";
import CustomerServices from "../../services/API/CustomerServices";
import { toast } from "react-toastify";
import Loader from "../../components/ui/Loader/Loader";
import LineChart from "../../components/ui/Charts/LineChart";
import HeightBox from "../../components/HeightBox/HeightBox";

function NormalAdminDashboard() {
  const [loader, setLoader] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    getCustomers();
  }, []);

  const getCustomers = async () => {
    setLoader(true);

    try {
      const response = await CustomerServices.getCustomers();

      if (response.status === 200) {
        setCount(response.data.data.length);
      } else {
        toast.error("Error Occured!");
      }
    } catch (error) {
      toast.error("Error Occured!");
    }
    setTimeout(() => {
      setLoader(false);
    }, 200);
  };

  if (loader) {
    return <Loader isLoading={loader} />;
  } else {
    return (
      <Container>
        <HeightBox height="120px" />
        <Row>
          <Col lg="8" md="8" sm="12" className="mb-4">
            <div className="hero_content">
              <h2 data-testid="discover_txt">
                Discover rare digital art and collect{" "}
                <span>Sell Extraordinary</span> NFTs
              </h2>
            </div>
          </Col>
          <Col lg="4" md="4" sm="12" className="mb-4">
            <div className="card bg-transparent" style={{ zIndex: -1 }}>
              <div
                data-testid="balance_text"
                className="card-body border border-5 rounded rounded-4 border-primary text-center"
              >
                <h5 className="card-title text-white">Balance</h5>
                <h4 className="card-title text-danger">76.2 ETH</h4>
                <p className="card-text text-white">
                  Total Customers - {count}
                </p>
              </div>
            </div>
          </Col>
        </Row>
        <HeightBox height="50px" />
        <Row>
          <Col lg="6" md="6" sm="12" className="mb-4">
            <LineChart title={"Chart 1"} />
          </Col>
          <Col lg="6" md="6" sm="12" className="mb-4">
            <LineChart title={"Chart 2"} />
          </Col>
        </Row>

        <Container>
          <BestSellers />
          <BestBuyers />
          <BestCreators />
        </Container>
      </Container>
    );
  }
}

export default NormalAdminDashboard;
