const EventEmitter = require('events');

const emitter = new EventEmitter();

emitter.on('event', function(a, b) {
  console.log(a, b, this);
  console.log('================');
  // 打印:
  //   a b MyEmitter {
  //     domain: null,
  //     _events: { event: [Function] },
  //     _eventsCount: 1,
  //     _maxListeners: undefined }
});

emitter.on('event', (a, b) => {
  console.log(a, b, this);
  console.log('================');
  // 打印: a b {}
});

emitter.on('event', function(a, b) {
  console.log(a, b, this);
  console.log('================');
  // 打印: a b {}
}.bind(this));

emitter.emit('event', 'a', 'b');
