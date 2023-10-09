const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("MarketPlace contract", () => {

    it("Deployment should create the market for users", async () => {
        const [MarketPlaceContract] = await ethers.getSigners();

        const MarketPlace = await ethers.getContractFactory("dMarketPlace");

        const hardhatMarketPlace = await MarketPlace.deploy();

        const ownerAddress = await hardhatMarketPlace.owner();

        console.log("MarketPlace deployed to:", hardhatMarketPlace.address);
        console.log("MarketPlace owner:", ownerAddress);

        expect(await hardhatMarketPlace.owner()).to.equal(ownerAddress);
    });
});