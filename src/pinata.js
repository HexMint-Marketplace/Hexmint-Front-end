//require('dotenv').config();
// const key = process.env.PINATA_API_KEY;
// console.log('key: ',key);
// const key = "79e96f2c633a1d649657";
// const secret = "6ecb8befe4be3049083405b82eba49c2738ddae36cc3bce327ed7f52fe325b33";

//second
// const key = "d1ac1f06fc8c74bb0e77";
// const secret = "5bda47bcfd583cf284f5a0f2aa183aa098da7b80691dbec2e7d2831c4e90f54c";

//third
const key = "a2873abf28086dddfadb";
const secret = "93c198441ba978f62e1ffbcec04f65833807f54e5eedc761d31a83b1a280d0b3";

// const secret = process.env.PIANTA_SECRET_KEY;
// console.log('secret: ',secret);

const key = "fd06d913ef227fa82730";
const secret = "9bdaf48d89c42531df4e030170a135377f3e4343a1a3fe0389b47c9fb7e92b6e";


const axios = require('axios');
const FormData = require('form-data');

export const uploadJSONToIPFS = async(JSONBody) => {
    const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;
    //making axios POST request to Pinata ⬇️
    return axios 
        .post(url, JSONBody, {
            headers: {
                pinata_api_key: key,
                pinata_secret_api_key: secret,
            }
        })
        .then(function (response) {
           return {
               success: true,
               pinataURL: "https://gateway.pinata.cloud/ipfs/" + response.data.IpfsHash
           };
        })
        .catch(function (error) {
            console.log(error);
            return {
                success: false,
                message: error.message,
            }

    });
};

export const uploadFileToIPFS = async(file) => {
    const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
    //making axios POST request to Pinata ⬇️
    
    let data = new FormData();
    data.append('file', file);

    const metadata = JSON.stringify({
        name: 'testname',
        keyvalues: {
            exampleKey: 'exampleValue'
        }
    });
    data.append('pinataMetadata', metadata);

    // pinataOptions are optional
    const pinataOptions = JSON.stringify({
        cidVersion: 0,
        customPinPolicy: {
            regions: [
                {
                    id: 'FRA1',
                    desiredReplicationCount: 1
                },
                {
                    id: 'NYC1',
                    desiredReplicationCount: 2
                }
            ]
        }
    });
    data.append('pinataOptions', pinataOptions);

    return axios 
        .post(url, data, {
            maxBodyLength: 'Infinity',
            headers: {
                'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
                pinata_api_key: key,
                pinata_secret_api_key: secret,
            }
        })
        .then(function (response) {
            console.log("image uploaded", response.data.IpfsHash)
            return {
               success: true,
               pinataURL: "https://gateway.pinata.cloud/ipfs/" + response.data.IpfsHash
           };
        })
        .catch(function (error) {
            console.log(error);
            return {
                success: false,
                message: error.message,
            }

    });
};