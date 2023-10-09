async function main() {
    const [deployer] = await ethers.getSigners();
    const MarketPlace = await ethers.getContractFactory("dMarketPlace");

    const hardhatMarketPlace = await MarketPlace.deploy();
    console.log("MarketPlace deployed to:", hardhatMarketPlace.address);
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    }
    );