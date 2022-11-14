import config from '../../config.json';
import axios from "axios";

//API endpoint
const APIEndpoint = config.DOMAIN_NAME + '/admin';
const token = JSON.parse(localStorage.getItem("token"));
const header = {Authorization: `Bearer ${token}`};

const getAdminDetails = (walletAddress) => {
    // console.log(`in user services ${walletAddress}`);
    return axios.get(APIEndpoint + `/admin-details?walletAddress=${walletAddress}`, {
        params: {
            walletAddress: walletAddress
        }
    });
}

const updateAdminDetails = (formData) => {
    console.log(`in admin services ${formData}`);
    return axios({
      method: "post",
      headers: header,
      url: APIEndpoint + "/update-admin-details",
      data: formData,
      // headers: {
      //   Authorization: `Bearer ${token.getAccessToken()}`,
      //   content_type: 'multipart/form-data',
      // },
    });
  };

export default {
    getAdminDetails,
    updateAdminDetails,
}