import React from "react";

import { Container, Row, Col} from "reactstrap";
import "./footer.css";

import { Link } from "react-router-dom";
import { useAccount, useConnect, useEnsName } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";


const Basic_Navs = [
    {
        display : 'Home',
        url : '/home'
    },
    {
        display : 'Explore',
        url : '/explore'
    },
    {
        display : 'Create',
        url : '/create'
    },
    {
        display : 'Contact',
        url : '/contact'
    },
    {
        display : 'Connect Wallet',
        url : '/wallet'
    }
]


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
            <div className="logo">
              <h2 className=" d-flex gap-2 align-items-center ">
                <span>
                  <i class="ri-fire-fill"></i>
                </span>
                NFTs
              </h2>
              <p>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Voluptate, quod repellat! Quis quos dolorum tenetur fuga?
                Aspernatur rerum quae amet.
              </p>
            </div>
          </Col>


          <Col lg="1" md="1" sm="6" className="mb-2">
            <div className="list__group">
                    <div className="list__item">
                        <Link to={'/home'}>{'Home'}</Link>
                    </div>
            </div>
          </Col>


          <Col lg="1" md="1" sm="6" className="mb-2">
            <div className="list__group">
                    <div className="list__item">
                        <Link to={'/explore'}>{'Explore'}</Link>
                    </div>
            </div>
          </Col>

          <Col lg="1" md="1" sm="6" className="mb-2">
            <div className="list__group">
              
                    <div className="list__item">
                    {isConnected ? (
                        <Link to={'/create'}>{'Create'}</Link>
                    ):(
                      <Link onClick={() => connect()} to=''>{'Create'}</Link>
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
                    {isConnected ? (
                        <Link to=''>{'Connect Wallet'}</Link>
                    ):(
                      <Link onClick={() => connect()} to=''>{'Connect Wallet'}</Link>
                    )}
                    </div>
            </div>
          </Col>

          <Col lg="12" className=" mt-4 text-center">
            <p className="copyright">
              @NFT-2022
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer ;