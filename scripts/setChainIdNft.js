
// const wormhole_address = "0xE6Df1E6C6A0E6C3D01Ca482a22Ecd3bF52A0f97D";


async function runSomeExample (){
    require("dotenv").config();
    const NFTBridgeEntrypoint = process.env.NFTBRIDGEENTRYPOINT;

  const Web3 = require("web3");
//   const HDWalletProvider = require("truffle-hdwallet-provider-klaytn");
  const HDWalletProvider = require("@truffle/hdwallet-provider");
  // load truffle contract
  const truffleContract = require("truffle-contract");

  const memonic = process.env.KLAYTN_MNEMONIC;
  const pk = process.env.KEY
  const provider_url = process.env.KLAYTN_PROVIDER;
  let  provider = new HDWalletProvider(memonic, provider_url);

  const web3 = new Web3(provider);


  const TokenBridgeSmartContract = truffleContract(
    require(
        "../build/contracts/NFTBridgeImplementation.json"
    )
  );
  
  TokenBridgeSmartContract.setProvider(web3.currentProvider);
  const TokenBridgeInstance = await TokenBridgeSmartContract.at(NFTBridgeEntrypoint);   
  var bridgeContracts =
    await TokenBridgeInstance.bridgeContracts(4097);
    console.log("bridgeContracts" + bridgeContracts);  

    // registry
    try {
      const a = await TokenBridgeInstance.registerChain("0x0100000006020057572c391a74e6ee9279e6ad411d3cba6c14a28e03b88b6abd2f705d1a433c0d31caaf46965f735c1925197df1b52bfa621ebc7561d21ab60c3aa9e03b91b2e30101186fa3df3ddd41ad9aeba0a56d35d7bd2f42ebf344eb2300fc39d20ab3041b0652334d6f8ea0526576ae32f3a7e1dec0c6ed1712ddc74bfdd7a6b615dd60d6350000000000df94f48200010000000000000000000000000000000000000000000000000000000000000004913f7e1f717374392000000000000000000000000000000000000000000000004e46544272696467650100001001000000000000000000000000bcdf7d04e8664ef4cc66cca0835d93e57a846866",{from: pk})
      console.log(a)
    }catch(e){
      console.log(e)
    }
    bridgeContracts =
    await TokenBridgeInstance.bridgeContracts(4097);
    console.log("bridgeContracts" + bridgeContracts); 
}

runSomeExample()

