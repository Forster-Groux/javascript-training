'use strict';

function myDp(obj, attr, mode, valueOrGetter, setter) {
  if (arguments.length === 3) {
    var descriptor = {
      writable: true,
      configurable: true,
    };

    if (mode instanceof Function) {
      descriptor['get'] = mode;
    } else {
      descriptor['value'] = mode;
    }

    Object.defineProperty(obj, attr, descriptor);

    return;
  }

  var descriptor = getDescriptorMode(mode);

  if (mode && mode.includes('#')){
    if (valueOrGetter) {
      descriptor['get'] = valueOrGetter;
    }

    if (setter) {
      descriptor['set'] = setter;
    }
  } else {
    descriptor['value'] = valueOrGetter;
  }

  Object.defineProperty(obj, attr, descriptor);
}

function getDescriptorMode(mode) {
  if (!mode && (mode !== '')) {
    return {
      writable: true,
      configurable: true,
    };
  }

  var descriptor = {};

  if (mode.includes('e')) {
    descriptor['enumerable'] = true;
  }
  if (mode.includes('w')) {
    descriptor['writable'] = true;
  }
  if (mode.includes('c')) {
    descriptor['configurable'] = true;
  }

  return descriptor;
}

var obj = {};

console.log('-- a --');
myDp(obj, 'a', 42);
console.log(obj.a); // prints 42
var apd = Object.getOwnPropertyDescriptor(obj, 'a');
console.log(apd.enumerable); // prints false
console.log(apd.writable); // prints true
console.log(apd.configurable); // prints true

console.log('\n-- b --');
myDp(obj, 'b', 'e', 42);
console.log(obj.b); // prints 42
var apd = Object.getOwnPropertyDescriptor(obj, 'b');
console.log(apd.enumerable); // prints true
console.log(apd.writable); // prints false
console.log(apd.configurable); // prints false

console.log('\n-- c --');
myDp(obj, 'c', null, '42');
console.log(obj.c); // prints 42
var apd = Object.getOwnPropertyDescriptor(obj, 'c');
console.log(apd.enumerable); // prints false
console.log(apd.writable); // prints true
console.log(apd.configurable); // prints true

console.log('\n-- d --');
myDp(obj, 'd', '', '42');
console.log(obj.d); // prints 42
var apd = Object.getOwnPropertyDescriptor(obj, 'd');
console.log(apd.enumerable); // prints false
console.log(apd.writable); // prints false
console.log(apd.configurable); // prints false

console.log('\n-- get --');
myDp(obj, 'get', '#ec', function() {
  return 42;
});
console.log(obj.get); // prints 42
try {
  obj.get = 21;
  console.log('should not be printed!');
}
catch (e) {
  console.log('should be there');
}
