import { load, save } from './store';

const EQUATION_PARAMS_KEY = '_equationParams_';
const HIGH_SCORES_KEY = '_highScores_';
const TIME_KEY = '_time_';

const DEFAULT_EQUATION_PARAMS = {
  min: 0,
  max: 9,
  operator: 'addition'
};
const DEFAULT_TIME = 3;
const DEFAULT_HIGH_SCORES = [
  { name: 'Todd', score: 123 },
  { name: 'Madelyn', score: 65 },
  { name: 'Will', score: 34 },
  { name: 'Renee', score: 2 }
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

export const saveHighScores = scores => {
  save(HIGH_SCORES_KEY, scores, { toJson: true });
};
