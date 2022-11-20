import config from "../../config.json";
import axios from "axios";
import Token from "../Token";

//API endpoint
const APIEndpoint = config.DOMAIN_NAME + "/customer";

const getCustomers = async () => {
  return axios({
    method: "get",
    headers: { Authorization: `Bearer ${Token.getAccessToken()}` },
    url: APIEndpoint + "/get-all-customers",
  });
};

const getBlockedCustomers = async () => {
  return axios({
    method: "get",
    headers: { Authorization: `Bearer ${Token.getAccessToken()}` },
    url: APIEndpoint + "/get-all-blocked-users",
  });
};

const getReports = async () => {
  return axios({
    method: "get",
    headers: { Authorization: `Bearer ${Token.getAccessToken()}` },
    url: APIEndpoint + "/get-reports",
  });
};

const deleteReport = async (id) => {
  return axios({
    method: "delete",
    headers: { Authorization: `Bearer ${Token.getAccessToken()}` },
    url: APIEndpoint + `/delete-report/${id}`,
  });
};

const updateUserDetails = async (formData) => {
  return axios({
    method: "post",
    headers: { Authorization: `Bearer ${Token.getAccessToken()}` },
    url: APIEndpoint + "/update-details",
    data: formData,
  });
};

const createCollection = async (formData) => {
  return axios({
    method: "post",
    headers: { Authorization: `Bearer ${Token.getAccessToken()}` },
    url: APIEndpoint + "/create-collection",
    data: formData,
  });
};

const unBlockUser = async (id) => {
  return axios({
    method: "delete",
    headers: { Authorization: `Bearer ${Token.getAccessToken()}` },
    url: APIEndpoint + `/unblock-user/${id}`,
  });
};

const blockUser = async (id) => {
  return axios({
    method: "post",
    headers: { Authorization: `Bearer ${Token.getAccessToken()}` },
    url: APIEndpoint + `/block-user/${id}`,
  });
};

const getAllCollections = async () => {
  return axios({
    method: "get",
    url: APIEndpoint + "/get-collection-count",
  });
};

const saveUserActivity = async (
  activityType,
  transaction,
  tokenID,
  transactionTime
) => {
  return axios({
    method: "post",
    headers: { Authorization: `Bearer ${Token.getAccessToken()}` },
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
  return axios({
    method: "get",
    headers: { Authorization: `Bearer ${Token.getAccessToken()}` },
    url: APIEndpoint + `/get-user-activity-details/${walletAddress}`,
    params: {
      walletAddress: walletAddress,
    },
  });
};

const getCollectionName = async (collectionID) => {
  return axios({
    method: "post",
    url: APIEndpoint + "/get-collection-name",
    data: {
      collectionID: collectionID,
    },
  });
};

const getCustomerDetailsFromWalletAddress = async (walletaddress) => {
  return axios({
    method: "get",
    headers: { Authorization: `Bearer ${Token.getAccessToken()}` },
    url:
      APIEndpoint +
      `/get-customer-details-from-wallet-address/${walletaddress}`,
  });
};

const reportSeller = async (sellerWalletAddress, reason, ViewerAddress) => {
  return axios({
    method: "post",
    headers: { Authorization: `Bearer ${Token.getAccessToken()}` },
    url: APIEndpoint + "/report-seller",
    data: {
      sellerWalletAddress: sellerWalletAddress,
      reason: reason,
      ViewerAddress: ViewerAddress,
    },
  });
};

const getIsBlocked = async (address) => {
  return axios({
    method: "get",
    url: APIEndpoint + `/get-blocked-users-status/${address}`,
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
  getCollectionName,
  getCustomerDetailsFromWalletAddress,
  reportSeller,
  getIsBlocked,
};
