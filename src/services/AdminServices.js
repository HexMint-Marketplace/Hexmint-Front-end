import config from "../config";
import axios from "axios";

//API endpoint
const APIEndpoint = config.DOMAIN_NAME + "/admin";

const addAdmin = async () => {
  return axios({
    method: "post",
    url: APIEndpoint + "/add-admin",
  });
};

export default {
  addAdmin,
};
