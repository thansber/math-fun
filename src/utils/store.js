const loadFromLocalStorage = (key, { toJson, valueIfNotDefined } = {}) => {
  const value = localStorage.getItem(key);
  if (value === null || value === undefined) {
    return valueIfNotDefined;
  }

  return toJson ? JSON.parse(value) : value;
};

const saveToLocalStorage = (key, value, { toJson } = {}) => {
  const valueToSave = toJson ? JSON.stringify(value) : value;
  localStorage.setItem(key, valueToSave);
  return value;
};

export const load = (key, options) => {
  return loadFromLocalStorage(key, options);
};

export const save = (key, value, options) => {
  return saveToLocalStorage(key, value, options);
};
