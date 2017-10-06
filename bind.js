function myBind(fn, a) {
  return function(b) {
    return fn.call(a, b);
  }
}

function simpleTest(a) {
  console.log(this);
  console.log(a);

  return 'toto';
}

var bound = myBind(simpleTest, 42);
bound('a is a superb string');

console.log('--');

bound = myBind(simpleTest, {test: 42});
console.log('The answer is: ' + bound('oh yes it is! (not like this)'));
