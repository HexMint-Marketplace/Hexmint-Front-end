import config from "../../config.json";
import axios from "axios";
import { ApiTwoTone } from "@mui/icons-material";

//API endpoint
const APIEndpoint = config.DOMAIN_NAME + "/customer";

const getCustomers = async () => {
  return axios({
    method: "get",
    url: APIEndpoint + "/get-all-customers",
  });
};

const updateUserDetails = async (formData) => {
  console.log(`in customer services ${formData}`);
  return axios({
    method: "post",
    url: APIEndpoint + "/update-details",
    data: formData,
    // headers: {
    //   Authorization: `Bearer ${token.getAccessToken()}`,
    //   content_type: 'multipart/form-data',
    // },
  });
};
export default {
  updateUserDetails,
  getCustomers,
};
