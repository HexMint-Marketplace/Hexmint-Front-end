import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import NFTList from "../components/ui/NFTList/NFTList.jsx";
import SingleCollectionHead from "../components/ui/SingleCollectionHead/SingleCollectionHead";
import MarketplaceJSON from "../Marketplace.json";
import axios from "axios";

function SingleCollection() {
  const location = useLocation();
  const { collectionData } = location.state;
  const [data, updateData] = useState([]);
  const [dataFetched, updateFetched] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      let _data = await getNFTData();
      updateData(_data);
      updateFetched(true);
    };
    fetchData().catch(console.error);
  }, []);

  async function getNFTData() {
    const ethers = require("ethers");

    let sumPrice = 0;
    let numofNfts = 0;
    let floorPrize = Number.MAX_SAFE_INTEGER;

    //After adding your Hardhat network to metamask, get providers and signers
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner(MarketplaceJSON.address);

    //Pull the deployed contract instance
    let contract = new ethers.Contract(
      MarketplaceJSON.address,
      MarketplaceJSON.abi,
      signer
    );

    let transaction = await contract.getAllNFTs();

    const items = await Promise.all(
      transaction.map(async (i) => {
        const tokenURI = await contract.tokenURI(i.tokenId);
        let meta = await axios.get(tokenURI);
        meta = meta.data;
        let price = ethers.utils.formatUnits(i.price.toString(), "ether");
        if (meta.collectionId === collectionData._id) {
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
          sumPrice += Number(price);
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

    if (floorPrize === Number.MAX_SAFE_INTEGER) {
      collectionData.floorPrize = 0;
    } else {
      collectionData.floorPrize = floorPrize;
    }
    // updateTotalPrice(sumPrice.toPrecision(3));

    const items_ = items.filter((element) => {
      return element !== undefined;
    });

    return items_;
  }

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
