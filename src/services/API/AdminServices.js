import config from "../../config.json";
import axios from "axios";
import Token from "../Token";

//API endpoint
const APIEndpoint = config.DOMAIN_NAME + "/admin";

const updateAdminDetails = (formData) => {
  console.log(`in admin services ${formData}`);
  return axios({
    method: "post",
    url: APIEndpoint + "/update-admin-details",
    data: formData,
    headers: { Authorization: `Bearer ${Token.getAccessToken()}` },
  });
};

// const getAdminDetails = (walletAddress) => {
//   // console.log(`in user services ${walletAddress}`);
//   return axios.get(
//     APIEndpoint + `/admin-details?walletAddress=${walletAddress}`,
//     {
//       params: {
//         walletAddress: walletAddress,
//       },
//     }
//   );
// };

export default {
  updateAdminDetails,
};
