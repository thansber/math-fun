import { load, save } from './store';
import { Operators } from './equations';

const EQUATION_PARAMS_KEY = '_equationParams_';
const HIGH_SCORES_KEY = '_highScores_';
const TIME_KEY = '_time_';

const DEFAULT_EQUATION_PARAMS = {
  min: 0,
  max: 9,
  operator: Operators.SUBTRACT
};
const DEFAULT_TIME = 10;
const DEFAULT_HIGH_SCORES = [
  { name: 'Todd', score: 123 },
  { name: 'Todd', score: 122 },
  { name: 'Todd', score: 121 },
  { name: 'Todd', score: 120 },
  { name: 'Madelyn', score: 65 },
  { name: 'Madelyn', score: 63 },
  { name: 'Will', score: 34 },
  { name: 'Will', score: 31 },
  { name: 'Renee', score: 2 },
  { name: 'Renee', score: 0 }
];

export const getSettings = () => {
  const equationParams = load(EQUATION_PARAMS_KEY, {
    toJson: true,
    valueIfNotDefined: DEFAULT_EQUATION_PARAMS
  });
  const highScores = load(HIGH_SCORES_KEY, {
    toJson: true,
    valueIfNotDefined: DEFAULT_HIGH_SCORES
  });
  const time = load(TIME_KEY, {
    valueIfNotDefined: DEFAULT_TIME
  });

  return {
    equationParams,
    highScores,
    time
  };
};

export const saveSettings = (operator, min, max, time) => {
  save(
    EQUATION_PARAMS_KEY,
    {
      operator,
      min: +min,
      max: +max
    },
    { toJson: true }
  );
  save(TIME_KEY, +time);
};

export const saveHighScores = scores => {
  save(HIGH_SCORES_KEY, scores.slice(0, 10), { toJson: true });
};
