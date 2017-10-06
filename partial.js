function partial(fn) {
  var fnArgs = Array.prototype.slice.call(arguments, 1);

  return function() {
    var args = Array.prototype.slice.call(arguments);

    return fn.apply(this, fnArgs.concat(args));
  }
}

function add(a, b, c, d) {
  console.log(this);
  return a + b + c + d;
}

var add5 = partial(add, 5, 4);
console.log(add5.call('this should be printed', 0, 1), add5.call('', 37, 2));

module.exports = partial;
