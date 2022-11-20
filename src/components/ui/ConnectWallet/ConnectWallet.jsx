import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row } from "reactstrap";
import ConnectingServices from "../../../services/ConnectingServices";
import "../ConnectWallet/connectWallet.css";
import { useAccount, useConnect, useEnsName } from "wagmi";

function ConnectWallet(props) {
  //Wagmi Hooks
  const { address } = useAccount();
  const { data: ensName } = useEnsName({ address });
  const { connector: activeConnector, isConnected } = useAccount();
  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect();
  const navigate = useNavigate();

  useEffect(() => {
    if (isConnected) {
      handleConnect();
    }
  }, [isConnected]);

  const handleConnect = async () => {
    const JWTUserType = await ConnectingServices.creatingNewToken(address);
    props.setUserType(JWTUserType);
    if (JWTUserType === "Admin") {
      navigate("/nadmin-dashboard");
    } else if (JWTUserType === "Super Admin") {
      navigate("/sadmin-dashboard");
    } else if (JWTUserType === "Customer") {
      navigate("/home");
    } else {
      navigate("/home");
    }
  };

  return (
    <>
      <div className="overlay"></div>
      <div className="connect-wallet-wrap text-center">
        <Container>
          <Row className="text-end">
            <button
              className="button-close mb-3 "
              onClick={() => props.setshowConnectWallet(false)}
            >
              Close
            </button>
          </Row>
          {connectors.map((connector) => (
            <Row>
              <button
                className="btn button-connect mb-3"
                disabled={!connector.ready}
                key={connector.id}
                onClick={() => connect({ connector })}
              >
                {connector.name}
                {!connector.ready && " (unsupported)"}
                {isLoading &&
                  connector.id === pendingConnector?.id &&
                  " (connecting)"}
              </button>
            </Row>
          ))}

          {error && <div>{error.message}</div>}
        </Container>
      </div>
    </>
  );
}

export default ConnectWallet;
