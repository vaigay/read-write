require("dotenv").config();
const Caver = require("caver-js");
const fs = require("fs");
const tokenbridge_address = process.env.TOKEN_BRIDGE;
const tokenAddress = "0x665552B356991308987b805C043a4b445041179d"
var nonce = 50

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
    fs.readFileSync("./build/contracts/BridgeImplementation.json", "utf8")
  ).abi;
  // console.log(abi);

  var myContract = new caver.klay.Contract(abi, tokenbridge_address, {
    from: process.env.KEY, // default from address
    gasPrice: "25000000000", // default gas price in peb, 25 Gpeb in this case
  });

  // registry
  const result = await myContract.methods
    .attestToken(
     tokenAddress, nonce
    )
    .send({ from: process.env.KEY, gas: 10000000 });
  console.log(result);
}

runSomeExample();
