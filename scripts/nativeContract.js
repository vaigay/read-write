require("dotenv").config();
const Caver = require("caver-js");
const fs = require("fs");
const token = "";

async function runSomeExample() {
  // config provider
  const caver = new Caver("https://kaikas.baobab.klaytn.net:8651/");

  // load abi
  const abi = JSON.parse(
    fs.readFileSync("./build/contracts/TokenImplementation.json", "utf8")
  ).abi;
  // console.log(abi);

  var myContract = new caver.klay.Contract(abi, token, {
    from: process.env.KEY, // default from address
    gasPrice: "25000000000", // default gas price in peb, 25 Gpeb in this case
  });

  const result = await myContract.methods
    .nativeContract()
    .call();
  console.log(result);
}

runSomeExample();