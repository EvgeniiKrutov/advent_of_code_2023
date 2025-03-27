const cardsPriorityMap1 = {
  A: 13,
  K: 12,
  Q: 11,
  J: 10,
  T: 9,
  9: 8,
  8: 7,
  7: 6,
  6: 5,
  5: 4,
  4: 3,
  3: 2,
  2: 1,
};

const cardsPriorityMap2 = {
  A: 13,
  K: 12,
  Q: 11,
  T: 10,
  9: 9,
  8: 8,
  7: 7,
  6: 6,
  5: 5,
  4: 4,
  3: 3,
  2: 2,
  J: 1,
};

const cardTypes = {
  5: 7,
  41: 6,
  32: 5,
  311: 4,
  221: 3,
  2111: 2,
  11111: 1,
};

module.exports = { cardsPriorityMap1, cardsPriorityMap2, cardTypes };
