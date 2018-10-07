const path = require('path');
const fs = require('fs');
const solc = require('solc'); //The solidity compiler


//for different os
const inboxPath = path.resolve(__dirname,'contracts','inbox.sol')
const source = fs.readFileSync(inboxPath, 'utf8');


module.exports = solc.compile(source, 1).contracts[':Inbox']; // 1 for the number of contracts
