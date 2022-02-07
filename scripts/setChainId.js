require("dotenv").config();
const Caver = require("caver-js");
const fs = require("fs");
const tokenbridge_address = process.env.TOKEN_BRIDGE;
const bytes_data = "0x0100000000010002d3bd709187e69ac3c53e2c53b9fd7e56dfc4db495720c93ffa17cf2eb6e41122994a497156809cbc813a8b4541148a2cf6b611629a2ffa61a3a2edbf531e1100000000010000000100010000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000546f6b656e4272696467650100000002000000000000000000000000d734fe34d7904804a64a7f8a91e21bbcdf6603e3";

async function runSomeExample() {
  // config provider
  const caver = new Caver("https://kaikas.baobab.klaytn.net:8651/");

  // add account
  const keystore = fs.readFileSync("./keystore.json", "utf8");

  // Decrypt keystore
  const keyring = caver.wallet.keyring.decrypt(keystore, "12345678");
  // console.log(keyring._key._privateKey);

  // Add to caver.wallet
  // caver.klay.accounts.wallet.add(keyring);
  caver.klay.accounts.wallet.add({
    address: keyring._address,
    privateKey: keyring._key._privateKey,
  });

  // load abi
  const abi = JSON.parse(
    fs.readFileSync("./build/contracts/Bridge.json", "utf8")
  ).abi;

  var myContract = new caver.klay.Contract(abi, tokenbridge_address, {
    from: process.env.KEY, // default from address
    gasPrice: "25000000000", // default gas price in peb, 25 Gpeb in this case
  });

  await myContract.methods
    .bridgeContracts(2)
    .call({ from: process.env.KEY }, function (error, result) {
      console.log(result);
    });

  // const result = await myContract.methods
  //   .registerChain(bytes_data)
  //   .send({ from: process.env.KEY, gas: 523463 });

  // console.log(result);

  await myContract.methods
    .bridgeContracts(4097)
    .call({ from: process.env.KEY }, function (error, result) {
      console.log(result);
    });
}

runSomeExample();
