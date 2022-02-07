require("dotenv").config();
const Caver = require("caver-js");
const fs = require("fs");
const tokenbridge_address = process.env.TOKEN_BRIDGE;

async function runSomeExample() {
  // config provider
  const caver = new Caver("https://kaikas.baobab.klaytn.net:8651/");

  // load abi
  const abi = JSON.parse(
    fs.readFileSync("./build/contracts/BridgeImplementation.json", "utf8")
  ).abi;
  // console.log(abi);

  var myContract = new caver.klay.Contract(abi, tokenbridge_address, {
    from: process.env.KEY, // default from address
    gasPrice: "25000000000", // default gas price in peb, 25 Gpeb in this case
  });

  const result = await myContract.methods
    .isWrappedAsset("0xb10A7Fe1B6131E7d6a1630977Ae79E858a5b361B")
    .call();
  console.log(result);
}

runSomeExample();
