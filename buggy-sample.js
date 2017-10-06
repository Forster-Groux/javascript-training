function log(i) {
  return function() {
    console.log(i);
  }
}

for (var i = 0; i < 10; ++i) {
  setTimeout(log(i));
}
console.log(-1);
