function myDot(obj, attr) {
  var descriptor = Object.getOwnPropertyDescriptor(obj, attr);
  
  if (descriptor) {
    return descriptor.value;
  }

  var prot = Object.getPrototypeOf(obj);

  if (prot) {
    return myDot(prot, attr);
  }

  return;
}

var obj = {a: 42};
console.log(myDot(obj, 'a')); // prints 42

var obj2 = Object.create(obj);
console.log(myDot(obj2, 'a')); // prints 42

console.log(myDot(obj2, 'b')); // prints undefined
