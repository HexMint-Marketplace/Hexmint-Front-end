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

const getUserDetails = (walletAddress) => {
    console.log(`in user services ${walletAddress}`);
    return axios.get(APIEndpoint + `/user-details?walletAddress=${walletAddress}`, {
        params: {
            walletAddress: walletAddress
        }
    });
}

export default {
    getUserDetails,
    // getUserType,
}