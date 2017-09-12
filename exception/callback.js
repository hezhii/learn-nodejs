const fetch = require('./fetch');

function callback() {
  throw new Error('Throw error form callback function');
}

// 可以 catch 住 fetch 函数直接抛出的异常
try {
  fetch();
} catch (e) {
  console.log(e.message);
}

// 无法 catch 住回调函数中抛出的异常
try {
  fetch('test', callback);
} catch (e) {
  console.log(e.message);
}
