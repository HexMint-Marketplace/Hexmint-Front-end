import { React, useEffect, useState } from "react";
import ProfileHead from "../../components/ui/ProfileHead/ProfileHead";
import Loader from "../../components/ui/Loader/Loader";
import AdminServices from "../../services/AdminServices";
import { Container } from "reactstrap";

function AdminProfile() {
  const [userWallet, setuserWallet] = useState({});
  const [loader, setLoader] = useState(false);
  const [userType, setUserType] = useState("");
  const [name] = useState("");
  const [userName] = useState("");
  const [proPic, setProPic] = useState("");
  const [email, setemail] = useState("");
  const [DOB, setDOB] = useState("");
  const [mobile, setmobile] = useState("");

  const [issubmit, setissubmit] = useState(false);

  useEffect(() => {
    setLoader(true);
    const walletAddress = JSON.parse(localStorage.getItem("userAddress"));

    console.log("Should display", walletAddress);

    getAdmindetails(walletAddress.address);

    setuserWallet(walletAddress);
    console.log("I fire once");
    console.log("In user Effect", userWallet);

    setTimeout(() => {
      console.log("loader false calling");
      setLoader(false);
    }, 1500);
  }, [issubmit]);

  const toggleisSubmit = () => {
    setissubmit(!issubmit);
  };

  const getAdmindetails = async (walletAddress) => {
    try {
      const details = await AdminServices.getAdminDetails(walletAddress);
      console.log("Details", details);

      const userType = details.data.usertype;
      setUserType(userType);

      const email = details.data.email;
      setemail(email);

      const DOB = details.data.DOB;
      setDOB(DOB);

      const mobile = details.data.mobile;
      setmobile(mobile);

      const proPic = details.data.propic;
      setProPic(proPic);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container>
      {loader ? (
        <Loader isLoading={loader} />
      ) : (
        <ProfileHead
          userWallet={userWallet}
          email={email}
          DOB={DOB}
          mobile={mobile}
          userType={userType}
          name={name}
          userName={userName}
          proPic={proPic}
          setissubmit={toggleisSubmit}
        />
      )}
    </Container>
  );
}

export default AdminProfile;
