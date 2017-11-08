const EventEmitter = require('events');

const emitter = new EventEmitter();

emitter.once('newListener', (event, listener) => {
  if (event === 'event') {
    // 在开头插入一个新的监听器
    emitter.on('event', () => {
      console.log('B');
    });
  }
});

emitter.on('event', () => {
  console.log('A');
});

emitter.emit('event');
// 打印:
//   B
//   A
