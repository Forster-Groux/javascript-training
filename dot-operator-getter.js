function myDot(obj, attr) {
  function subDot(o, a) {
    var descriptor = Object.getOwnPropertyDescriptor(o, a);

    if (descriptor) {
      return descriptor.hasOwnProperty('value') ? descriptor.value : descriptor.get.call(obj);
    }

    var prot = Object.getPrototypeOf(o);

    if (prot) {
      return subDot(prot, a);
    }

    return;
  }

  return subDot(obj, attr);
}

var obj = {
  a: 42,
  b: false,
  c: undefined,
  get getter() {
    return this.a - 21;
  },
  get falseGetter() {
    return false;
  },
};
console.log(myDot(obj, 'a')); // prints 42
console.log(myDot(obj, 'getter')); // prints 21
console.log(myDot(obj, 'b')); // prints false
console.log(myDot(obj, 'falseGetter')); // prints false
console.log(myDot(obj, 'c')); // prints undefined

var obj2 = Object.create(obj);
obj2.a = 12;
console.log(myDot(obj2, 'a')); // prints 12
console.log(myDot(obj2, 'getter')); // prints -9
console.log(myDot(obj2, 'b')); // prints false
