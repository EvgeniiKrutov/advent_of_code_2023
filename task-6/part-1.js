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

const calculateRaces = () => {
  const lines = readFile();

  if (!lines || lines.length !== 2) return;

  const times = lines[0].split(' ').filter((item) => Number(item));
  const records = lines[1].split(' ').filter((item) => Number(item));
  let result = 1;

  times.forEach((time, index) => {
    const record = records[index];
    let start = 0;
    let stop = 0;
    let intermediateResult = 0;

    for (let i = 1; i < time; i++) {
      const distance = i * (time - i);

      if (record < distance) {
        start = i;
        break;
      }
    }

    for (let j = time - 1; j > 0; j--) {
      const distance = j * (time - j);

      if (record < distance) {
        stop = j;
        break;
      }
    }

    intermediateResult = stop - start + 1;

    if (intermediateResult) {
      result *= intermediateResult;
    }
  });

  console.log("result: ", result);
};

calculateRaces();
