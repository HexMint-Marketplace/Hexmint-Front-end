//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.17;

import "hardhat/console.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract NFTMarketplace is ERC721URIStorage {
    using Counters for Counters.Counter;
    //_tokenIds variable has the most recent minted tokenId
    Counters.Counter private _tokenIds;
    //Keeps track of the number of items sold on the marketplace
    Counters.Counter private _itemsSold;
    //contractAddress is the contract address that created the smart contract
    address payable contractAddress;
    //The fee charged by the marketplace to be allowed to list an NFT
    uint256 listPrice = 0.01 ether;

    //The structure to store info about a listed token
    struct Token {
        uint256 tokenId;
        address payable contractAddress;
        address payable seller;
        uint256 price;
        bool currentlyListed;
    }

    //the event emitted when a token is successfully updated
    event TokenStatusUpdatedSuccess(
        uint256 indexed tokenId,
        address contractAddress,
        address seller,
        uint256 price,
        bool currentlyListed
    );


    //This mapping maps tokenId to token info and is helpful when retrieving details about a tokenId
    mapping(uint256 => Token) private idToToken;

    constructor() ERC721("NFTMarketplace", "NFTM") {
        contractAddress = payable(msg.sender);
    }

    function updateListPrice(uint256 _listPrice) public payable {
        require(
            contractAddress == msg.sender,
            "Only contractAddress can update listing price"
        );
        listPrice = _listPrice;
    }

    function getListPrice() public view returns (uint256) {
        return listPrice;
    }

    // function getLatestIdToListedToken() public view returns (Token memory) {
    //     uint256 currentTokenId = _tokenIds.current();
    //     return idToToken[currentTokenId];
    // }

    function getTokenForId(uint256 tokenId) public view returns (Token memory) {
        return idToToken[tokenId];
    }

    function getCurrentToken() public view returns (uint256) {
        return _tokenIds.current();
    }

    //The first time a token is created, it is listed here
    function createToken(string memory tokenURI)
        public
        payable
        returns (uint256)
    {
        //Increment the tokenId counter, which is keeping track of the number of minted NFTs

        _tokenIds.increment();
        uint256 newTokenId = _tokenIds.current();

        //Mint the NFT with tokenId newTokenId to the address who called createToken
        _safeMint(msg.sender, newTokenId);

        //Map the tokenId to the tokenURI (which is an IPFS URL with the NFT metadata)
        _setTokenURI(newTokenId, tokenURI);

        //Update the mapping of tokenId's to Token details, useful for retrieval functions
        idToToken[newTokenId] = Token(
            newTokenId,
            payable(address(this)),
            payable(msg.sender),
            0,
            false
        );

        //Emit the event for successful mint. The frontend parses this message and updates the end user
        emit TokenStatusUpdatedSuccess(
            newTokenId,
            address(this),
            msg.sender,
            0,
            false
        );

        return newTokenId;
    }

    function ListToken(uint256 tokenId, uint256 price) public payable {
        //Make sure the sender sent enough ETH to pay for listing
        require(msg.value == listPrice, "Hopefully sending the correct price");
        //Just sanity check
        require(price > 0, "Make sure the price isn't negative");

        //Update the mapping of tokenId's to Token details, useful for retrieval functions
        idToToken[tokenId].price = price;
        idToToken[tokenId].currentlyListed = true;

        _transfer(msg.sender, address(this), tokenId);
        //Emit the event for successful transfer. The frontend parses this message and updates the end user
        // emit TokenStatusUpdatedSuccess(
        //     tokenId,
        //     address(this),
        //     address(this),
        //     price,
        //     true
        // );
    }

    //This will return all the NFTs currently listed to be sold on the marketplace
    function getAllNFTs() public view returns (Token[] memory) {
        uint256 nftCount = _tokenIds.current();
        Token[] memory tokens = new Token[](nftCount);
        uint256 currentIndex = 0;
        uint256 currentId;

        //filter out currentlyListed == false over here
        for (uint256 i = 0; i < nftCount; i++) {
            currentId = i + 1;
            Token storage currentItem = idToToken[currentId];
            if (currentItem.currentlyListed == true) {
                tokens[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        //the array 'tokens' has the list of all NFTs in the marketplace
        return tokens;
    }

    //Returns all the NFTs that the current user is contractAddress or seller in
    function getMyNFTs() public view returns (Token[] memory) {
        uint256 totalItemCount = _tokenIds.current();
        uint256 itemCount = 0;
        uint256 currentIndex = 0;
        uint256 currentId;
        //Important to get a count of all the NFTs that belong to the user before we can make an array for them
        for (uint256 i = 0; i < totalItemCount; i++) {
            if (
                idToToken[i + 1].contractAddress == msg.sender ||
                idToToken[i + 1].seller == msg.sender
            ) {
                itemCount += 1;
            }
        }

        //Once you have the count of relevant NFTs, create an array then store all the NFTs in it
        Token[] memory items = new Token[](itemCount);
        for (uint256 i = 0; i < totalItemCount; i++) {
            if (
                idToToken[i + 1].contractAddress == msg.sender ||
                idToToken[i + 1].seller == msg.sender
            ) {
                currentId = i + 1;
                Token storage currentItem = idToToken[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items;
    }

    function transferNFT(uint256 tokenId, address receiver) public payable {
        address seller = idToToken[tokenId].seller;
        //update the details of the token
        idToToken[tokenId].currentlyListed = false;
        idToToken[tokenId].seller = payable(receiver);

        //Actually transfer the token to the new contractAddress
        if (ownerOf(tokenId) != seller) {
            _transfer(address(this), receiver, tokenId);
        } else {
            _transfer(seller, receiver, tokenId);
        }
        //approve the marketplace to transfer NFT
        // approve(seller, tokenId);
        // uint256 price = 0;
        // emit TokenStatusUpdatedSuccess(
        //     tokenId,
        //     address(this),
        //     msg.sender,
        //     price,
        //     false
        // );
    }

    function executeSale(uint256 tokenId) public payable {
        uint256 price = idToToken[tokenId].price;
        address seller = idToToken[tokenId].seller;
        require(
            msg.value == price,
            "Please submit the asking price in order to complete the purchase"
        );

        //update the details of the token
        idToToken[tokenId].currentlyListed = true;
        idToToken[tokenId].seller = payable(msg.sender);
        _itemsSold.increment();

        //Actually transfer the token to the new contractAddress
        _transfer(address(this), msg.sender, tokenId);
        //approve the marketplace to sell NFTs on your behalf
        approve(address(this), tokenId);

        //Transfer the listing fee to the marketplace creator
        payable(contractAddress).transfer(listPrice);
        //Transfer the proceeds from the sale to the seller of the NFT
        payable(seller).transfer(msg.value);
    }

    //We might add a resell token function in the future
    //In that case, tokens won't be listed by default but users can send a request to actually list a token
}
