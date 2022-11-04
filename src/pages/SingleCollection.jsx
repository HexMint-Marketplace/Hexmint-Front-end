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
  const [data, updateData] = useState([]);
  const [dataFetched, updateFetched] = useState(false);
  const [numberofNfts, updateNumberofNFts] = useState("0");
  const [totalPrice, updateTotalPrice] = useState("0");

  useEffect(() => {
    const fetchData = async () => {
      let _data = await getNFTData();
      updateData(_data);
      updateFetched(true);
      console.log("data: ", data);
    };
    fetchData().catch(console.error);
  }, []);

  async function getNFTData() {
    console.log("In the getNFTDATa method");
    const ethers = require("ethers");
    let sumPrice = 0;
    let numofNfts = 0;
    let floorPrize = Number.MAX_SAFE_INTEGER;
    //After adding your Hardhat network to metamask, get providers and signers
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner(MarketplaceJSON.address);
    const addr = await signer.getAddress();

    //Pull the deployed contract instance
    let contract = new ethers.Contract(
      MarketplaceJSON.address,
      MarketplaceJSON.abi,
      signer
    );

    //create an NFT Token
    let transaction = await contract.getAllNFTs();
    console.log("transaction: ", transaction);
    /*
     * Below function takes the metadata from tokenURI and the data returned by getMyNFTs() contract function
     * and creates an object of information that is to be displayed
     */

    const items = await Promise.all(
      transaction.map(async (i) => {
        console.log("tokenID", i.tokenId);
        const tokenURI = await contract.tokenURI(i.tokenId);
        let meta = await axios.get(tokenURI);
        console.log("i: ", i);
        meta = meta.data;
        console.log("meta: ", meta);
        let price = ethers.utils.formatUnits(i.price.toString(), "ether");
        console.log("price: ",Number(price));
        if (meta.collectionId == collectionData._id) {
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
          sumPrice += price;
          numofNfts += 1;
          if (Number(price) < floorPrize) {
            console.log("floor prize updated: ", price);
            floorPrize = Number(price);
          }
          return item;
        }
      })
    );

    collectionData.numberofNfts = numofNfts;
    collectionData.totalPrice = sumPrice;
    collectionData.floorPrize = floorPrize;
    console.log("collectionData: ", collectionData);
    // updateTotalPrice(sumPrice.toPrecision(3));
    return items;
  }
  // console.log("fetched: ", dataFetched);
  if (!dataFetched) {
    return null;
  }
  return (
    <section>
      <div>
        <SingleCollectionHead
          key={collectionData._id}
          collectionData={collectionData}
        />
        <NFTList
          key={collectionData._id}
          collectionData={collectionData}
          NFTData={data}
        />
      </div>
    </section>
  );
}

export default SingleCollection;
