require("dotenv").config();
var Web3 = require("web3");
// web3.setProvider(myProvider)
var web3 = new Web3(
  "wss://KASKZCTSDT07NI1PM54OKL85:nPFDFf1Qh3Zy5VfNmYwl3WV_Vq_R_Dmo3cBtncbP@node-api.klaytnapi.com/v1/ws/open?chain-id=1001"
);
async function runSomeExample() {
  // config provider
  console.log("runsomeexample");
  var subscription = web3.eth
    .subscribe(
      "logs",
      {
        address: "0xD1447AC084245202D0D57a6FE0b4d250Cd62B31b",
        topics: null,
      },
      function (error, result) {
        if (!error) console.log(result);
      }
    )
    .on("connected", function (subscriptionId) {
      console.log("connected");
      console.log(subscriptionId);
    })
    .on("data", function (log) {
      console.log(log);
    })
    .on("changed", function (log) {
      console.log(log);
    });
}

runSomeExample();
