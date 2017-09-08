'use strict';

console.log('[agent] Agent start');
process.send({
  action: 'agent-start'
});

let counter = 5;
setInterval(() => {
  if (counter) {
    console.log(`[agent] Will throw error after ${counter--} s ...`);
  } else {
    throw new Error('[agent] Throw error...');
  }
}, 1000);
