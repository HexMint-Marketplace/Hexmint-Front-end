import config from "../config.json";
import axios from "axios";
import jwt_decode from "jwt-decode";
import Token from "./Token";

const JWTDecodeUserType = () => {
  //If token not found, return null

  const token = Token.getAccessToken();

  if (!token) return null;
  try {
    const decoded = jwt_decode(token);
    return decoded.usertype;
  } catch (err) {
    console.log(err);
  }
};

const JWTDecodeWalletAddress = () => {
  //If token not found, return null
  const token = Token.getAccessToken();
  if (!token) return null;
  try {
    const decoded = jwt_decode(token);
    const walletaddress = decoded.walletaddress;
    return walletaddress;
  } catch (err) {
    console.log(err);
  }
};

//API endpoint
const APIEndpoint = config.DOMAIN_NAME + "/auth";

//Connect to API
const connectwallet = async (data) => {
  console.log(`in authservices ${data}`);

  return axios({
    method: "post",
    url: APIEndpoint + "/connect-wallet",
    data: {
      walletaddress: data,
    },
  });
};

export default {
  connectwallet,
  JWTDecodeUserType,
  JWTDecodeWalletAddress,
};
