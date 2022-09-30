import {React,useEffect,useState} from 'react'
import {COLLECTION_DATA} from '../asssets/data/data.js'
import NFTList from '../components/ui/NFTList/NFTList.jsx';
import ProfileHead from '../components/ui/ProfileHead/ProfileHead'
import UserCollectionList from '../components/ui/UserCollectionList/UserCollectionList'
import Loader from '../components/ui/Loader/Loader.jsx';
import UserServices from '../services/API/UserServices';
import { useNavigate } from "react-router-dom";



function SellerProfile() {
  const[userWallet, setuserWallet] = useState({});
  const [loader, setLoader] = useState(false);
  const [userType, setUserType] = useState('');
  // const [showAddress,setShowAddress] = useState([]);

  useEffect(() => {
    setLoader(true)
    const walletAddress = JSON.parse(localStorage.getItem('userAddress'));
   

    // console.log("Should display",showAddress);

    // call the backend and get details
    getusertype(walletAddress.address);

    setuserWallet(walletAddress);
    console.log("I fire once")
    console.log("In user Effect",userWallet);
    // setLoader(false)
    setTimeout(()=>{
      console.log("loader false calling")
      setLoader(false)
    },1500 )
    
  }, []);

  const getusertype = async (walletAddress) => {
    try {
      const details = await UserServices.getUserType(walletAddress);
      const UType = details.data.userType;
      console.log(UType)
      setUserType(UType);
      // if(UType === "Customer"){
      //   console.log("I am a seller")
      // }else if(UType === "Admin"){
      //   console.log("I am a customer")
      // }else{
      //   console.log("I am a guest")
      // }

    }
    catch (err) {
        // console.log(err);

    }
  }

  return (
    <section>

      {loader?<div><Loader/></div>
      :<div>
        <ProfileHead 
          userWallet={userWallet}
          userType = {userType}
          key={COLLECTION_DATA.collectionId} 
          collectionData = {COLLECTION_DATA}
          />
   
        

      </div>}
    </section>

  )
}

export default SellerProfile