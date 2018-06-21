const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const compiledFactory = require('./build/MembershipFactory.json');
const setup = require('./setup.json');
const fs = require('fs-extra');
const provider = new HDWalletProvider(
  setup.words,
  setup.infura,
);
const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log('Attempting to deploy from account', accounts[0]);

  const result = await new web3.eth.Contract(
    JSON.parse(compiledFactory.interface)
  )
    .deploy({ data: compiledFactory.bytecode })
    .send({ gas: '2000000', from: accounts[0] });

  console.log('Contract deployed to', result.options.address);
  var obj = {'address': result.options.address}
  fs.writeFile("address.json", JSON.stringify(obj), function(err) {
    if (err) throw err;
    console.log('address saved into address.json');
  }
);
  
};
deploy();
