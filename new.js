function myNew(Ctor, arg) {
  var obj = {};
  obj.__proto__ = Ctor.prototype;
  var constructed = Ctor.call(obj, arg);
  return constructed instanceof Object ? constructed : obj;
}

function MyCtor(arg) {
  if (arg)
    return {test: 42};

  this.arg = 21;
  return 42;
}
MyCtor.prototype.sayHello = function() {
  console.log('hello');
};

var obj = myNew(MyCtor, 42);
console.log(obj instanceof MyCtor); // should print false
console.log(obj.test); // should print 42

obj = myNew(MyCtor);
console.log(obj.arg); // should print 21
console.log(obj instanceof MyCtor); // should print true
obj.sayHello(); // should print hello
