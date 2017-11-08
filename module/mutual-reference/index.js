console.log('index 开始');
const a = require('./a.js');
const b = require('./b.js');
console.log('在 index 中，a.done=%j，b.done=%j', a.done, b.done);
