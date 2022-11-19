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
import DashboardServices from "../../services/API/DashboardServices";

function NormalAdminDashboard() {
  const [loader, setLoader] = useState(false);
  const [count, setCount] = useState(0);
  const [labels1, setLabels1] = useState();
  const [labels2, setLabels2] = useState();
  const [selledNFTs, setSelledNFTs] = useState();
  const [mintNFTs, setMintNFTs] = useState();
  const [totalSales, setTotalSales] = useState({});
  const [profit, setProfit] = useState({});
  const [totalBalance, setTotalBalance] = useState();

  useEffect(() => {
    getCustomers();
    getNFTData();
    getTrades();
    getTotalBalance();
  }, []);

  const getTotalBalance = async () => {
    try {
      const response = await DashboardServices.getTotalBalance();
      if (response.status === 200) {
        setTotalBalance(response.data.data);
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

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

  const getNFTData = async () => {
    setLoader(true);

    try {
      const mintRes = await DashboardServices.getNFTCount("minted");
      const sellRes = await DashboardServices.getNFTCount("bought");

      if (mintRes.status === 200 && sellRes.status === 200) {
        setLabels1(mintRes.data.data.date);
        setMintNFTs(mintRes.data.data.data);
        setSelledNFTs(sellRes.data.data.data);
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

  const getTrades = async () => {
    setLoader(true);

    try {
      const transactions = await DashboardServices.getBalance("bought");
      const profit = await DashboardServices.getBalance("profit");

      if (profit.status === 200 && transactions.status === 200) {
        setLabels2(transactions.data.data.date);
        setTotalSales(transactions.data.data.data);
        setProfit(profit.data.data.data);
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
                <h4 className="card-title text-danger">{totalBalance} ETH</h4>
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
            <LineChart
              title={"NFT Data"}
              labels={labels1}
              data1={mintNFTs}
              data2={selledNFTs}
              label1={"Minted NFTs"}
              label2={"Selled NFTs"}
            />
          </Col>
          <Col lg="6" md="6" sm="12" className="mb-4">
            <LineChart
              title={"Marketplace Trades"}
              labels={labels2}
              data1={totalSales}
              data2={profit}
              label1={"Transaction Total"}
              label2={"Marketplace Profit"}
            />
          </Col>
        </Row>

        <Container>
          <BestSellers />
          <BestBuyers />
          <BestCreators />
        </Container>
        <HeightBox height="50px" />
      </Container>
    );
  }
}

export default NormalAdminDashboard;
