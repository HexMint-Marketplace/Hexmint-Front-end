import React from "react";
import "./BestSellers.css";
import { Row, Col, Container } from "reactstrap";
import DashboardServices from "../../../services/API/DashboardServices";
import { toast } from "react-toastify";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import HeightBox from "../../HeightBox/HeightBox";
import Typography from "@mui/material/Typography";

function BestSellers() {
  const [sellerData, setSellerData] = React.useState([]);

  React.useEffect(() => {
    getSellerData();
  }, []);

  const getSellerData = async () => {
    try {
      const response = await DashboardServices.getTopUsers("seller");
      if (response.status === 200) {
        setSellerData(response.data.data);
      } else {
        toast.error("Error Occured!");
      }
    } catch (error) {
      toast.error("Error Occured!");
    }
  };

  return (
    <Container>
      <HeightBox height="20px" />
      <h3 data-testid="topsellers_txt">Top Sellers</h3>
      <HeightBox height="20px" />
      <Row>
        {sellerData.map((item) => (
          <Col lg="2" md="3" sm="4" xs="6" key={item.id}>
            <Card sx={{ width: "100%", m: 1 }}>
              <CardMedia
                component="img"
                height="140"
                image={item.sellerImage}
                alt="seller image"
              />
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  {item.sellerWalletAddress}
                </Typography>
              </CardContent>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default BestSellers;
