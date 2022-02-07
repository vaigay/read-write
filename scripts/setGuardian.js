

/**
 * Change env and guardian set here
 *
 */

const arrayOfGuardian = ["0x43b2F27B85d990322FA173938D13D4e866bCA526","0xC6F55f4E7C0DCE69dfB49DccC6BB970f9DE43529","0xF87600D509D7D6E89578148131F7Ee11CB140BF6","0x6A130e04f2Cd94358d70d3cd562420aB326bbcf0"]

require("dotenv").config();
const Caver = require("caver-js");
const fs = require("fs");
const wormhole_address = process.env.WORM_HOLE;

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
    fs.readFileSync("./build/contracts/Implementation.json", "utf8")
  ).abi;
  // console.log(abi);

  var myContract = new caver.klay.Contract(abi, wormhole_address, {
    from: process.env.KEY, // default from address
    // gasPrice: "25000000000", // default gas price in peb, 25 Gpeb in this case
  });

  // console.log(caver.accounts)
  await myContract.methods
    .chainId()
    .call({ from: process.env.KEY }, function (error, result) {
      console.log(result);
    });

  let guardianSetIndex = await myContract.methods
    .getCurrentGuardianSetIndex()
    .call({ from: process.env.KEY }, function (error, result) {
      console.log("*** Guardian Current ***");
      console.log("guardianSetIndex:" + result);
    });

  await myContract.methods
    .getGuardianSet(guardianSetIndex)
    .call({ from: process.env.KEY }, function (error, result) {
      // console.log("*** Guardian Current ***");
      console.log("guardianSet:\n" + result);
    });
  // const account = new caver.account(keyring._address, keyring._key._privateKey)

  // const result = await myContract.methods
  //   .submitNewGuardianSet(arrayOfGuardian)
  //   .send({ from: process.env.KEY, gas: 823463 });

  // console.log(result);

  guardianSetIndex = await myContract.methods
    .getCurrentGuardianSetIndex()
    .call({ from: process.env.KEY, gas: 1500000 }, function (error, result) {
      console.log("*** Guardian Current ***");
      console.log("guardianSetIndex:" + result);
    });

  await myContract.methods
    .getGuardianSet(guardianSetIndex)
    .call({ from: process.env.KEY }, function (error, result) {
      console.log("guardianSet:\n" + result);
    });
}

runSomeExample();
