import config from "../config.json";
import axios from "axios";

//API endpoint
const APIEndpoint = config.DOMAIN_NAME + "/auth";

//Connect to API
const connectwallet = async (data) => {
  return axios({
    method: "post",
    url: APIEndpoint + "/connect-wallet",
    data: {
      walletaddress: data,
    },
  });
};

export default {
  connectwallet,
};
