Function.prototype.myCall = function(oThis) {
  var myArray = Array.prototype.slice.call(arguments, 1);
  return this.apply(oThis, myArray);
};

function addToThis(a, b) {
  return this + a + b;
}

console.log(addToThis.call(30, 7, 5) + ' = ' + addToThis.myCall(30, 7, 5));
