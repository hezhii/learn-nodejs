var count = 0;

function increase() {
  return ++count;
}

module.exports = {
  count: count,
  increase: increase
};
