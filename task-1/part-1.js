const fs = require('fs');

const readFile = () => {
  let textLines = [];

  try {
    const data = fs.readFileSync('./input.txt', 'utf8');

    textLines = data.split('\n').filter((line) => line !== "");
  } catch (err) {
    console.error(err);
  }

  return textLines;
};

const getCalibrationSum = () => {
  const inputLines = readFile();

  let calibrationSum = 0;
  
  inputLines.forEach((line) => {
    const count = (line.match(/\d/g) || []);

    calibrationSum += Number(count[0] + count[count.length - 1]);
  });

  console.log('calibrationSum: ', calibrationSum);
}

getCalibrationSum();
