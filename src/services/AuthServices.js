import config from "../config.json";
import axios from "axios";
import jwt_decode from "jwt-decode";

const JWTDecodeUserType  = () => {
  //If token not found, return null
  console.log("in jwt decode user type before gettign token");
  const token = localStorage.getItem("token");
  console.log("token is.................in authservices.",token);
  if (!token) return null;
  try{
  const decoded = jwt_decode(token);
  return decoded.usertype;
  }catch(err){
    console.log(err);
  }
}

const JWTDecodeWalletAddress  = () => {
  //If token not found, return null
  const token = JSON.parse(localStorage.getItem("token"));
  if (!token) return null;
  try{
  const decoded = jwt_decode(token);
  console.log("decoded wallet address is..................",decoded.walletaddress);
  const walletaddress = decoded.walletaddress;
  return walletaddress;
  }catch(err){
    console.log(err);
  }
}



//API endpoint
const APIEndpoint = config.DOMAIN_NAME + '/auth';

//Connect to API
const connectwallet = async(data) => {
  console.log(`in authservices ${data}`);

  return axios({
    method: "post",
    url: APIEndpoint + '/connect-wallet',
    data: {
      walletaddress : data
    },

  });

};

export default {
  connectwallet,
  JWTDecodeUserType,
  JWTDecodeWalletAddress,
}