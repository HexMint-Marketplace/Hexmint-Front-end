import React, { useState, useEffect } from "react";
import BestCreators from "../../components/ui/BestCreators/BestCreators";
import BestSellers from "../../components/ui/BestSellers/BestSellers";
import BestBuyers from "../../components/ui/BestBuyers/BestBuyers";
import "../../styles/superAdmin.css";
import "../../styles/nAdminDashboard.css";
import { Container } from "reactstrap";
import CustomerServices from "../../services/API/CustomerServices";
import { toast } from "react-toastify";
import Loader from "../../components/ui/Loader/Loader";

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
      <section>
        <Container>
          <div className="row">
            <div className="heading col-8">
              <h1>
                Discover Rare Digital Art And Collect
                <span className="h1-mid"> Sell Extraordinary</span> NFTs
              </h1>
            </div>
            <div className="profit col-4">
              <div className="card bg-transparent" style={{ zIndex: -1 }}>
                <div className="card-body border border-5 rounded rounded-4 border-primary text-center">
                  <h5 className="card-title text-white">Balance</h5>
                  <h4 className="card-title text-danger">76.2 ETH</h4>
                  <p className="card-text text-white">
                    Total Customers - {count}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <BestSellers />
            <BestBuyers />
            <BestCreators />
          </div>
        </Container>
      </section>
    );
  }
}

export default NormalAdminDashboard;
