import config from "../config";
import axios from "axios";

//API endpoint
const APIEndpoint = config.DOMAIN_NAME + "/admin";

const addAdmin = async (data) => {
  return axios({
    method: "post",
    url: APIEndpoint + "/add-admin",
    data: {
      name: data["name"],

      walletaddress: data["walletaddress"],
      email: data["email"],
      mobilenumber: data["mobilenumber"],
      DOB: data["DOB"],
    },
  });
};

const getAdmins = async () => {
  return axios({
    method: "get",
    url: APIEndpoint + "/get-all-admins",
  });
};

export default {
  addAdmin,
  getAdmins,
};
