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

export default {
  updateUserDetails,
  getCustomers,
  createCollection,
  getAllCollections,
};
