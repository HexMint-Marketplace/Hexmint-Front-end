import React, { useEffect, useState } from "react";
import "./header.css";
import { Container } from "reactstrap";
import { NavLink, Link } from "react-router-dom";
import { useAccount, useConnect, useEnsName } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import DehazeIcon from "@mui/icons-material/Dehaze";
import { useNavigate } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ConnectWallet from "../ui/ConnectWallet/ConnectWallet";
import { toast } from "react-toastify";
import ConnectingServices from "../../services/ConnectingServices";
import { useRef } from "react";
import Token from "../../services/Token";
import { useDisconnect } from "wagmi";
import Loader from "../ui/Loader/Loader";
import CustomerServices from "../../services/API/CustomerServices";

function Header() {
  const [toggleMenu, setToggleMenu] = useState(false);
  const [islogoutcalling, setIslogoutcalling] = useState(true);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const { disconnect } = useDisconnect();

  //Wagmi Hooks
  const { address, isConnected } = useAccount();
  const { data: ensName } = useEnsName({ address });
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });

  const [userType, setUserType] = useState();
  const [userAddress, setuserAddress] = useState("");
  const [showConnectWallet, setshowConnectWallet] = useState(false);

  const [fixedAddress, setfixedAddress] = useState(address);
  const prevFixedAddress = useRef();

  const getUserType = (Utype) => {
    setUserType(Utype);
  };

  useEffect(() => {
    handleLogout();
  });

  useEffect(() => {
    prevFixedAddress.current = fixedAddress;
    handleBlockedUsers();
    setTimeout(() => {
      if (isConnected) {
        handleConnect();
        setshowConnectWallet(false);

        //call handleconncect wallet function if the user is connected
      } else {
        navigate("/home");
      }
    }, 2000);
  }, [address]);

  const handleBlockedUsers = async () => {
    if (isConnected) {
      const response = await CustomerServices.getIsBlocked(address);
      const isBlocked = response.data.data;
      if (isBlocked) {
        toast.error("You are blocked by admin");
        disconnect();
      }
    }
  };

  const handleConnect = async () => {
    const JWTUserType = await ConnectingServices.creatingNewToken(address);
    setUserType(JWTUserType);
    if (address !== prevFixedAddress.current) {
      if (JWTUserType === "Admin") {
        navigate("/nadmin-dashboard");
      } else if (JWTUserType === "Super Admin") {
        navigate("/sadmin-dashboard");
      } else if (JWTUserType === "Customer") {
        navigate("/home");
      }
    }
  };

  const handleLogout = () => {
    if (isConnected) {
      const checkTokenExp = Token.getDecodedAccessTokenExp();
      if (checkTokenExp) {
        if (checkTokenExp * 1000 < Date.now()) {
          toast.error("Session Expired, Please Connect Wallet Again");
          setIslogoutcalling(false);
          disconnect();
          Token.removeAccessToken();
        }
      }
    }
  };

  useEffect(() => {
    const changeWidth = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", changeWidth);

    return () => {
      window.removeEventListener("resize", changeWidth);
    };
  }, [screenWidth]);

  return (
    <>
      <header className="header w-100">
        {loader ? (
          <Loader isLoading={loader} />
        ) : (
          <Container>
            <div className="navigation d-flex  align-items-center justify-content-between ">
              <NavLink to="/home" className="logo-navlink">
                <div className="logo">
                  <h2
                    data-testid="HeXmint_txt"
                    className="d-flex gap-2 align-items-center"
                  >
                    <span>
                      <i className="ri-zcool-fill"></i>
                    </span>
                    HeXmint
                  </h2>
                </div>
              </NavLink>

              <div className="nav_menu ">
                {(toggleMenu || screenWidth > 1200) && (
                  <ul className="nav_list d-flex align-items-center">
                    <li className="nav_item">
                      {(userType === "Customer" || !isConnected) && (
                        <NavLink
                          to={"/home"}
                          className={(navClass) =>
                            navClass.isActive ? "active" : ""
                          }
                          onClick={() => {
                            setToggleMenu(!toggleMenu);
                          }}
                        >
                          {"Home"}
                        </NavLink>
                      )}

                      {userType === "Super Admin" && isConnected && (
                        <NavLink
                          to={"/sadmin-dashboard"}
                          className={(navClass) =>
                            navClass.isActive ? "active" : ""
                          }
                          onClick={() => {
                            setToggleMenu(!toggleMenu);
                          }}
                        >
                          {"Dashboard"}
                        </NavLink>
                      )}

                      {userType === "Admin" && isConnected && (
                        <NavLink
                          to={"/nadmin-dashboard"}
                          className={(navClass) =>
                            navClass.isActive ? "active" : ""
                          }
                          onClick={() => {
                            setToggleMenu(!toggleMenu);
                          }}
                        >
                          {"Dashboard"}
                        </NavLink>
                      )}
                    </li>

                    <li className="nav_item">
                      <NavLink
                        to={"/explore"}
                        className={(navClass) =>
                          navClass.isActive ? "active" : ""
                        }
                        onClick={() => {
                          setToggleMenu(!toggleMenu);
                        }}
                      >
                        {"Explore"}
                      </NavLink>
                    </li>

                    <li className="nav_item">
                      {userType === "Super Admin" && isConnected && (
                        <NavLink
                          to={"/sadmin-viewadmins"}
                          className={(navClass) =>
                            navClass.isActive ? "active" : ""
                          }
                          onClick={() => {
                            setToggleMenu(!toggleMenu);
                          }}
                        >
                          {"Admins"}
                        </NavLink>
                      )}
                      {userType !== "Super Admin" && isConnected && (
                        <NavLink
                          to={`/seller-profile/${address}`}
                          className={(navClass) =>
                            navClass.isActive ? "active" : ""
                          }
                          onClick={() => {
                            setToggleMenu(!toggleMenu);
                          }}
                        >
                          {"Profile"}
                        </NavLink>
                      )}
                    </li>

                    <li className="nav_item">
                      {userType === "Admin" && isConnected && (
                        <NavLink
                          to={"/nadmin-viewreports"}
                          className={(navClass) =>
                            navClass.isActive ? "active" : ""
                          }
                          onClick={() => {
                            setToggleMenu(!toggleMenu);
                          }}
                        >
                          {"Reports"}
                        </NavLink>
                      )}
                      {userType === "Super Admin" && isConnected && (
                        <NavLink
                          to={"/sadmin-adminrequests"}
                          className={(navClass) =>
                            navClass.isActive ? "active" : ""
                          }
                          onClick={() => {
                            setToggleMenu(!toggleMenu);
                          }}
                        >
                          {"Requests"}
                        </NavLink>
                      )}
                      {isConnected && userType === "Customer" && (
                        <NavLink
                          to={"/create"}
                          state={{ walletAddress: userAddress }}
                          className={(navClass) =>
                            navClass.isActive ? "active" : ""
                          }
                          onClick={() => {
                            setToggleMenu(!toggleMenu);
                          }}
                        >
                          {"Create"}
                        </NavLink>
                      )}
                    </li>
                    <li className="nav_item">
                      {userType === "Admin" && isConnected && (
                        <NavLink
                          to={"/nadmin-viewusers"}
                          className={(navClass) =>
                            navClass.isActive ? "active" : ""
                          }
                          onClick={() => {
                            setToggleMenu(!toggleMenu);
                          }}
                        >
                          {"Users"}
                        </NavLink>
                      )}
                      {userType === "Super Admin" && isConnected && (
                        <NavLink
                          to={"/sadmin-options"}
                          className={(navClass) =>
                            navClass.isActive ? "active" : ""
                          }
                          onClick={() => {
                            setToggleMenu(!toggleMenu);
                          }}
                        >
                          {"Options"}
                        </NavLink>
                      )}
                    </li>
                    <li className="nav_item">
                      {userType === "Admin" && isConnected && (
                        <NavLink
                          to={"/nadmin-blockusers"}
                          className={(navClass) =>
                            navClass.isActive ? "active" : ""
                          }
                          onClick={() => {
                            setToggleMenu(!toggleMenu);
                          }}
                        >
                          {"Blocked"}
                        </NavLink>
                      )}
                    </li>
                  </ul>
                )}

                <div
                  className="nav_btn"
                  onClick={() => {
                    setToggleMenu(!toggleMenu);
                  }}
                >
                  <span className="px-1">
                    <DehazeIcon fontSize="large" />
                  </span>
                </div>
              </div>

              <div className="nav_right d-flex align-items-center gap-5">
                {/* Connect the user's wallet into the system after click or display the wallet address if the user already connect to the system */}
                {isConnected && userType === "Super Admin" && (
                  <button className="btn d-flex gap-1 align-items-center custom-style ">
                    <span className="overflow-hidden wallet-address">
                      <b>
                        <span className="px-1">
                          <AccountCircleIcon
                            fontSize={screenWidth > 1200 ? "large" : "small"}
                          />
                        </span>
                        <span style={{ fontSize: "1rem" }}>
                          {screenWidth > 700 &&
                            (ensName ?? address).substring(0, 8) + "....."}

                          {screenWidth <= 700 &&
                            (ensName ?? address).substring(0, 3) + ".."}
                        </span>
                      </b>
                    </span>
                  </button>
                )}
                {isConnected && userType !== "Super Admin" && (
                  <Link
                    to={`/seller-profile/${address}`}
                    className="text-decoration-none to-user"
                    disable={userType === "Super Admin" ? true : false}
                  >
                    <button className="btn d-flex gap-1 align-items-center custom-style ">
                      <span className="overflow-hidden wallet-address">
                        <b>
                          <span className="px-1">
                            <AccountCircleIcon
                              fontSize={screenWidth > 1200 ? "large" : "small"}
                            />
                          </span>
                          <span style={{ fontSize: "1rem" }}>
                            {screenWidth > 700 &&
                              (ensName ?? address).substring(0, 8) + "....."}

                            {screenWidth <= 700 &&
                              (ensName ?? address).substring(0, 3) + ".."}
                          </span>
                        </b>
                      </span>
                    </button>
                  </Link>
                )}
                {!isConnected && (
                  <button
                    onClick={() => {
                      setshowConnectWallet(true);
                      // connect();
                      // <Link to="/connect-wallet" />;
                      // <ConnectWallet/>
                    }}
                    className="btn d-flex gap-2 align-items-center"
                  >
                    <span>
                      <i className="ri-wallet-line"></i>
                    </span>
                    {screenWidth > 1200 ? "Connect Wallet" : "Connect"}
                  </button>
                )}

                <span className="mobile_menu">
                  <i className="ri-menu-line"></i>
                </span>
              </div>
            </div>
          </Container>
        )}
      </header>
      {showConnectWallet && (
        <ConnectWallet
          setshowConnectWallet={setshowConnectWallet}
          setUserType={getUserType}
        />
      )}
    </>
  );
}

export default Header;
