const ADD = 'addition';
const SUBTRACT = 'subtraction';
const MULTIPLY = 'mulitplication';
const DIVIDE = 'division';

export const Operators = {
  ADD,
  SUBTRACT,
  MULTIPLY,
  DIVIDE
};

const randomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const generateEquation = (min, max, operator) => {
  let operand1 = randomInt(min, max);
  let operand2 = randomInt(min, max);
  switch (operator) {
    case ADD:
      return {
        operand1,
        operand2,
        operator: '+',
        answer: operand1 + operand2
      };
    case SUBTRACT:
      operand1 = Math.max(operand1, operand2);
      operand2 = Math.min(operand1, operand2);
      return {
        operand1,
        operand2,
        operator: '-',
        answer: operand1 - operand2
      };
  }
};
