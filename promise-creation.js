'use strict';

function Promise(callback) {
  this.onResolves = [];
  var resolve = function(value) {
    this.value = value;
    this.fullfiled = true;
    this.onResolves.forEach(function(onResolve) {
      onResolve();
    });
    //pour éviter les memory leaks
    this.onResolves = [];
  }.bind(this);

  callback(resolve);
}

Promise.prototype.then = function(next) {
  var onResolve = function(resolve) {
    var res = next(this.value);

    if (res instanceof Promise) {
      res.then(resolve);
    } else {
      resolve(res);
    }
  };

  var callback = function(resolve) {
    if (this.fullfiled) {
      return process.nextTick(onResolve.bind(this, resolve));
    } else {
      this.onResolves.push(onResolve.bind(this, resolve));

      // this.onResolve = onResolve.bind(this, resolve);
      // this.onResolve = function() {
      //   return onResolve(resolve);
      // };
    }
  }.bind(this);

  return new Promise(callback);
}

function timeoutPromise(value) {
  return new Promise(function(resolve) {
    setTimeout(function() {
      resolve(value);
    });
  });
}

function resolvedImmediately(value) {
  return new Promise(function(resolve) {
    resolve(value);
  });
}

new Promise(function() {
  console.log('this should be printed first');
});
console.log('this should be the second line');

timeoutPromise(42)
  .then(function(val) {
    console.log(val); // prints 42

    return timeoutPromise(21);
  })
  .then(function(val2) {
    console.log(val2); // prints 21
  })
;

resolvedImmediately(12)
  .then(function(val) {
    console.log(val); // prints 12
  })
;

var twoThings = timeoutPromise(6);

twoThings
  .then(function(val) {
    console.log(val); // prints 6

    return val * 2;
  })
;

twoThings
  .then(function(val) {
    console.log(val / 2); // prints 3

    return val * 2;
  })
;
