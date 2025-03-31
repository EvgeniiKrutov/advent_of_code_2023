const fs = require('fs');

const readFile = () => {
  let textLines = [];

  try {
    const data = fs.readFileSync('./input.txt', 'utf8');

    textLines = data.split('\n').filter((line) => line !== '');
  } catch (err) {
    console.error(err);
  }

  return textLines;
};

const predictValueRecursive = (range) => {
  if (range.every(val => val === 0)) return 0;

  const lastVal = range[range.length - 1];

  const newRange = [];

  for(let i = 0; i < range.length - 1; i++) {
    const diff = range[i + 1] - range[i];

    newRange.push(diff);
  }

  return lastVal + predictValueRecursive(newRange);
}

const calculateNewValues = () => {
  const lines = readFile();

  let finalSum = 0;

  lines.forEach(line => {
    const range = line.split(' ').map((x) => Number(x));
    const value = predictValueRecursive(range);

    finalSum += value
  });

  console.log(finalSum);
};

calculateNewValues();
