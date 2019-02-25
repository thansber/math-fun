import { load, save } from './store';
import { Operators } from './equations';

const BG_COLOR_KEY = '_bgColor_';
const EQUATION_PARAMS_KEY = '_equationParams_';
const HIGH_SCORES_KEY = '_highScores_';
const TIME_KEY = '_time_';

const DEFAULT_EQUATION_PARAMS = {
  min: 0,
  max: 9,
  operator: Operators.ADD
};
const DEFAULT_TIME = 60;
const DEFAULT_HIGH_SCORES = [];
const DEFAULT_BG_COLOR = '444444';

export const MAX_NUM_HIGH_SCORES = 10;

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
  const bgColor = load(BG_COLOR_KEY, {
    valueIfNotDefined: DEFAULT_BG_COLOR
  });

  return {
    bgColor,
    equationParams,
    highScores,
    time
  };
};

export const saveSettings = (operator, min, max, time, bgColor) => {
  save(BG_COLOR_KEY, bgColor);
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
  save(HIGH_SCORES_KEY, scores.slice(0, MAX_NUM_HIGH_SCORES), { toJson: true });
};
