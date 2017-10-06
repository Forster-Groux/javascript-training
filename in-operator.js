function myIn(attr, obj) {
  var descriptor = Object.getOwnPropertyDescriptor(obj, attr);

  if (descriptor) {
    return true;
  }

  var prot = Object.getPrototypeOf(obj);

  if (prot) {
    return myIn(attr, prot);
  }

  return false;
}

var obj = {test: 42};
console.log(myIn('test', obj)); // prints true
console.log(myIn('tset', obj)); // prints false

var obj2 = Object.create(obj);
console.log(myIn('test', obj2)); // prints true
console.log(myIn('tset', obj2)); // prints false

var obj3 = Object.create(obj2);
console.log(myIn('test', obj3)); // prints true
console.log(myIn('tset', obj3)); // prints false
