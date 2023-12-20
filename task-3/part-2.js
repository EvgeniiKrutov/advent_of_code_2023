const fs = require('fs');
const calculateClearNumbers = require('./part-1');

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

const calculateGearNumbers = () => {
  const numbersDictionary = calculateClearNumbers();
  const lines = readFile();
  const stars = [];
  const inputMatrix = lines.map((line) => line.split(''));

  inputMatrix.forEach((line, i) => {
    line.forEach((_item, j) => {
      let tl = false;
      let t = false;
      let tr = false;
      let bl = false;
      let b = false;
      let br = false;
      let arr = [];
      if (inputMatrix[i][j] == '*') {
        const lastIndex = line.length - 1;
        if (j != 0 && !isNaN(inputMatrix[i][j - 1])) arr.push('l');
        if (j != lastIndex && !isNaN(inputMatrix[i][j + 1])) arr.push('r');
        if (i != 0 && j != 0 && !isNaN(inputMatrix[i - 1][j - 1])) tl = true;
        if (i != 0 && !isNaN(inputMatrix[i - 1][j])) t = true;
        if (i != 0 && j != 139 && !isNaN(inputMatrix[i - 1][j + 1])) tr = true;
        if (tl && !t) arr.push('tl');
        if (t) arr.push('t');
        if (tr && !t) arr.push('tr');
        if (i != lastIndex && j != 0 && !isNaN(inputMatrix[i + 1][j - 1]))
          bl = true;
        if (i != lastIndex && !isNaN(inputMatrix[i + 1][j])) b = true;
        if (
          i != lastIndex &&
          j != lastIndex &&
          !isNaN(inputMatrix[i + 1][j + 1])
        )
          br = true;
        if (bl && !b) arr.push('bl');
        if (b) arr.push('b');
        if (br && !b) arr.push('br');
      }
      if (arr.length == 2) {
        stars.push([i, j, arr]);
      }
    });
  });

  let gearSum = 0;

  stars.forEach((star) => {
    const i = star[0];
    const j = star[1];
    const pos = star[2];
    let multiplied = 1;
    let num = 1;

    pos.forEach((p) => {
      switch (p) {
        case 't':
          num = numbersDictionary[`${i - 1} ${j}`];
          break;
        case 'b':
          num = numbersDictionary[`${i + 1} ${j}`];
          break;
        case 'l':
          num = numbersDictionary[`${i} ${j - 1}`];
          break;
        case 'r':
          num = numbersDictionary[`${i} ${j + 1}`];
          break;
        case 'tl':
          num = numbersDictionary[`${i - 1} ${j - 1}`];
          break;
        case 'tr':
          num = numbersDictionary[`${i - 1} ${j + 1}`];
          break;
        case 'bl':
          num = numbersDictionary[`${i + 1} ${j - 1}`];
          break;
        case 'br':
          num = numbersDictionary[`${i + 1} ${j + 1}`];
          break;
      }
      multiplied *= num;
    });
    gearSum += multiplied;
  });

  console.log('Gear sum: ', gearSum);
};

calculateGearNumbers();
