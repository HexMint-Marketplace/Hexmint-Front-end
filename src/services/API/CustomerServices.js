import config from "../../config.json";
import axios from "axios";


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

  });
};

const createCollection = async (formData) => {
  console.log(`in customer services ${formData}`);
  return axios({
    method: "post",
    url: APIEndpoint + "/create-collection",
    data: formData,

  });
};

const getAllCollections = async () => {
  return axios({
    method: "get",
    url: APIEndpoint + "/get-collection-count",
  });
};

const saveUserActivity = async (activityType, transaction,tokenID, transactionTime) => {
  console.log(`in customer services ${activityType} and transaction ${transaction} and transactionTime ${transactionTime}`);
  return axios({
    method: "post",
    url: APIEndpoint + "/save-user-activity",
    data: {
      activityType: activityType,
      transaction: transaction,
      tokenID : tokenID,
      transactionTime: transactionTime,
    },
  });
}

const getUserActivityDetails = async (walletAddress) => {
  console.log(`in customer services ${walletAddress}`);
  return axios({
    method: "get",
    url: APIEndpoint + "/get-user-activity-details",
    params: {
      walletAddress: walletAddress,
    },
  });
};


export default {
  updateUserDetails,
  getCustomers,
  createCollection,
  getAllCollections,
  getUserActivityDetails,
  saveUserActivity
};
