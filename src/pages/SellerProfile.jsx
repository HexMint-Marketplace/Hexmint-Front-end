import {React,useEffect,useState} from 'react'
import {COLLECTION_DATA} from '../asssets/data/data.js'
import NFTList from '../components/ui/NFTList/NFTList.jsx';
import ProfileHead from '../components/ui/ProfileHead/ProfileHead'
import UserCollectionList from '../components/ui/UserCollectionList/UserCollectionList'
import Loader from '../components/ui/Loader/Loader.jsx';
import UserServices from '../services/API/UserServices';


function SellerProfile() {
  const[userWallet, setuserWallet] = useState({});
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    setLoader(true)
    const walletAddress = JSON.parse(localStorage.getItem('userAddress'));
    console.log("Should display",walletAddress);
    // call the backend and get details
    getuserdetails({walletAddress});

    setuserWallet(walletAddress);
    console.log("I fire once")
    console.log("In user Effect",userWallet);
    // setLoader(false)
    setTimeout(()=>{
      console.log("loader false calling")
      setLoader(false)
    },1500 )
    
  }, []);

  const getuserdetails = async (walletAddress) => {
    try {
      const UDetails = await UserServices.getUserDetails(walletAddress);
      

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
          key={COLLECTION_DATA.collectionId} 
          collectionData = {COLLECTION_DATA}
          />
        <UserCollectionList/>
      </div>}
    </section>

  )
}

export default SellerProfile