import { useAccount, useConnect, useEnsName } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ConnectWallet from "../components/ui/ConnectWallet/ConnectWallet";
import AuthServices from "./AuthServices";
import Token from "./Token";

const creatingNewToken = async (address) => {
  // const { address, isConnected } = useAccount();
  // const { data: ensName } = useEnsName({ address });
  // const { connect } = useConnect({
  //   connector: new InjectedConnector(),
  // });

  const response = await AuthServices.connectwallet({ address });
  const JWTData = response.data.JWTData;

  const token = JWTData.token;
  console.log("token is created at the connectiong services", token);
  Token.setAccessToken(token);

  const JWTDecodeUserType = Token.JWTDecodeUserType();
  console.log("JWTDecodeUserType is in authservices", JWTDecodeUserType);
  return JWTDecodeUserType;
  // if ( Token.getAccessToken !== null) {

  //   const JWTuserttype = await AuthServices.JWTDecodeUserType();
  //   setuserType(JWTuserttype);

  //   if (JWTuserttype === "Admin") {
  //     console.log(JWTData.usertype);
  //     navigate("/nadmin-dashboard");
  //   } else if (JWTuserttype === "Super Admin") {
  //     console.log(JWTuserttype);
  //     navigate("/sadmin-dashboard");
  //   } else {
  //     navigate("/home");
  //   }
  // } else {
  //   toast.error("Error in connecting wallet");
  //   navigate("/home");
  // }
};

export default {
  creatingNewToken,
};
