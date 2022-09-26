import React, { useRef, useEffect } from "react";
import "./header.css";
import { Container } from "reactstrap";
import { NavLink, Link } from "react-router-dom";
import AuthServices from "../../services/AuthServices";
// import { useMoralis, useWeb3Contract } from "react-moralis";
import { useAccount, useConnect, useEnsName } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'


const NAV_LINKS = [
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
        display: "Profile",
        url: "/seller-profile",
      }
]


function Header() {
  // const {enableWeb3, isWeb3Enabled, web3, Moralis} = useMoralis();
  const { address, isConnected } = useAccount()
  const { data: ensName } = useEnsName({ address })
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  })

  useEffect(() => {
    const handleConnectWallet = async (e) => {
      console.log(`${address} InhandleConnectWallet`)
      const response = await AuthServices.connectwallet({ address });
      console.log(address);
      console.log("response : ", response);
      
    }
  
    if (isConnected) {
      handleConnectWallet()
    }
  
  }, [address]);




  // const handleConnectWallet = async (e) => {
  //   console.log("clicked");
  //     try {
  //       const response = await AuthServices.login({ username, password });
  //       // console.log("response - 2", response);
  //       if (response.status === 200) {
  //         // toast.success("Login Successfully", {
  //         //   position: "top-center",
  //         //   autoClose: 5000,
  //         //   hideProgressBar: false,
  //         //   closeOnClick: true,
  //         //   pauseOnHover: true,
  //         //   draggable: true,
  //         //   progress: undefined,
  //         // });
  //         Messages.SuccessMessage("Successfully Logged In.");
  //         // navigate(redirectPath,{replace:true})
  //         // const user=jwtDecode(Token.getAccessToken())
  //         // console.log(user);
  //         // setAuth({userRole:user.role,profile_complete:user.profile_complete})
  //         navigate(from, { replace: true })
          

  //       }
  //     } catch (error) {
  //       console.log("error response : ",error.response.data.message);
  //       // console.log(error.response);
  //       // toast.error(error.message, {
  //       //   position: "top-center",
  //       //   autoClose: 5000,
  //       //   hideProgressBar: false,
  //       //   closeOnClick: true,
  //       //   pauseOnHover: true,
  //       //   draggable: true,
  //       //   progress: undefined,
  //       // });
  //       console.log(error.response.data.message);
  //       const errormessage=error.response.data.message;
  //       Messages.ErrorMessage({
  //         error: error,
  //         custom_message:error.response.data.message.user
  //       });
  //     }
  //   }
  //   setTimeout(() => {
  //     setLoader(false);
  //   }, 200);
  

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
              {NAV_LINKS.map((item, index) => (
                <li className="nav_item" key={index}>
                  <NavLink
                    to={item.url}
                    className={(navClass) =>
                      navClass.isActive ? "active" : ""
                    }
                  >
                    {item.display}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          <div className="nav_right d-flex align-items-center gap-5">
            {/* { isWeb3Enabled ? (
              <>
                "Connected!" 
              </>
            ) : (
              <button onClick={() => enableWeb3()} className="btn d-flex gap-2 align-items-center">
              <span>
                <i class="ri-wallet-line"></i>
              </span>
              Connect Wallet
              </button>
            )} */}
          

            { isConnected ? 
            (
            <Link to={`/seller-profile/${address}`} className="text-decoration-none to-user">
              {/* // <Link to={`/seller-profile/`} className="text-decoration-none">  */}
              <button className="btn d-flex gap-1 align-items-center custom-width ">
                
                <span className="overflow-hidden wallet-address"><b>{(ensName ?? address).substring(0,8)}.....</b></span>
              </button>
              </Link>
            ) : (
              <button onClick={() => {connect();
              //  handleConnectWallet();
               }} className="btn d-flex gap-2 align-items-center">
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
