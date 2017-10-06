function simpleThis() {
  return this + 12;
}

console.log(simpleThis.call(30));
console.log(simpleThis.apply(30));

function simpleThis2(a) {
  console.log('a = ' + a);
  return this + a;
}

console.log(simpleThis2.call(27, 15));
console.log(simpleThis2.apply(14, [28]));
