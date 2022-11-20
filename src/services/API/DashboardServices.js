import config from "../../config.json";
import axios from "axios";
import Token from "../Token";

//API endpoint
const APIEndpoint = config.DOMAIN_NAME + "/dashboard";

//activity type : "minted" or "bought"
const getNFTCount = (activityType) => {
  return axios.get(APIEndpoint + `/get-nft-count/${activityType}`, {
    headers: { Authorization: `Bearer ${Token.getAccessToken()}` },
  });
};

//balance type : "bought" or "profit"
const getBalance = (balanceType) => {
  return axios.get(APIEndpoint + `/get-balance/${balanceType}`, {
    headers: { Authorization: `Bearer ${Token.getAccessToken()}` },
  });
};

//user type : "creator" or "seller" or "buyer"
const getTopUsers = (userType) => {
  return axios.get(APIEndpoint + `/get-top-users/${userType}`, {});
};

const getTotalBalance = () => {
  return axios.get(APIEndpoint + `/get-total-balance`, {
    headers: { Authorization: `Bearer ${Token.getAccessToken()}` },
  });
};

export default {
  getNFTCount,
  getBalance,
  getTopUsers,
  getTotalBalance,
};
