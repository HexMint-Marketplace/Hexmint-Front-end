import config from "../../config.json";
import axios from "axios";
import Token from "../Token";

//API endpoint
const APIEndpoint = config.DOMAIN_NAME + "/user";

const getUserDetailsFromWalletAddress = (walletAddress) => {
  return axios.get(
    APIEndpoint +
      `/user-details-from-walletaddress?walletAddress=${walletAddress}`,
    {
      headers: { Authorization: `Bearer ${Token.getAccessToken()}` },
      params: {
        walletAddress: walletAddress,
      },
    }
  );
};

const getUserDetailsFromUserId = (userid) => {
  return axios.get(APIEndpoint + `/user-details-from-userid?userid=${userid}`, {
    params: {
      userid: userid,
    },
  });
};

const getTimeAuctionDetails = (tokenId) => {
  return axios.get(APIEndpoint + `/time-auction-details`, {
    params: {
      tokenId: tokenId,
    },
  });
};

export default {
  getUserDetailsFromWalletAddress,
  getUserDetailsFromUserId,
  getTimeAuctionDetails,
};
