const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Hexmint NFT Marketplace", function () {
  let Hexmint, contract, owner, addr1, addr2, addr3, addrs;
  beforeEach(async function () {
    Hexmint = await ethers.getContractFactory("NFTMarketplace");
    [owner, addr1, addr2, addr3, ...addrs] = await ethers.getSigners();
    contract = await Hexmint.deploy();
  });

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      expect(await contract.owner()).to.equal(owner.address);
    });
  });

  describe("update list price", function () {
    it.only("it should be contract address calling", async function () {
      const _newListPrice = ethers.utils.parseUnits("0.001", "ether");
      await expect(
        contract.connect(addr1).updateReferralRate(_newListPrice)
      ).to.be.revertedWith("Ownable: caller is not the owner");
    });

    it("should set new list price", async function () {
      const _newListPrice = ethers.utils.parseEther("0.01");
      const response = await contract
        .connect(owner)
        .updateReferralRate(_newListPrice);
      await response.wait();
      expect(await contract.getReferralRate()).to.equal(_newListPrice);
    });
  });

  describe("get list price", function () {
    it("should get list price", async function () {
      const _newListPrice = ethers.utils.parseEther("0.001");
      const response = await contract
        .connect(owner)
        .updateReferralRate(_newListPrice);
      await response.wait();
      expect(await contract.getReferralRate()).to.equal(_newListPrice);
    });
  });

  describe("get sold item count", function () {
    it("should get sold items count", async function () {
      const prev_count = await contract.getSoldItemCount();
      const newToken = await contract
        .createToken("metadata url");
      await newToken.wait();
      const newTokenId = await contract.getCurrentToken();
      const price = ethers.utils.parseEther("0.01");
      const providedValue = ethers.utils.parseEther("0.02");
      const response1 = await contract
        .ListToken(newTokenId, price);
      await response1.wait();
      const response2 = await contract
        .connect(addr1)
        .executeSale(newTokenId, { value: providedValue });
      await response2.wait();
      expect(await contract.getSoldItemCount()).to.equal(parseInt(prev_count) + 1);
    });
  });

  describe("get token object for tokenId", function () {
    it("return token", async function () {
      const response = await contract
        .createToken("metadata url");
        await response.wait();
      const token = await contract.getCurrentToken();
      const response2 = await contract.getTokenForId(
        token
      );
      expect(response2.tokenId).to.equal(token);
    });
  });

  describe("get current token", function () {
    it("return tokenid", async function () {
      const prev_tokenId = await contract.getCurrentToken();
      const response = await contract
        .createToken("metadata url");
        await response.wait();
      const currentTokenId = await contract.getCurrentToken();
      expect(currentTokenId).to.equal(prev_tokenId+1);
    });
  });

  describe("create(mint) token", function () {
    it("token id should increment", async function () {
      const prev_tokenId = await contract.getCurrentToken();
      const newToken = await contract
        .createToken("metadata url");
      await newToken.wait();
      expect(await contract.getCurrentToken()).to.equal(
        prev_tokenId+1
      );
    });

    it("get token for new token id", async function () {
      const prev_tokenId = await contract.getCurrentToken();
      const response1 = await contract
        .createToken("metadata url");
      await response1.wait();
      const response2 = await contract.getTokenForId(
        parseInt(prev_tokenId) + 1
      );
      expect(response2.tokenId).to.equal(parseInt(prev_tokenId) + 1);
    });

    it("event emit", async function () {
      await expect(contract.createToken("metadata url")).to.emit(
        contract,
        "TokenStatusUpdatedSuccess"
      );
    });

    it("return new tokenid", async function () {
      const prev_tokenId = await contract.getCurrentToken();
      expect(
        await contract.connect(owner).callStatic.createToken("metadata url")
      ).to.equal(parseInt(prev_tokenId) + 1);
    });
  });

  describe("list minted token", function () {
    it("price should be positive", async function () {
      const newTokenId = await contract
        .callStatic.createToken("metadata url");
      const price = ethers.utils.parseEther("0");
      await expect(
        contract.ListToken(newTokenId, price)
      ).to.be.revertedWith("price should be positive");
    });
    it("price get updated", async function () {
      const newToken = await contract
        .createToken("metadata url");
      await newToken.wait();
      const newTokenId = await contract.getCurrentToken();
      const price = ethers.utils.parseEther("0.01");
      const response = await contract
        .ListToken(newTokenId, price);
      await response.wait();
      const response1 = await contract.getTokenForId(newTokenId);
      expect(response1.price).to.equal(price);
    });

    it("token get listed", async function () {
      const newToken = await contract
        .createToken("metadata url");
      await newToken.wait();
      const newTokenId = await contract.getCurrentToken();
      const price = ethers.utils.parseEther("0.001");
      const response = await contract.ListToken(newTokenId, price);
      await response.wait();
      const response1 = await contract.getTokenForId(newTokenId);
      expect(response1.currentlyListed).to.equal(true);
    });

    it("ownership of token should be changed", async function () {
      const newToken = await contract
        .createToken("metadata url");
      await newToken.wait();
      const newTokenId = contract.getCurrentToken();
      const price = ethers.utils.parseEther("0.001");
      const response = await contract
        .ListToken(newTokenId, price);
      await response.wait();
      const response2 = await contract.ownerOf(newTokenId);
      expect(response2).to.equal(contract.address);
    });
  });

  describe("get all nfts", function () {
    it("listed token count match the length of array", async function () {
      const newToken = await contract
        .createToken("metadata url");
      await newToken.wait();
      const newTokenId = contract.getCurrentToken();
      const prevArray = await contract.getAllNFTs();
      const price = ethers.utils.parseEther("0.001");
      const response = await contract
        .ListToken(newTokenId, price);
      await response.wait();
      const newArray = await contract.getAllNFTs();
      expect(newArray.length).to.equal(prevArray.length + 1);
    });
  });

  describe("get my nfts", function () {
    it("listed token count by one address match the length of array", async function () {
      const prevArray = await contract.connect(addr1).getMyNFTs();
      const newToken = await contract
        .connect(addr1)
        .createToken("metadata url");
      await newToken.wait();   
      const newArray = await contract.connect(addr1).getMyNFTs();
      expect(newArray.length).to.equal(prevArray.length + 1);
    });
  });

  describe("transfer nft", async function () {
    it("only seller can transfer", async function () {
      const newTokenId = await contract
      .connect(owner)
      .callStatic.createToken("metadata url");
      await expect(
        contract.connect(addr1).transferNFT(newTokenId, addr2.address)
      ).to.be.revertedWith("Only Seller can transfer the NFT");
    });

    it("token state changes to unlisted", async function () {
      const newToken = await contract
      .connect(addr2)
      .createToken("metadata url");
      await newToken.wait();
      const newTokenId = contract.getCurrentToken();
      const price = ethers.utils.parseEther("0.001");
      const response = await contract.connect(addr2).ListToken(newTokenId, price);
      await response.wait();
      const response1 = await contract
        .connect(addr2)
        .transferNFT(newTokenId, addr1.address);
      await response1.wait();
      const response2 = await contract.getTokenForId(newTokenId);
      expect(response2.currentlyListed).to.equal(false);
    });

    it("owner get changed", async function () {
      const newToken = await contract
      .connect(addr1)
      .createToken("metadata url");
      await newToken.wait();
      const newTokenId = contract.getCurrentToken();
      const response1 = await contract
        .connect(addr1)
        .transferNFT(newTokenId, addr2.address);
      await response1.wait();
      const response2 = await contract.getTokenForId(newTokenId);
      expect(response2.seller).to.equal(addr2.address);
    });
  });

  describe("execute sale", async function () {
    it("tokenID should be listed", async function () {
      const newToken = await contract
      .connect(addr1)
      .createToken("metadata url");
      await newToken.wait();
      const newTokenId = contract.getCurrentToken();
      await expect(contract.executeSale(newTokenId)).to.be.revertedWith(
        "tokenId is not listed"
      );
    });

    it("customer should have enough funds", async function () {
      const newToken = await contract
      .connect(addr1)
      .createToken("metadata url");
      await newToken.wait();
      const newTokenId = contract.getCurrentToken();
      const price = ethers.utils.parseEther("0.001");
      const response = await contract.connect(addr1).ListToken(newTokenId, price);
      await response.wait();
      await expect(contract.connect(addr2).executeSale(newTokenId)).to.be.revertedWith(
        "Not sufficient funds for execute sale"
      );
    });

    it("token get unlisted", async function () {
      const newToken = await contract
      .connect(addr1)
      .createToken("metadata url");
      await newToken.wait();
      const newTokenId = await contract.getCurrentToken();
      const price = ethers.utils.parseEther("0.01");
      const providedValue = ethers.utils.parseEther("0.02");
      const response = await contract.connect(addr1).ListToken(newTokenId, price);
      await response.wait();
      const response1 = await contract
        .connect(addr2)
        .executeSale(newTokenId, { value: providedValue });
      await response1.wait();
      const response2 = await contract.getTokenForId(newTokenId);
      expect(response2.currentlyListed).to.equal(false);
    });

    it("seller get changed", async function () {
      const newToken = await contract
      .connect(addr1)
      .createToken("metadata url");
      await newToken.wait();
      const newTokenId = await contract.getCurrentToken();
      const price = ethers.utils.parseEther("0.001");
      const providedValue = ethers.utils.parseEther("0.01");
      const response = await contract.connect(addr1).ListToken(newTokenId, price);
      await response.wait();
      const response1 = await contract
        .connect(addr2)
        .executeSale(newTokenId, { value: providedValue });
      await response1.wait();
      const response2 = await contract.getTokenForId(newTokenId);
      expect(response2.seller).to.equal(addr2.address);
    });

    it("sold count get incremented", async function () {
      const newToken = await contract
      .connect(addr1)
      .createToken("metadata url");
      await newToken.wait();
      const newTokenId = await contract.getCurrentToken();
      const prevSoldCount = await contract.getSoldItemCount();
      const price = ethers.utils.parseEther("0.001");
      const providedValue = ethers.utils.parseEther("0.01");
      const response = await contract.connect(addr1).ListToken(newTokenId, price);
      await response.wait();
      const response1 = await contract
        .connect(addr1)
        .executeSale(newTokenId, { value: providedValue });
      await response1.wait();
      const response2 = await contract.getSoldItemCount();
      expect(response2).to.equal(parseInt(prevSoldCount) + 1);
    });
  });

  describe("withdraw money", function () {
    it("Only owner can withdraw money", async function () {
      const withdrawAmount = ethers.utils.parseEther("0.001");
      await expect(contract.connect(addr1).withdraw(withdrawAmount)).to.be.revertedWith(
        "Ownable: caller is not the owner"
      );
    });

    it("owners' balance get updated", async function () {
      const newToken = await contract
      .connect(addr1)
        .createToken("metadata url");
        await newToken.wait();
      const newTokenId = await contract.getCurrentToken();
      const price = ethers.utils.parseEther("0.001");
      const providedValue = ethers.utils.parseEther("0.02");
      
      const response = await contract.connect(addr1).ListToken(newTokenId, price);
      await response.wait();
      const response1 = await contract
        .connect(addr2)
        .executeSale(newTokenId, { value: providedValue });
      await response1.wait();
      console.log("response1: ", response1);
      const accountBalanceBeforeWithdraw = await contract.provider.getBalance(owner.address);
      console.log("balance1: ", accountBalanceBeforeWithdraw);
      
      const withdrawAmount = ethers.utils.parseEther("0.01");
      await contract.connect(owner).withdraw(withdrawAmount);

      const accountBalanceAfterWithdraw = await contract.provider.getBalance(owner.address);
      console.log("balance: ", accountBalanceAfterWithdraw);

      expect(
        parseInt(accountBalanceAfterWithdraw) >
        parseInt(accountBalanceBeforeWithdraw)).to.be.true;
    });
  });

  describe("transfer NFT for time auction", function(){
    it("only owner can transfer", async function () {
      const newToken = await contract
      .createToken("metadata url");
       await newToken.wait();
       const newTokenId = await contract.getCurrentToken();
       const price = ethers.utils.parseEther("0.001");
       const response = await contract.ListToken(newTokenId, price);
      await response.wait();   
      await expect(
        contract.connect(addr1).transferNFTAfterTimeAuction(newTokenId, addr2.address,price)
      ).to.be.revertedWith("Ownable: caller is not the owner");
    });

  });
});
