import { React, useEffect, useState } from "react";
import { Tab, Tabs } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { Container } from "reactstrap";
import NFTList from "../components/ui/NFTList/NFTList.jsx";
import SingleCollectionHead from "../components/ui/SingleCollectionHead/SingleCollectionHead";
import UserServices from "../services/API/UserServices.js";

function SingleCollection() {
  const location = useLocation();
  // use location from CollectionCard.jsx
  const { collectionData, data } = location.state;
  const [buyNowData, setBuyNowData] = useState([]);
  const [timeAuctionData, setTimeAuctionData] = useState([]);
  const [isSeperated, setIsSeperated] = useState(false);

  // console.log("data: ",data);
  useEffect(() => {
    seperateListings();
  });

  async function seperateListings() {
    const items = await Promise.all(
      data.map(async (item) => {
        const tokenId = item.tokenId;
        // console.log("tokenId tokenId tokenId tokenId: ", tokenId);
        const details = await UserServices.getTimeAuctionDetails(tokenId);
        // console.log("details: sdaccdac: ", details);
        if (details.data.status === 200) {
          const response = await UserServices.getUserDetailsFromUserId(details.data.item.bidderId)

          item.currentbid = details.data.item.currentbid;
          item.endDate = details.data.item.endDate;
          item.initialBid = details.data.initialBid;
          item.currentBidder = response.data.walletaddress;
          // console.log("item.initialBid: ", item.initialBid);
          console.log(
            "current bidder id................... ",
            item.currentBidder
          );
          const duration = details.data.timeDiff;
          // console.log(duration, details.data.timeDiff);
          const days = Math.floor(duration / (1000 * 3600 * 24));
          const hours = Math.floor(
            (duration % (1000 * 3600 * 24)) / (1000 * 3600)
          );
          const minutes = Math.floor(
            ((duration % (1000 * 3600 * 24)) % (1000 * 3600)) / (1000 * 60)
          );
          // console.log("created At: ", days, hours, minutes);
          //
          item.remainingTime =
            days + " days " + hours + " hours " + minutes + " minutes ";
          timeAuctionData.push(item);
        } else {
          buyNowData.push(item);
        }
      })
    );
    // console.log("data: ", data);
    // console.log("buy now: ", buyNowData);
    // console.log("time auction: ", timeAuctionData);
    setIsSeperated(true);
  }
  if (!isSeperated) {
    return null;
  }
  return (
    <section>
      <div>
        <SingleCollectionHead
          key={collectionData._id}
          collectionData={collectionData}
        />
        <Container>
          <Tabs
            defaultActiveKey="Buy Now"
            id="uncontrolled-tab-example"
            className="mb-3 mt-5 justify-content-center"
          >
            <Tab eventKey="Buy Now" title="Buy Now">
              <NFTList
                sellType="Buy Now"
                key={collectionData._id}
                collectionData={collectionData}
                NFTData={buyNowData}
              />
            </Tab>

            <Tab eventKey="In Auction" title="In Auction">
              <NFTList
                sellType="In Auction"
                key={collectionData._id}
                collectionData={collectionData}
                NFTData={timeAuctionData}
              />
            </Tab>
          </Tabs>
        </Container>
      </div>
    </section>
  );
}

export default SingleCollection;
