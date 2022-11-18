import React, { useEffect, useState } from "react";
import CommonHeader from "../components/ui/CommonHeader/CommonHeader";
import ExploreList from "../components/ui/ExploreList/ExploreList";
import { Container } from "reactstrap";
import HeightBox from "../components/HeightBox/HeightBox";

function Explore() {
  return (
    <Container>
      <HeightBox height="30px" />
      <CommonHeader title={"Explore Collections"} />
      <ExploreList />
    </Container>
  );
}

export default Explore;
