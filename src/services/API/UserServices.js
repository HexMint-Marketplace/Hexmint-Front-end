import config from '../../config.json';
import axios from "axios";

//API endpoint
const APIEndpoint = config.DOMAIN_NAME + '/user';

// const getUserType = (walletAddress) => {
//     console.log(`in user services ${walletAddress}`);
//     return axios.get(APIEndpoint + `/user-type?walletAddress=${walletAddress}`, {
//         params: {
//             walletAddress: walletAddress
//         }
//     });
// }

const getUserDetailsFromWalletAddress = (walletAddress) => {
    // console.log(`in user services ${walletAddress}`);
    return axios.get(APIEndpoint + `/user-details-from-walletaddress?walletAddress=${walletAddress}`, {
        params: {
            walletAddress: walletAddress
        }
    });
}

const getUserDetailsFromUserId = (userid) => {
    // console.log(`in user services ${userid}`);
    return axios.get(APIEndpoint + `/user-details-from-userid?userid=${userid}`, {
        params: {
            userid: userid
        }
    });
}

export default {
    getUserDetailsFromWalletAddress,
    getUserDetailsFromUserId,
}