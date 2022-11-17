import React from "react";

import { Container, Row, Col } from "reactstrap";
import "./footer.css";

import { Link } from "react-router-dom";
import { useAccount, useConnect, useEnsName } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import { toast } from "react-toastify";

const Basic_Navs = [
  {
    display: "Home",
    url: "/home",
  },
  {
    display: "Explore",
    url: "/explore",
  },
  {
    display: "Create",
    url: "/create",
  },
  {
    display: "Contact",
    url: "/contact",
  },
  {
    display: "Connect Wallet",
    url: "/wallet",
  },
];

const Footer = () => {
  const { address, isConnected } = useAccount();
  const { data: ensName } = useEnsName({ address });
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });
  return (
    <footer className="footer">
      <Container>
        <Row>
          <Col lg="6" md="6" sm="6" className="mb-2">
            <Link to={"/home"} className="text-decoration-none">
              <div className="logo">
                <h2 className=" d-flex gap-2 align-items-center ">
                  <span>
                    <i className="ri-fire-fill"></i>
                  </span>
                  HeXmint
                </h2>
              </div>
            </Link>
          </Col>

          <Col lg="1" md="1" sm="6" className="mb-2">
            <div className="list__group">
              <div className="list__item">
                <Link to={"/home"}>{"Home"}</Link>
              </div>
            </div>
          </Col>

          <Col lg="1" md="1" sm="6" className="mb-2">
            <div className="list__group">
              <div className="list__item">
                <Link to={"/explore"}>{"Explore"}</Link>
              </div>
            </div>
          </Col>

          <Col lg="1" md="1" sm="6" className="mb-2">
            <div className="list__group">
              <div className="list__item">
                {isConnected && <Link to={"/create"}>{"Create"}</Link>}
                {!isConnected && (
                  <Link
                    onClick={() =>
                      toast.info("You have to connect your wallet first")
                    }
                    to=""
                  >
                    {"Create"}
                  </Link>
                )}
              </div>
            </div>
          </Col>

          {/* <Col lg="1" md="1" sm="6" className="mb-2">
            <div className="list__group">
                    <div className="list__item">
                        <Link to={'/contact'}>{'Contact'}</Link>
                    </div>
            </div>
          </Col> */}

          <Col lg="2" md="2" sm="6" className="mb-2">
            <div className="list__group">
              <div className="list__item">
                {isConnected && <Link to="">{"Connect Wallet"}</Link>}
                {!isConnected && (
                  <Link
                    onClick={() =>
                      toast.info("You have to connect your wallet first")
                    }
                    to=""
                  >
                    {"Connect Wallet"}
                  </Link>
                )}
              </div>
            </div>
          </Col>

          <Col lg="12" className=" mt-4 text-center">
            <p className="copyright">@NFT-2022</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
