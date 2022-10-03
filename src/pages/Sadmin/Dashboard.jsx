import React from "react";
import BestCreators from "../../components/ui/BestCreators/BestCreators";
import BestSellers from "../../components/ui/BestSellers/BestSellers";
import BestBuyers from "../../components/ui/BestBuyers/BestBuyers";
import SuperAdminNav from "../../components/SideNav/SuperAdmin/SuperAdminNav";
import "../../styles/superAdmin.css";
import "../../styles/nAdminDashboard.css";
import { Container } from "reactstrap";

function NormalAdminDashboard() {
  return (
    <section>
      <div className="side-bar">
        <SuperAdminNav />
      </div>
      <Container>
        <div className="row">
          <div className="heading col-8">
            <h1>
              Discover Rare Digital Art And Collect
              <span className="h1-mid"> Sell Extraordinary</span> NFTs
            </h1>
          </div>
          <div className="profit col-4">
            <div className="card bg-transparent">
              <div className="card-body border border-5 rounded rounded-4 border-primary text-center">
                <h5 className="card-title text-white">Balance</h5>
                <h4 className="card-title text-danger">76.2 ETH</h4>
                <p className="card-text text-white">Total Customers - 148</p>
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

export default NormalAdminDashboard;
