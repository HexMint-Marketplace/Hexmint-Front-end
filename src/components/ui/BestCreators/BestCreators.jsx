import React from "react";
import "../BestCreators/bestCreators.css";
import { Row, Col, Container } from "reactstrap";
import DashboardServices from "../../../services/API/DashboardServices";
import { toast } from "react-toastify";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import HeightBox from "../../HeightBox/HeightBox";
import Typography from "@mui/material/Typography";

function BestCreators() {
  const [creatorData, setCreatorData] = React.useState([]);

  React.useEffect(() => {
    getSellerData();
  }, []);

  const getSellerData = async () => {
    try {
      const response = await DashboardServices.getTopUsers("creator");

      if (response.status === 200) {
        setCreatorData(response.data.data);
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
      <h3 data-testid="topcreators_txt">Top Creators</h3>
      <HeightBox height="20px" />
      <Row>
        {creatorData.map((item) => (
          <Col lg="2" md="3" sm="4" xs="6" key={item.id}>
            <Card sx={{ width: "100%", m: 1 }}>
              <CardMedia
                component="img"
                height="140"
                image={item.creatorImage}
                alt="seller image"
              />
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  {item.creatorWalletAddress}
                </Typography>
              </CardContent>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default BestCreators;
