import { Container, Row } from "reactstrap";
import { useConnect } from "wagmi";
import "../ConnectWallet/connectWallet.css";

function ConnectWallet(props) {
  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect();

  return (
    <>
      <div className="overlay"></div>
      <div className="connect-wallet-wrap text-center">
        <Container>
          <button
            className="button-close btn mb-5 "
            onClick={() => props.setshowConnectWallet(false)}
          >
            Close
          </button>
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
