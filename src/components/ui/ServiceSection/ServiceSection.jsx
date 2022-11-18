import React from "react";
import { Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import "./ServiceSection.css";
import { useAccount, useConnect, useEnsName } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import { toast } from "react-toastify";

function ServiceSection() {
  const { address, isConnected } = useAccount();
  const { data: ensName } = useEnsName({ address });
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });
  return (
    <section>
      <Container>
        <Row>
          <Col lg="12" className="mb-4">
            <h3 className="service_title">Create and Sell your NFTS</h3>
          </Col>

          <Col lg="3" md="4" sm="6" className="mb-3">
            <div className="single_service">
              <div
                data-testid="walletconnect_txt"
                className="single_service_content"
              >
                {isConnected ? (
                  <h5>
                    <Link to="">Connect Your Wallet</Link>
                  </h5>
                ) : (
                  <h5>
                    {isConnected && <Link to="">Connect Your Wallet</Link>}
                    {!isConnected && (
                      <Link
                        onClick={() =>
                          toast.info(
                            "Use the connect 'wallet button' in top of the page"
                          )
                        }
                        to=""
                      >
                        Connect Your Wallet
                      </Link>
                    )}
                  </h5>
                )}

                <p className="mt-3">
                  To connect your crypto wallet to an HeXmint NFT marketplace,
                  firstly you must have a Metamsk account. Just install MetaMask
                  and follow the steps
                </p>
              </div>
            </div>
          </Col>

          <Col lg="3" md="4" sm="6" className="mb-3">
            <div className="single_service">
              <div className="single_service_content">
                {isConnected && (
                  <h5>
                    <Link to="/seller-profile">Create Your Collection</Link>
                  </h5>
                )}
                {!isConnected && (
                  <h5>
                    <Link
                      onClick={() =>
                        toast.info("You have to connect your wallet first")
                      }
                      to=""
                    >
                      Create Your Collection
                    </Link>
                  </h5>
                )}
                <p className="mt-3">
                  An NFT collection is an assortment of digital assets released
                  by an artist containing a limited number of individual NFTs.
                </p>
              </div>
            </div>
          </Col>

          <Col lg="3" md="4" sm="6" className="mb-3">
            <div className="single_service">
              <div className="single_service_content">
                {isConnected && (
                  <h5>
                    <Link to="/create">Mint Your NFTs</Link>
                  </h5>
                )}
                {!isConnected && (
                  <h5>
                    <Link
                      onClick={() =>
                        toast.info("You have to connect your wallet first")
                      }
                      to=""
                    >
                      Mint Your NFTs
                    </Link>
                  </h5>
                )}

                <p className="mt-3">
                  Minting an NFT, or non-fungible token, is publishing a unique
                  digital asset on a blockchain so that it can be bought, sold,
                  and traded.
                </p>
              </div>
            </div>
          </Col>

          <Col lg="3" md="4" sm="6" className="mb-3">
            <div className="single_service">
              <div className="single_service_content">
                {isConnected && (
                  <h5>
                    <Link to="/seller-profile">List Your NFTs</Link>
                  </h5>
                )}
                {!isConnected && (
                  <h5>
                    <Link
                      onClick={() =>
                        toast.info("You have to connect your wallet first")
                      }
                      to=""
                    >
                      List Your NFTs
                    </Link>
                  </h5>
                )}

                <p className="mt-3">Wanna sell your NFT? It is important to
                  note that listing your NFT on the marketplace is a primary
                  requirement to sell it to customers across the globe.
                </p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default ServiceSection;
