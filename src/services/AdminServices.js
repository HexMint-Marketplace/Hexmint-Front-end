import config from "../config";
import axios from "axios";

//API endpoint
const APIEndpoint = config.DOMAIN_NAME + "/admin";

const deleteAdmin = async (id) => {
  const token = JSON.parse(localStorage.getItem("token"));
  const header = { Authorization: `Bearer ${token}` };
  return axios({
    method: "delete",
    headers: header,
    url: APIEndpoint + `/delete-admin/${id}`,
  });
};

const approveRequest = async (id) => {
  const token = JSON.parse(localStorage.getItem("token"));
  const header = { Authorization: `Bearer ${token}` };
  return axios({
    method: "post",
    headers: header,
    url: APIEndpoint + `/approve-request/${id}`,
  });
};

const declineRequest = async (id) => {
  const token = JSON.parse(localStorage.getItem("token"));
  const header = { Authorization: `Bearer ${token}` };
  return axios({
    headers: header,
    method: "delete",
    url: APIEndpoint + `/decline-request/${id}`,
  });
};

const addAdmin = async (data) => {
  const token = JSON.parse(localStorage.getItem("token"));
  const header = { Authorization: `Bearer ${token}` };
  return axios({
    method: "post",
    headers: header,
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
  const token = JSON.parse(localStorage.getItem("token"));
  const header = { Authorization: `Bearer ${token}` };
  return axios({
    method: "get",
    headers: header,
    url: APIEndpoint + "/get-all-admins",
  });
};

const getAdminRequests = async () => {
  const token = JSON.parse(localStorage.getItem("token"));
  const header = { Authorization: `Bearer ${token}` };
  return axios({
    method: "get",
    headers: header,
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
