import { React, useEffect, useState } from "react";
import { COLLECTION_DATA } from "../asssets/data/data.js";
import NFTList from "../components/ui/NFTList/NFTList.jsx";
import ProfileHead from "../components/ui/ProfileHead/ProfileHead";
import UserCollectionList from "../components/ui/UserCollectionList/UserCollectionList";
import Loader from "../components/ui/Loader/Loader.jsx";
import UserServices from "../services/API/UserServices";
import AdminServices from "../services/API/AdminServices";
import { useNavigate } from "react-router-dom";

function SellerProfile() {
  const [userWallet, setuserWallet] = useState({});
  const [loader, setLoader] = useState(false);
  const [userType, setUserType] = useState("");
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [proPic, setProPic] = useState("");
  const [email, setemail] = useState("");
  const [DOB, setDOB] = useState("");
  const [mobile, setmobile] = useState("");
  // const [showAddress,setShowAddress] = useState([]);

  const [issubmit, setissubmit] = useState(false);

  useEffect(() => {
    setLoader(true);
    const walletAddress = JSON.parse(localStorage.getItem("userAddress"));
    setuserWallet(walletAddress);
    // console.log("Should display",showAddress);

    // call the backend and get details
    getuserdetails(walletAddress.address);
    // console.log("Before checking user type", uType);
    // if (uType === "Customer") {
    //   getuserdetails(walletAddress.address);
    // } else {
    //   getadmindetails(walletAddress.address);
    // }

    console.log("I fire once");
    console.log("In user Effect", userWallet);
    // setLoader(false)
    setTimeout(() => {
      console.log("loader false calling");
      setLoader(false);
    }, 2000);
  }, [issubmit]);

  const toggleisSubmit = () => {
    setissubmit(!issubmit);
  };

  // const getuserType = async (walletAddress) => {
  //   try {
  //     const details = await UserServices.getUserType(walletAddress);
  //     console.log("in user type -", details);
  //     console.log("From get user type", details.data.usertype);
  //     const userType = details.data.usertype;
  //     setUserType(userType);
  //     return userType;
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const getuserdetails = async (walletAddress) => {
    try {
      const details = await UserServices.getUserDetails(walletAddress);
      console.log("In get user details", details);
      console.log("In user details. details -", details);

      if (details.data.usertype === "Customer") {
        const userType = details.data.usertype;
        setUserType(userType);

        const name = details.data.name;
        setName(name);

        const userName = details.data.username;
        setUserName(userName);

        const proPic = details.data.profilePic;
        setProPic(proPic);

      } else {
        const userType = details.data.usertype;
        setUserType(userType);

        const name = details.data.name;
        setName(name);

        const userName = details.data.username;
        setUserName(userName);

        const proPic = details.data.profilePic;
        setProPic(proPic);

        const email = details.data.email;
        setemail(email);

        const DOB = details.data.DOB;
        setDOB(DOB);

        const mobile = details.data.mobilenumber;
        setmobile(mobile);
      }
    } catch (err) {
      console.log(err);
    }
  
  };

  // const getadmindetails = async (walletAddress) => {
  //   try {
  //     const details = await AdminServices.getAdminDetails(walletAddress);

  //     const email = details.data.email;
  //     setemail(email);

  //     const DOB = details.data.DOB;
  //     setDOB(DOB);

  //     const mobile = details.data.mobile;
  //     setmobile(mobile);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  return (
    <section>
      {loader ? (
        <div>
          <Loader />
        </div>
      ) : (
        <div>
          <ProfileHead
            userWallet={userWallet}
            userType={userType}
            name={name}
            userName={userName}
            proPic={proPic}
            email={email}
            DOB={DOB}
            mobile={mobile}
            key={COLLECTION_DATA.collectionId}
            collectionData={COLLECTION_DATA}
            // profileUpdate = {profileUpdate}
            setissubmit={toggleisSubmit}
            // reloadNow  = {reloadNow}
          />
        </div>
      )}
    </section>
  );
}

export default SellerProfile;
