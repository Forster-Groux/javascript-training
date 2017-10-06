var partial = require('./partial');

function curry(fn, arity = fn.length) {
  return function() {
    if (arguments.length >= arity) {
      return fn.apply(this, arguments);
    }

    var args = Array.prototype.slice.call(arguments);

    return curry(partial.apply(this, [fn].concat(args)), arity - args.length);
  }
}

function add(a, b, c, d) {
  return a + b + c + (d || 0);
}

var curried = curry(add);
console.log(curried(11, 11, 11, 9)); // prints 42
console.log(curried(11)(11)(11)(9)); // prints 42

curried = curry(add, 3);
console.log(curried(15, 15)(12)); // prints 42
console.log(curried(15, 15)(10, 2)); // prints 42

console.log(typeof curried(15)(15)); // prints function

function printThis() {
  console.log(this);
}
curried = curry(printThis, 1);
curried
  .call('this will be ignored here (no arguments)')
  .call('This is awesome', 'run') // prints This is awesome
;
