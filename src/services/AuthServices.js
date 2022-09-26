import config from "../config";
import axios from "axios";

//API endpoint
const APIEndpoint = config.DOMAIN_NAME + '/auth';

const connectwallet = (data) => {
  console.log(`in authservices ${data}`);

  return axios({
    method: "post",
    url: APIEndpoint + '/connect-wallet',
    data: {
      walletaddress : data
    },
    // headers: {Authorization: `Bearer ${token.getAccessToken()}`}
  });
};

export default {
  connectwallet,
}