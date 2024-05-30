const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const fs = require('fs');

const web3 = createAlchemyWeb3('https://api.avax-test.network/ext/bc/C/rpc');
const contractABI = require('./contractABI.json').abi;
const contractAddress = '0x312F15F2444fB94c9aE0a979ad2008a53977094a';

async function sample() {
    const contract = new web3.eth.Contract(contractABI, contractAddress);

    try {
        const storedValue = await contract.methods.returnData().call();
        console.log('Stored Value:', storedValue);

        const storedValueString = JSON.stringify(storedValue);

        fs.writeFileSync('stored_value.txt', storedValueString, 'utf-8');

    } catch (error) {
        console.error('Error:', error);
    }
}

sample();
