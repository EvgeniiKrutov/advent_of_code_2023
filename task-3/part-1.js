const fs = require('fs');

const NUMBERS = '0123456789';
const numbersDictionary = {};

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

const checkPartNumber = (matrix, i, j) => {
  const leftEl = matrix[i] ? matrix[i][j - 1] : undefined;
  const topEl = matrix[i - 1] ? matrix[i-1][j] : undefined;
  const bottomEl = matrix[i + 1] ? matrix[i + 1][j] : undefined;
  const rightEl = matrix[i] ? matrix[i][j + 1] : undefined;
  const rightBottomEl = matrix[i + 1] ? matrix[i + 1][j + 1] : undefined;
  const rightTopEl = matrix[i - 1] ? matrix[i - 1][j + 1] : undefined;
  const leftTopEl = matrix[i - 1] ? matrix[i - 1][j - 1] : undefined;
  const leftBottomEl = matrix[i + 1] ? matrix[i + 1][j - 1] : undefined;

  if (!!leftEl && !NUMBERS.includes(leftEl) && leftEl !== '.') return true;
  if (!!topEl && !NUMBERS.includes(topEl) && topEl !== '.') return true;
  if (!!bottomEl && !NUMBERS.includes(bottomEl) && bottomEl !== '.') return true;
  if (!!rightEl && !NUMBERS.includes(rightEl) && rightEl !== '.') return true;
  if (!!rightBottomEl && !NUMBERS.includes(rightBottomEl) && rightBottomEl !== '.') return true;
  if (!!rightTopEl && !NUMBERS.includes(rightTopEl) && rightTopEl !== '.') return true;
  if (!!leftTopEl && !NUMBERS.includes(leftTopEl) && leftTopEl !== '.') return true;
  if (!!leftBottomEl && !NUMBERS.includes(leftBottomEl) && leftBottomEl !== '.') return true;

  return false;
};

module.exports = calculateClearNumbers = () => {
  const lines = readFile();
  const partNumbers = [];
  let partNumbersSum = 0;
  const inputMatrix = lines.map((line) => line.split(''));

  inputMatrix.forEach((line, i) => {
    let accumulator = [];
    let indexAcc = [];
    let isValidNumber = false;
    line.forEach((item, j) => {
      if (NUMBERS.includes(item)) {
        accumulator.push(item);
        indexAcc.push(`${i} ${j}`);
      }

      if (accumulator.length !== 0 && !isValidNumber && NUMBERS.includes(item)) {
        isValidNumber = checkPartNumber(inputMatrix, i, j);
      }

      if (accumulator.length !== 0 && (!NUMBERS.includes(item) || j === line.length - 1)) {
        if (isValidNumber) {
          partNumbers.push(Number(accumulator.join('')));
          partNumbersSum += Number(accumulator.join(''));
          indexAcc.forEach(ind => {
            numbersDictionary[ind] = Number(accumulator.join(''));
          });
        }
        indexAcc = [];
        accumulator = [];
        isValidNumber = false;

        return;
      }
    });
  });

  console.log("Part numbers sum: ", partNumbersSum);

  return numbersDictionary;
};

calculateClearNumbers();
