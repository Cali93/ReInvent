export const pickRandomItem = array => array.find(
  (_, i, arr) => Math.random() < 1 / (arr.length - i)
);
