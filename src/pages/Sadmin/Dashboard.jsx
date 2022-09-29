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
            <h1>Display balance</h1>
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
