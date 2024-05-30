const BigNumber = require('bignumber.js');

// Assuming id is a BigNumber
const id = new BigNumber('12345678901234567890');

// Check if it's a BigNumber and then convert it to a normal number
if (BigNumber.isBigNumber(id)) {
  const normalNumber = id.toNumber();
  console.log(normalNumber);
} else {
  console.error("id is not a BigNumber");
}
