import config from "../../config.json";
import axios from "axios";

//API endpoint
const APIEndpoint = config.DOMAIN_NAME + "/user";


// const getUserType = (walletAddress) => {
//     console.log(`in user services ${walletAddress}`);
//     return axios.get(APIEndpoint + `/user-type?walletAddress=${walletAddress}`, {
//         params: {
//             walletAddress: walletAddress
//         }
//     });
// }

const getUserDetailsFromWalletAddress = (walletAddress) => {
  console.log("in get user  details from wallet ...... sevices",token);
  const token = JSON.parse(localStorage.getItem("token"));
  const header = { Authorization: `Bearer ${token}` };
  return axios.get(
    APIEndpoint +
      `/user-details-from-walletaddress?walletAddress=${walletAddress}`,
    {
      headers: header,
      params: {
        walletAddress: walletAddress,
      },
    }
  );
};

const getUserDetailsFromUserId = (userid) => {
  // console.log(`in user services ${userid}`);
  const token = JSON.parse(localStorage.getItem("token"));
  const header = { Authorization: `Bearer ${token}` };
  return axios.get(APIEndpoint + `/user-details-from-userid?userid=${userid}`, {
    headers: header,
    params: {
      userid: userid,
    },
  });
};

export default {
  getUserDetailsFromWalletAddress,
  getUserDetailsFromUserId,
};
