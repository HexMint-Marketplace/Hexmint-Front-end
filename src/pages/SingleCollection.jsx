import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { COLLECTION_DATA } from "../asssets/data/data.js";
import NFTList from "../components/ui/NFTList/NFTList.jsx";
import SingleCollectionHead from "../components/ui/SingleCollectionHead/SingleCollectionHead";
import MarketplaceJSON from "../Marketplace.json";
import axios from "axios";

function SingleCollection() {
  const location = useLocation();
  const { collectionData } = location.state;
  console.log("collectionData: ", collectionData);
  const {data} = "";
  const [dataFetched, updateFetched] = useState(false);
  const [address, updateAddress] = useState("0x");
  const [totalPrice, updateTotalPrice] = useState("0");

  useEffect(() => {
    const fetchData = async () => {
      data =  await getNFTData();
    }
    fetchData()
    .catch(console.error);
    console.log("data: ",data);
  }, []);

  async function getNFTData() {
    console.log("In the getNFTDATa method");
    const ethers = require("ethers");
    let sumPrice = 0;
    //After adding your Hardhat network to metamask, get providers and signers
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    // console.log("provider: ",provider);
    // const signer = provider.getSigner();
    // console.log("signer: ",signer);
    // const addr = await signer.getAddress();
    // console.log("signer: ",addr);

    //Pull the deployed contract instance
    let contract = new ethers.Contract(
      MarketplaceJSON.address,
      MarketplaceJSON.abi,
      provider
      // signer
      // MarketplaceJSON.address,
    );
    // console.log("contract: ", contract);

    //create an NFT Token
    let transaction = await contract.getAllNFTs();
    console.log("transaction: ",transaction);
    /*
     * Below function takes the metadata from tokenURI and the data returned by getMyNFTs() contract function
     * and creates an object of information that is to be displayed
     */

    const items = await Promise.all(
      transaction.map(async (i) => {
        const tokenURI = await contract.tokenURI(i.tokenId);
        let meta = await axios.get(tokenURI);
        // console.log("meta: ", meta);
        meta = meta.data;
        console.log("meta: ", meta);
        let price = ethers.utils.formatUnits(i.price.toString(), "ether");
        // if (meta.collectionId == collectionData._id) {
          let item = {
            price,
            tokenId: i.tokenId.toNumber(),
            seller: i.seller,
            contractAddress: i.contractAddress,
            image: meta.image,
            NFTname: meta.title,
            description: meta.description,
            collectionId: meta.collectionId,
          };
          console.log("item: ", item);
          sumPrice += Number(price);
          return item;
        // }
      })
    );

    updateData(items);
    console.log("items: ", items);
    // updateFetched(true);
    // updateAddress(addr);
    // updateTotalPrice(sumPrice.toPrecision(3));
    return items;
  }

  return (
    <section>
      <div>
        <SingleCollectionHead
          key={collectionData._id}
          collectionData={collectionData}
        />
        {/* <NFTList
          key={collectionData._id}
          collectionData={collectionData}
          NFTData={data}
        /> */}
      </div>
    </section>
  );
}

export default SingleCollection;
