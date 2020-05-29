/**
 * Generates a random integer in the range from start (inclusive) to end (exclusive)
 * @param {number} start
 * @param {number} end
 */
function randomInteger(start, end) {
  return start + Math.floor(Math.random() * (end - start));
}
/*
function randomBoolean() {
  return Math.random() < 0.5;
}
*/
function randomOneDigitNumber() {
  return randomInteger(0, 10);
}
/*
function randomTwoDigitNumber() {
  return randomInteger(0, 100);
}
*/

/**
 * Test if the given number is an integer
 * @param {number} num
 */
function isInteger(num) {
  return Math.floor(num) === num;
}

function randomMathExpression(numbers, operators) {
  if (numbers < 2) {
    throw new Error("Can not generate math expression with less than 2 numbers");
  }
  if (!operators.every((op) => ["+", "-", "*", "/"].includes(op))) {
    throw new Error(`Can not generate math expression with unknown operator: ${operators}`);
  }

  let expression = "";
  let result;
  do {
    expression = `${randomOneDigitNumber()}`;
    for (let i = 1; i < numbers; i++) {
      const opIndex = randomInteger(0, operators.length);
      expression += operators[opIndex];
      expression += randomOneDigitNumber();
    }
    //We construct expression with only numbers and the operators "+", "-", "*", "/", so its save to use eval()
    /* eslint-disable no-eval */
    result = eval(expression);
  } while (isNaN(result) || !isInteger(result) || result < 0 || result >= 10);

  return [expression, result];
}

export default function MathGenerator(level) {
  switch (level) {
    case 4:
      return randomMathExpression(4, ["+", "-", "*", "/"]);
    case 3:
      return randomMathExpression(4, ["+", "-", "*"]);
    case 2:
      return randomMathExpression(3, ["+", "-", "*"]);
    case 1:
      return randomMathExpression(3, ["+", "-"]);
    case 0:
    default:
      return randomMathExpression(2, ["+", "-"]);
  }
}
