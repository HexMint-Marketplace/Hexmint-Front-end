import jwtDecode from "jwt-decode";

const setAccessToken = (value) => {
  localStorage.setItem("token", value);
  console.log("token set in local storage");
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
    console.log(err);
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
    console.log(err);
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
