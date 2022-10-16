import React, { useRef, useEffect, useState } from "react";
import "./header.css";
import { Container } from "reactstrap";
import { NavLink, Link } from "react-router-dom";
import AuthServices from "../../services/AuthServices";
import { useAccount, useConnect, useEnsName } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

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
      //call handleconncect wallet function if the user is connected
      handleConnectWallet();
    } else {
      navigate("/home");
    }
  }, [address]);

  return (
    <header className="header w-100">
      <Container>
        <div className="navigation d-flex  align-items-center justify-content-between ">
          <div className="logo">
            <h2 className="d-flex gap-2 align-items-center">
              <span>
                <i class="ri-zcool-fill"></i>
              </span>
              HeXmint
            </h2>
          </div>

          <div className="nav_menu ">
            <ul className="nav_list d-flex align-items-center">
              <li className="nav_item">
                {(userType === "Customer" || !isConnected) && (
                  <NavLink
                    to={"/home"}
                    className={(navClass) =>
                      navClass.isActive ? "active" : ""
                    }
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
                  className={(navClass) => (navClass.isActive ? "active" : "")}
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
                  >
                    {"Profile"}
                  </NavLink>
                )}
              </li>

              <li className="nav_item">
                {isConnected && userType === "Customer" && (
                  <NavLink
                    to={"/create"}
                    className={(navClass) =>
                      navClass.isActive ? "active" : ""
                    }
                  >
                    {"Create"}
                  </NavLink>
                )}
              </li>
            </ul>
          </div>

          <div className="nav_right d-flex align-items-center gap-5">

            {/* Connect the user's wallet into the system after click or display the wallet address if the user already connect to the system */}
            {isConnected ? (
              <Link
                to={`/seller-profile/${address}`}
                className="text-decoration-none to-user"
              >
                <button className="btn d-flex gap-1 align-items-center custom-width ">
                  <span className="overflow-hidden wallet-address">
                    <b>
                      <span className="px-1">
                        <AccountCircleIcon fontSize="large" />
                      </span>
                      <span style={{ "font-size": "1rem" }}>
                        {(ensName ?? address).substring(0, 8)}.....
                      </span>
                    </b>
                  </span>
                </button>
              </Link>
            ) : (
              <button
                onClick={() => {
                  connect();
                }}
                className="btn d-flex gap-2 align-items-center"
              >
                <span>
                  <i class="ri-wallet-line"></i>
                </span>
                Connect Wallet
              </button>
            )}

            <span className="mobile_menu">
              <i className="ri-menu-line"></i>
            </span>
          </div>
        </div>
      </Container>
    </header>
  );
}

export default Header;
