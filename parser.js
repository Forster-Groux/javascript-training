'use strict';

var operators = ['+', '-', '*'];

function polishParser(expression) {
  var operations = expression.split(" ");

  function operate(operations) {
    var current = operations.shift();

    if (!operators.includes(current)) {
      return function() {
        return parseFloat(current) ?
               parseFloat(current) :
               this[current];
      }
    }

    var leftOperand = operate(operations);
    var rightOperand = operate(operations);

    var res = function() {
      switch (current) {
        case '+':
          return leftOperand.call(this) + rightOperand.call(this);
          break;
        case '-':
          return leftOperand.call(this) - rightOperand.call(this);
          break;
        case '*':
          return leftOperand.call(this) * rightOperand.call(this);
          break;
      }
    };

    return function() {
      return res.call(this);
    }
  }

  return operate(operations);
}

var expression = polishParser('- a 42');
console.log(expression.call({a: 84})); // prints 42
console.log(expression.call({a: 42})); // prints 0
