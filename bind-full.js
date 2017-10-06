function myBind(fn, context) {
  var args = Array.prototype.slice.call(arguments, 2);

  return function(bounded) {
    return fn.apply(context, args.concat([bounded]));
  }
};

function addToThis(a, b) {
  return this + a + (b || 0);
}

var bound = myBind(addToThis, 40, 2);
console.log(bound()); // prints 42

bound = myBind(addToThis, 10, 20, 12);
console.log(bound()); // prints 42

bound = myBind(addToThis, 32);
console.log(bound(10)); // prints 42
