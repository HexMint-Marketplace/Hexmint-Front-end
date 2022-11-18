import config from "../config";
import axios from "axios";
import Token from "./Token";

//API endpoint
const APIEndpoint = config.DOMAIN_NAME + "/admin";

const deleteAdmin = async (id) => {
  return axios({
    method: "delete",
    headers: { Authorization: `Bearer ${Token.getAccessToken()}` },
    url: APIEndpoint + `/delete-admin/${id}`,
  });
};

const approveRequest = async (id) => {
  return axios({
    method: "post",
    headers: { Authorization: `Bearer ${Token.getAccessToken()}` },
    url: APIEndpoint + `/approve-request/${id}`,
  });
};

const declineRequest = async (id) => {
  return axios({
    headers: { Authorization: `Bearer ${Token.getAccessToken()}` },
    method: "delete",
    url: APIEndpoint + `/decline-request/${id}`,
  });
};

const addAdmin = async (data) => {
  return axios({
    method: "post",
    headers: { Authorization: `Bearer ${Token.getAccessToken()}` },
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
    headers: { Authorization: `Bearer ${Token.getAccessToken()}` },
    url: APIEndpoint + "/get-all-admins",
  });
};

const getAdminRequests = async () => {
  return axios({
    method: "get",
    headers: { Authorization: `Bearer ${Token.getAccessToken()}` },
    url: APIEndpoint + "/get-admin-requests",
  });
};

export default {
  addAdmin,
  getAdmins,
  deleteAdmin,
  getAdminRequests,
  approveRequest,
  declineRequest,
};
