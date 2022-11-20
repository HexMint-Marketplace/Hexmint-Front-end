import jwtDecode from "jwt-decode";
import { toast } from "react-toastify";

const setAccessToken = (value) => {
  localStorage.setItem("token", value);
};

const getAccessToken = () => {
  return localStorage.getItem("token");
};

const removeAccessToken = () => {
  localStorage.removeItem("token");
};

const getDecodedAccessTokenExp = () => {
  const token = getAccessToken();
  if (!token) {
    return null;
  }
  const decoded = jwtDecode(token);
  return decoded.exp;
};

const JWTDecodeUserType = () => {
  //If token not found, return null

  const token = getAccessToken();

  if (!token) return null;
  try {
    const decoded = jwtDecode(token);
    return decoded.usertype;
  } catch (err) {
    toast.error("Error in decoding token");
  }
};

const JWTDecodeWalletAddress = () => {
  //If token not found, return null
  const token = getAccessToken();
  if (!token) return null;
  try {
    const decoded = jwtDecode(token);
    const walletaddress = decoded.walletaddress;
    return walletaddress;
  } catch (err) {
    toast.error("Error in decoding token");
  }
};

export default {
  setAccessToken,
  getAccessToken,
  removeAccessToken,
  getDecodedAccessTokenExp,
  JWTDecodeUserType,
  JWTDecodeWalletAddress,
};
