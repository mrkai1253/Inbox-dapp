const assert = require('assert');
const ganache = require('ganache-cli');

//capital => contructor
const Web3 = require('web3');

// connecting web3 and ganache(test network) using provider
const web3 = new Web3(ganache.provider());
const {interface , bytecode} = require('../compile');

let accounts;
let inbox;
beforeEach(async () =>{
	// Get a list of all accounts
	accounts = await web3.eth.getAccounts();
	// Use one of those accounts to deploy the contract
	inbox = await new web3.eth.Contract(JSON.parse(interface))
		.deploy({
			data: bytecode,
			arguments:['Hi there'] //arguments in the contract constructor
		})
		.send({from:accounts[0],
				gas:'1000000'
		});


});

describe('Inbox',()=>{
	it('deploys a contract ',()=>{
		// console.log(inbox);
		assert.ok(inbox.options.address);
		// Check of the parameter is valid
	});

	it('has a default message',async () =>{
		const message = await inbox.methods.message().call();
		assert.equal(message, 'Hi there');
	});

	it('can change the message', async () =>{
		await inbox.methods.setMessage('Bye').send({from :accounts[0]}); 
		// when ever we send a transaction we get back transaction hash
		// a reciept
		const message = await inbox.methods.message().call();
		console.log(message);
		assert.equal(message, 'Bye');
	});
});
