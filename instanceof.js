// function myInstanceOf(val, Ctor) {
//   if (typeof val !== 'object') {
//     return false;
//   }
//
//   var prot = Object.getPrototypeOf(val);
//
//   if (!prot) {
//     return false;
//   }
//   if (prot === Ctor.prototype) {
//     return true;
//   }
//
//   return myInstanceOf(prot, Ctor);
// }

function myInstanceOf(val, Ctor) {
  if (typeof val !== 'object') {
    return false;
  }

  var prot = Object.getPrototypeOf(val);

  while (prot) {
    if (prot === Ctor.prototype) {
      return true;
    }

    prot = Object.getPrototypeOf(prot);
  }

  return false;
}

console.log(myInstanceOf({}, Object)); // should print true
console.log(myInstanceOf(42, Number)); // should print false
console.log(myInstanceOf(new Number(42), Number)); // should print true

function A() {}
function B() {}
B.prototype = Object.create(A.prototype);
var b = new B();
console.log(myInstanceOf(b, B)); // should print true
console.log(myInstanceOf(b, A)); // should print true
console.log(myInstanceOf(b, Object)); // should print true
console.log(myInstanceOf(b, Number)); // should print false
