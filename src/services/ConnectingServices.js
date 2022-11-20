import AuthServices from "./AuthServices";
import Token from "./Token";

const creatingNewToken = async (address) => {
  const response = await AuthServices.connectwallet({ address });
  const JWTData = response.data.JWTData;

  const token = JWTData.token;

  Token.setAccessToken(token);

  const JWTDecodeUserType = Token.JWTDecodeUserType();

  return JWTDecodeUserType;
};

export default {
  creatingNewToken,
};
