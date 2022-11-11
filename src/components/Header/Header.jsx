import React, { useEffect, useState } from "react";
import "./header.css";
import { Container } from "reactstrap";
import { NavLink, Link } from "react-router-dom";
import AuthServices from "../../services/AuthServices";
import { useAccount, useConnect, useEnsName } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import DehazeIcon from "@mui/icons-material/Dehaze";
import { useNavigate } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ConnectWallet from "../ui/ConnectWallet/ConnectWallet";

const NAV_LINKS = [
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
    display: "Profile",
    url: "/seller-profile",
  },
];

function Header() {
  const [toggleMenu, setToggleMenu] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const navigate = useNavigate();

  //Wagmi Hooks
  const { address, isConnected } = useAccount();
  const { data: ensName } = useEnsName({ address });
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });

  //Set user type and useraddress
  const [userType, setuserType] = useState();
  const [userAddress, setuserAddress] = useState("");
  const [showConnectWallet, setshowConnectWallet] = useState(false)

  useEffect(() => {
    //set the user wallet address to local storage
    localStorage.setItem("userAddress", JSON.stringify({ address }));
  }, [{ address }]);

  //Getting user type by passing the wallet address after Connecting the wallet
  useEffect(() => {
    const handleConnectWallet = async (e) => {
      console.log(`${address} InhandleConnectWallet`);
      const response = await AuthServices.connectwallet({ address });
      setuserAddress({ address });
      console.log("This is user details", userAddress);
      console.log("address", address);
      console.log("type", response.data.userType);
      setuserType(response.data.userType);
      {
        if (response.data.userType === "Admin") {
          console.log(response.data.userType);
          navigate("/nadmin-dashboard");
        } else if (response.data.userType === "Super Admin") {
          console.log(response.data.userType);
          navigate("/sadmin-dashboard");
        } else {
          navigate("/home");
        }
      }
    };

    if (isConnected) {
      setshowConnectWallet(false)
      //call handleconncect wallet function if the user is connected
      handleConnectWallet();
    } else {
      navigate("/home");
    }
  }, [address]);

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
      <Container>
        <div className="navigation d-flex  align-items-center justify-content-between ">
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

          <div className="nav_menu ">
            {(toggleMenu || screenWidth > 1000) && (
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
            {isConnected ? (
              <Link
                to={`/seller-profile/${address}`}
                className="text-decoration-none to-user"
              >
                <button className="btn d-flex gap-1 align-items-center custom-style ">
                  <span className="overflow-hidden wallet-address">
                    <b>
                      <span className="px-1">
                        <AccountCircleIcon
                          fontSize={screenWidth > 1000 ? "large" : "small"}
                        />
                      </span>
                      <span style={{ fontSize: "1rem" }}>
                        {screenWidth > 1000
                          ? (ensName ?? address).substring(0, 8) + "....."
                          : (ensName ?? address).substring(0, 3) + ".."}
                      </span>
                    </b>
                  </span>
                </button>
              </Link>
            ) : (
              <button
                onClick={() => {
                  setshowConnectWallet(true)
                  // connect();
                  // <Link to="/connect-wallet" />;
                  // <ConnectWallet/>
                }}
                className="btn d-flex gap-2 align-items-center"
              >
                <span>
                  <i className="ri-wallet-line"></i>
                </span>
                {screenWidth > 1000 ? "Connect Wallet" : "Connect"}
              </button>
            )}

            <span className="mobile_menu">
              <i className="ri-menu-line"></i>
            </span>
          </div>
        </div>
      </Container>
    </header>
    {showConnectWallet && <ConnectWallet setshowConnectWallet={setshowConnectWallet} />}
    </>
  );
}

export default Header;
