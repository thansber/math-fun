export const ADD = 'addition';
export const SUBTRACT = 'subtraction';
export const MULITPLY = 'mulitplication';
export const DIVIDE = 'division';

const randomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const generateEquation = (min, max, operator) => {
  switch (operator) {
    case ADD:
      const operand1 = randomInt(min, max);
      const operand2 = randomInt(min, max);
      return {
        operand1,
        operand2,
        operator: '+',
        answer: operand1 + operand2
      };
  }
};
