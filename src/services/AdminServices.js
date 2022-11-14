import config from "../config";
import axios from "axios";

//API endpoint
const APIEndpoint = config.DOMAIN_NAME + "/admin";
const token = JSON.parse(localStorage.getItem("token"));
const header = {Authorization: `Bearer ${token}`};

const deleteAdmin = async (id) => {
  return axios({
    method: "delete",
    url: APIEndpoint + `/delete-admin/${id}`,
  });
};

const approveRequest = async (id) => {
  return axios({
    method: "post",
    url: APIEndpoint + `/approve-request/${id}`,
  });
};

const declineRequest = async (id) => {
  return axios({
    method: "delete",
    url: APIEndpoint + `/decline-request/${id}`,
  });
};

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

const getAdminRequests = async () => {
  return axios({
    method: "get",
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
