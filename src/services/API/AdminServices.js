import config from "../../config.json";
import axios from "axios";
import Token from "../Token";

const APIEndpoint = config.DOMAIN_NAME + "/admin";

const updateAdminDetails = (formData) => {
  return axios({
    method: "post",
    url: APIEndpoint + "/update-admin-details",
    data: formData,
    headers: { Authorization: `Bearer ${Token.getAccessToken()}` },
  });
};

export default {
  updateAdminDetails,
};
