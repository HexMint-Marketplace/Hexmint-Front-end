import React from "react";
import { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { COLLECTION_DATA } from "../asssets/data/data.js";
import NFTList from "../components/ui/NFTList/NFTList.jsx";
import ProfileHead from "../components/ui/ProfileHead/ProfileHead";
import UserCollectionList from "../components/ui/UserCollectionList/UserCollectionList";
import MarketplaceJSON from "../Marketplace.json";
import axios from "axios";
import NFTs from "./NFTs";

function SellerProfile() {
  const [data, updateData] = useState([]);
  const [dataFetched, updateFetched] = useState(false);
  const [address, updateAddress] = useState("0x");
  const [totalPrice, updateTotalPrice] = useState("0");

  async function getNFTData(tokenId) {
    const ethers = require("ethers");
    let sumPrice = 0;
    //After adding your Hardhat network to your metamask, this code will get providers and signers
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const addr = await signer.getAddress();

    //Pull the deployed contract instance
    let contract = new ethers.Contract(
      MarketplaceJSON.address,
      MarketplaceJSON.abi,
      signer
    );

    //create an NFT Token
    let transaction = await contract.getMyNFTs();

    /*
     * Below function takes the metadata from tokenURI and the data returned by getMyNFTs() contract function
     * and creates an object of information that is to be displayed
     */

    const items = await Promise.all(
      transaction.map(async (i) => {
        const tokenURI = await contract.tokenURI(i.tokenId);
        let meta = await axios.get(tokenURI);
        meta = meta.data;

        let price = ethers.utils.formatUnits(i.price.toString(), "ether");
        let item = {
          price,
          tokenId: i.tokenId.toNumber(),
          seller: i.seller,
          owner: i.owner,
          image: meta.image,
          name: meta.name,
          description: meta.description,
        };
        sumPrice += Number(price);
        return item;
      })
    );

    updateData(items);
    updateFetched(true);
    updateAddress(addr);
    updateTotalPrice(sumPrice.toPrecision(3));
  }

  const params = useParams();
  const tokenId = params.tokenId;
  if (!dataFetched) getNFTData(tokenId);

  return (
    <section>
      <div>
        <ProfileHead
          key={COLLECTION_DATA.collectionId}
          collectionData={COLLECTION_DATA}
        />
        <UserCollectionList />
      </div>
      <div className="flex flex-col text-center items-center mt-11 text-white">
        <h2 className="font-bold">Your NFTs</h2>
        <div className="flex justify-center flex-wrap max-w-screen-xl">
          {data.map((value, index) => {
            return <NFTs data={value} key={index}></NFTs>;
          })}
        </div>
        <div className="mt-10 text-xl">
          {data.length == 0
            ? "Oops, No NFT data to display (Are you logged in?)"
            : ""}
        </div>
      </div>
    </section>
  );
}

export default SellerProfile;
