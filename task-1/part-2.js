const fs = require('fs');

const keys = ["eightwo", "twone", "oneight", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];
const values = ["82", "21", "18", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

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

const transformLine = (line) => {
  let newLine = line;

  keys.forEach((key, index) => {
    newLine = newLine.replaceAll(key, values[index]);
  });

  return newLine;
};

const getCalibrationSum = () => {
  const inputLines = readFile();

  let calibrationSum = 0;

  inputLines.forEach((line) => {
    const transformedLine = transformLine(line);

    const count = transformedLine.match(/\d/g) || [];

    calibrationSum += Number(count[0] + count[count.length - 1]);
  });

  console.log('calibrationSum: ', calibrationSum);
};

getCalibrationSum();
