/**
 * fetching data asynchronously
 *
 * @param {String} url - data url
 * @param {Object} [opts] - optional options
 * @param {Function} [callback] - call fired on
 */
function fetch(url, ...args) {
  if (!url) {
    throw new Error('You must specify URL');
  }
  let callback = args.pop();
  let opts = args.pop();
  if (typeof callback !== 'function') {
    opts = callback;
    callback = null;
  }

  let defaultOpts = {
    method: 'get'
  };
  opts = Object.assign({}, defaultOpts, opts);

  console.log('fetch url: %s, options: %s', url, JSON.stringify(opts));
  setTimeout(callback, 1000);
}

module.exports = fetch;
