const assert = require('assert');
const ganache = require('ganache-cli');

//capital => contructor
const Web3 = require('web3');

// connecting web3 and ganache(test network) using provider
const web3 = new Web3(ganache.provider());
const {interface , bytecode} = require('../compile');


// We are using mocha test framework
 
/*
 class Car{
 	park (){
 		return 'stopped';
 	}

 	drive(){
 		return 'vroom';
 	}
 }
let car;
beforeEach(() =>{
 	// it will run everytime before it statement
 	// some initialisation before test
 	car = new Car();
 	// now car variable is not available to it(Local scope)
 	
 });

describe('Car', ()=>{
	it('park_func',() =>{
		//test and assertion logic here
		// const car = new Car();
		assert.equal(car.park(), 'stopped');
	});
	it('drive',() =>{
		// const car = new Car;
		assert.equal(car.drive(), 'vroom');
	})
});
// To run mocha go to package.json and mocha to test
*/
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
