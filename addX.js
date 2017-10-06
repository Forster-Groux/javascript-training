function addX(x) {
  return function(y) {
    return y + x;
  }
}

var add5 = addX(5);

console.log(add5(0), add5(37));
