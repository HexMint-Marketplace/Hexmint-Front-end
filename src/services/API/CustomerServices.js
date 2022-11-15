import config from "../../config.json";
import axios from "axios";




//API endpoint
const APIEndpoint = config.DOMAIN_NAME + "/customer";

const getCustomers = async () => {
  const token = JSON.parse(localStorage.getItem("token"));
  const header = {Authorization: `Bearer ${token}`};
  console.log("In get customer method in service header........",header);
  return axios({
    method: "get",
    headers: header,
    url: APIEndpoint + "/get-all-customers",
  });
};

const getBlockedCustomers = async () => {
  const token = JSON.parse(localStorage.getItem("token"));
  const header = {Authorization: `Bearer ${token}`};
  return axios({
    method: "get",
    headers: header,
    url: APIEndpoint + "/get-all-blocked-users",
  });
};

const getReports = async () => {
  const token = JSON.parse(localStorage.getItem("token"));
  const header = {Authorization: `Bearer ${token}`};
  return axios({
    method: "get",
    headers: header,
    url: APIEndpoint + "/get-reports",
  });
};

const deleteReport = async (id) => {
  const token = JSON.parse(localStorage.getItem("token"));
  const header = {Authorization: `Bearer ${token}`};
  return axios({
    method: "delete",
    headers: header,
    url: APIEndpoint + `/delete-report/${id}`,
  });
};

const updateUserDetails = async (formData) => {
  const token = JSON.parse(localStorage.getItem("token"));
  const header = {Authorization: `Bearer ${token}`};
  console.log(`in customer services ${formData}`);
  return axios({
    method: "post",
    headers: header,
    url: APIEndpoint + "/update-details",
    data: formData,
  });
};

const createCollection = async (formData) => {
  const token = JSON.parse(localStorage.getItem("token"));
  const header = {Authorization: `Bearer ${token}`};
  console.log(`in customer services ${formData}`);
  return axios({
    method: "post",
    headers: header,
    url: APIEndpoint + "/create-collection",
    data: formData,
  });
};

const unBlockUser = async (id) => {
  const token = JSON.parse(localStorage.getItem("token"));
  const header = {Authorization: `Bearer ${token}`};
  return axios({
    method: "delete",
    headers: header,
    url: APIEndpoint + `/unblock-user/${id}`,
  });
};

const blockUser = async (id) => {
  const token = JSON.parse(localStorage.getItem("token"));
  const header = {Authorization: `Bearer ${token}`};
  return axios({
    method: "post",
    headers: header,
    url: APIEndpoint + `/block-user/${id}`,
  });
};

const getAllCollections = async () => {
  const token = JSON.parse(localStorage.getItem("token"));
  const header = {Authorization: `Bearer ${token}`};
  return axios({
    method: "get",
    headers: header,
    url: APIEndpoint + "/get-collection-count",
  });
};

const saveUserActivity = async (
  activityType,
  transaction,
  tokenID,
  transactionTime
) => {
  console.log("in customer services and token is",token);
  console.log(
    `in customer services ${activityType} and transaction ${transaction} and transactionTime ${transactionTime}`
  );
  const token = JSON.parse(localStorage.getItem("token"));
  const header = {Authorization: `Bearer ${token}`};
  return axios({
    method: "post",
    headers: header,
    url: APIEndpoint + "/save-user-activity",
    data: {
      activityType: activityType,
      transaction: transaction,
      tokenID: tokenID,
      transactionTime: transactionTime,
    },
  });
};

const getUserActivityDetails = async (walletAddress) => {
  console.log(`in customer services ${walletAddress}`);
  const token = JSON.parse(localStorage.getItem("token"));
  const header = {Authorization: `Bearer ${token}`};
  return axios({
    method: "get",
    headers: header,
    url: APIEndpoint + `/get-user-activity-details/${walletAddress}`,
    params: {
      walletAddress: walletAddress,
    },
  });
};

const getCollectionName = async (collectionID) => {
  console.log(`in customer services ${collectionID}`);
  const token = JSON.parse(localStorage.getItem("token"));
  const header = {Authorization: `Bearer ${token}`};
  return axios({
    method: "post",
    headers: header,
    url: APIEndpoint + "/get-collection-name",
    data: {
      collectionID: collectionID,
    },
  });
};


export default {
  updateUserDetails,
  getCustomers,
  createCollection,
  getAllCollections,
  getUserActivityDetails,
  saveUserActivity,
  blockUser,
  getBlockedCustomers,
  unBlockUser,
  getReports,
  deleteReport,
  getCollectionName
};
