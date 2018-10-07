const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');

const {interface, bytecode} = require('./compile');

const provider = new HDWalletProvider(

    'interest seed people rice mansion include pole pause twin merge enforce ladder',
    'https://rinkeby.infura.io/v3/c261cd3d0dc04d318e7e09389a6f85e8'

);

const web3 = new Web3(provider);

const deploy = async () =>{

    const accounts = await web3.eth.getAccounts();
    console.log('Attempting to deploy from ',accounts[0]);

   const result =  await new web3.eth.Contract(JSON.parse(interface)).deploy({
        data:bytecode,
        arguments:['Hi there']
    }).send({
        gas: '1000000',
        from: accounts[0]
    });

    console.log('Contract deployed to ',result.options.address);
};

deploy();
