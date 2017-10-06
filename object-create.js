function myObjectCreate(obj, propertiesObject) {
  var created = function() {
    Object.defineProperties(this, propertiesObject || {});
  };
  created.prototype = obj;
  return new created();
  // other way to code this :
  // return Object.defineProperties(new created(), propertiesObject || {});
}

var obj = {test: 42};
var obj2 = myObjectCreate(obj);

console.log(obj2.test); // prints 42

obj2.test = 21;
console.log(obj2.test); // prints 21

delete obj2.test;
console.log(obj2.test); // prints 42
console.log(obj2.__proto__ === obj); // prints true

var obj3 = {};
var obj4 = myObjectCreate(obj3, {test: {value: 84}});
console.log(obj4.test); // prints 84
