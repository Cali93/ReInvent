export const pickRandomItem = array => array.find(
  (_, i, arr) => Math.random() < 1 / (arr.length - i)
);

export const pick = (obj, whiteListedKeys) => Object.fromEntries(
  Object.entries(obj).filter(([key]) => whiteListedKeys.includes(key))
);
