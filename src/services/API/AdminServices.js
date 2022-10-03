import config from '../../config.json';
import axios from "axios";

//API endpoint
const APIEndpoint = config.DOMAIN_NAME + '/user';

const getAdminDetails = (walletAddress) => {
    console.log(`in user services ${walletAddress}`);
    return axios.get(APIEndpoint + `/admin-details?walletAddress=${walletAddress}`, {
        params: {
            walletAddress: walletAddress
        }
    });
}

export default {
    getAdminDetails,
}