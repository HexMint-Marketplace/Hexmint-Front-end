import config from "../../config.json";
import axios from "axios";


const token = JSON.parse(localStorage.getItem("token"));
const header = {Authorization: `Bearer ${token}`};

//API endpoint
const APIEndpoint = config.DOMAIN_NAME + "/customer";

const getCustomers = async () => {
  return axios({
    method: "get",
    headers: header,
    url: APIEndpoint + "/get-all-customers",
  });
};

const getBlockedCustomers = async () => {
  return axios({
    method: "get",
    headers: header,
    url: APIEndpoint + "/get-all-blocked-users",
  });
};

const getReports = async () => {
  return axios({
    method: "get",
    headers: header,
    url: APIEndpoint + "/get-reports",
  });
};

const deleteReport = async (id) => {
  return axios({
    method: "delete",
    headers: header,
    url: APIEndpoint + `/delete-report/${id}`,
  });
};

const updateUserDetails = async (formData) => {
  console.log(`in customer services ${formData}`);
  return axios({
    method: "post",
    headers: header,
    url: APIEndpoint + "/update-details",
    data: formData,
  });
};

const createCollection = async (formData) => {
  console.log(`in customer services ${formData}`);
  return axios({
    method: "post",
    headers: header,
    url: APIEndpoint + "/create-collection",
    data: formData,
  });
};

const unBlockUser = async (id) => {
  return axios({
    method: "delete",
    headers: header,
    url: APIEndpoint + `/unblock-user/${id}`,
  });
};

const blockUser = async (id) => {
  return axios({
    method: "post",
    headers: header,
    url: APIEndpoint + `/block-user/${id}`,
  });
};

const getAllCollections = async () => {
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
