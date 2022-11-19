import config from "../../config.json";
import axios from "axios";
import Token from "../Token";

//API endpoint
const APIEndpoint = config.DOMAIN_NAME + "/dashboard";

//activity type : "minted" or "listed"
const getNFTCount = (activityType) => {
  return axios.get(APIEndpoint + `/get-nft-count`, {
    headers: { Authorization: `Bearer ${Token.getAccessToken()}` },
    data: {
      activityType: activityType,
    },
  });
};

//balance type : "bought" or "profit"
const getBalance = (balanceType) => {
  return axios.get(APIEndpoint + `/get-balance`, {
    headers: { Authorization: `Bearer ${Token.getAccessToken()}` },
    data: {
      balanceType: balanceType,
    },
  });
};

//user type : "creator" or "seller" or "buyer"
const getTopUsers = (userType) => {
  return axios.get(APIEndpoint + `/get-top-users`, {
    headers: { Authorization: `Bearer ${Token.getAccessToken()}` },
    data: {
      userType: userType,
    },
  });
};

export default {
  getNFTCount,
  getBalance,
  getTopUsers
};
