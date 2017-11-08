var count = require('./exports').count;
var increase = require('./exports').increase;

console.log(count); // 0
console.log(increase()); // 1
console.log(count); // 0

console.log(increase()); // 2
console.log(count); // 0
