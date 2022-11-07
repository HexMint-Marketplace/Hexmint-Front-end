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
    it("it should be contract address calling", async function () {
      const _newListPrice = ethers.utils.parseUnits("0.001", "ether");
      expect(
        contract.connect(addr1).updateListPrice(_newListPrice)
      ).to.be.revertedWith("Ownable: caller is not the owner");
    });

    it("should set new list price", async function () {
      const _newListPrice = ethers.utils.parseEther("0.01");
      const response = await contract
        .connect(owner)
        .updateListPrice(_newListPrice);
      await response.wait();
      expect(await contract.getListPrice()).to.equal(_newListPrice);
    });
  });

  describe("get list price", function () {
    it("should get list price", async function () {
      const _newListPrice = ethers.utils.parseEther("0.001");
      const response = await contract
        .connect(owner)
        .updateListPrice(_newListPrice);
      await response.wait();
      expect(await contract.getListPrice()).to.equal(_newListPrice);
    });
  });

  describe("get sold item count", function () {
    it("should get sold items count", async function () {
      const prev_count = await contract.getSoldItemCount();
      const response = await contract
        .connect(owner)
        .createToken("metadata url");
      await response.wait();
      //implement
    });
  });

  describe("get token object for tokenId", function () {
    it("return token view", async function () {
      //change owner to other signer(signers getting undefined for now)
      const prev_tokenId = await contract.getCurrentToken();
      const response1 = await contract
        .connect(owner)
        .createToken("metadata url");
      await response1.wait();
      const response2 = await contract.getTokenForId(
        parseInt(prev_tokenId) + 1
      );
      expect(response2.tokenId).to.equal(parseInt(prev_tokenId) + 1);
    });
  });

  describe("get current token", function () {
    it("return tokenid view", async function () {
      // const prev_tokenId = await contract.getCurrentToken();
      // expect(
      //   response2.tokenId
      // ).to.be.is.
      // const response1 = await contract
      //   .connect(owner)
      //   .createToken("metadata url");
      // await response1.wait();
      // const response2 = await contract.getTokenForId(parseInt(prev_tokenId)+1);
      // expect(
      //   response2.tokenId
      // ).to.equal(parseInt(prev_tokenId) + 1);
    });
  });

  describe("create(mint) token", function () {
    it("token id should increment", async function () {
      const prev_tokenId = await contract.getCurrentToken();
      const response = await contract
        .connect(owner)
        .createToken("metadata url");
      await response.wait();
      console.log("response: ", response);
      expect(await contract.getCurrentToken()).to.equal(
        parseInt(prev_tokenId) + 1
      );
    });

    it("get token for new token id", async function () {
      //change owner to other signer(signers getting undefined for now)
      const prev_tokenId = await contract.getCurrentToken();
      const response1 = await contract
        .connect(owner)
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
    it("should listing cost would be same", async function () {
      const tokenId = 1;
      const price = ethers.utils.parseEther("0.001");
      const value = ethers.utils.parseEther("0.01");
      expect(
        contract.ListToken(tokenId, price, { value: value.toString() })
      ).to.be.revertedWith("Hopefully sending the correct price");
    });
    it("price should be positive", async function () {
      const tokenId = 1;
      const price = ethers.utils.parseEther("0.001");
      const value = ethers.utils.parseEther("0.01");
      expect(
        contract.ListToken(tokenId, price, { value: value.toString() })
      ).to.be.revertedWith("Make sure the price isn't negative");
    });
    it.only("price get updated", async function () {
      const newTokenId = await contract
        .connect(owner)
        .callStatic.createToken("metadata url");
        console.log("new token: ", newTokenId);
      const price = ethers.utils.parseEther("0.001");
      const value = ethers.utils.parseEther("0.01");
      const response = await contract.ListToken(newTokenId, price, {
        value: value.toString(),
      });
      await response.wait();
      const response1 = await getTokenForId(tokenId);
      await response1.wait();
      expect(response1.price).to.equal(price);
    });

    it("token get listed", async function () {
      const tokenId = 1;
      const price = ethers.utils.parseEther("0.001");
      const value = ethers.utils.parseEther("0.01");
      const response = await contract.ListToken(tokenId, price, {
        value: value.toString(),
      });
      await response.wait();
      const response1 = await getTokenForId(tokenId);
      await response1.wait();
      expect(response1.currentlyListed).to.equal(true);
    });

    it("ownership of token should be changed", async function () {
      expect("function should be implemented").to.equal(
        "function should be implemented"
      );
    });
  });

  describe("get all nfts", function () {
    it("listed token count match the length of array", async function () {
      expect("function should be implemented").to.equal(
        "function should be implemented"
      );
    });
  });

  describe("get my nfts", function () {
    it("listed token count by one address match the length of array", async function () {
      expect("function should be implemented").to.equal(
        "function should be implemented"
      );
    });
  });

  describe("transfer nft", function () {
    it("token get unlisted if it was listed", async function () {
      expect("function should be implemented").to.equal(
        "function should be implemented"
      );
    });
    it("only seller can transfer", async function () {
      expect("function should be implemented").to.equal(
        "function should be implemented"
      );
    });
    it("owner get changed", async function () {
      expect("function should be implemented").to.equal(
        "function should be implemented"
      );
    });
    it("seller get changed", async function () {
      expect("function should be implemented").to.equal(
        "function should be implemented"
      );
    });
  });

  describe("execute sale", function () {
    it("passed value equal to the price", async function () {
      expect("function should be implemented").to.equal(
        "function should be implemented"
      );
    });
    it("token get unlisted", async function () {
      expect("function should be implemented").to.equal(
        "function should be implemented"
      );
    });
    it("seller get changed", async function () {
      expect("function should be implemented").to.equal(
        "function should be implemented"
      );
    });
    it("owner get changed", async function () {
      expect("function should be implemented").to.equal(
        "function should be implemented"
      );
    });
    it("sold count get incremented", async function () {
      expect("function should be implemented").to.equal(
        "function should be implemented"
      );
    });
  });
  describe("withdraw money", function () {
    it("owners' balance get updated", async function () {
      console.log("CA: ", await ethers.provider.getBalance(contract.address));
      // console.log("CA: ", await contract.getContractAddress());
      newTokenId = await contract
        .connect(owner)
        .callStatic.createToken("metadata url");
      console.log("tokenid: ", newTokenId);
      const response2 = await contract.getTokenForId(newTokenId);
      console.log("owner: ", response2.seller);
      const response = await contract
        .connect(owner)
        .transferNFT(newTokenId, addr1);
      await response.wait();
      const response3 = await contract.getTokenForId(newTokenId);
      console.log("owner: ", response3.seller);
      console.log(
        "new balance: ",
        await ethers.provider.getBalance(contract.address)
      );
      expect("function should be implemented").to.equal(
        "function should be implemented"
      );
    });
  });
});
