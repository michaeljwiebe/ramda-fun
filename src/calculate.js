// You are building an educational website and want to create a simple calculator for students to use. The calculator will only allow addition and subtraction of non-negative integers.

// Given an expression string using the "+" and "-" operators like "5+16-2", write a function to find the total.

// Sample input/output:
console.log(calculate("255")); // => 255
console.log(calculate("6+9-12")); //  => 3
console.log(calculate("100+200+300")); // => 600
console.log(calculate("1+2-3+4-5+6-7")); // => -2
console.log(calculate("0-1-2-3")); // => -6 
console.log(calculate("1-2-3-0")); // => -4

// n: length of the input string
// var splitString6 = string6.split(/split|splat|splot/);

"use strict";

const expression1 = "6+9-12"; // = 3
const expression2 = "1+2-3+4-5+6-7"; // = -2
const expression3 = "100+200+300"; // = 600
const expression4 = "1-2-3-0"; // = -4
const expression5 = "255"; // = 255
const expression6 = "0-1-2-3"; // = -6


function plusOrMinus(operator, numStr, sum) {
  var num = Number(numStr);
  return operator === '+' ? sum + num : sum - num;
}

function calculate(numString) {
  var lastOperator = '';
  var numStr = '';
  var sum = 0;
  for (var i = 0; i < numString.length; i++) {
    var char = numString[i];
    if (char === '-' || char === '+') {
      if (lastOperator) {
        sum = plusOrMinus(lastOperator, numStr, sum);
      } else {
        sum = Number(numStr);
      }
      numStr = '';
      lastOperator = char;
    } else if (char.match(/[0-9]/)) {
      numStr += char;
    }
    if (i === numString.length - 1) {
      sum = plusOrMinus(lastOperator, numStr, sum);
    }
  }
  return sum;
}
