const fs = require("fs");

const readFile = () => {
  let textLines = [];

  try {
    const data = fs.readFileSync("./input.txt", "utf8");

    textLines = data.split("\n").filter((line) => line !== "");
  } catch (err) {
    console.error(err);
  }

  return textLines;
};

const calculatePath = () => {
  const lines = readFile();

  const directions = lines[0].split("");
  const pathLines = lines.slice(1);
  const pathMap = {};

  pathLines.forEach((pathLine) => {
    const pos = pathLine.split(" = ")[0];
    const path = pathLine.split(" = (")[1].split(")")[0];
    const left = path.split(", ")[0];
    const right = path.split(", ")[1];

    pathMap[pos] = { left, right };
  });

  let stepsCount = 0;
  let position = 'AAA';

  while (position !== 'ZZZ') {
    for(let i = 0; i < directions.length; i++) {
      if (position === 'ZZZ') {
        break;
      }

      const currentDirection = directions[i];
      const path = pathMap[position];
      
      stepsCount += 1;
      
      if (currentDirection === 'L') {
        position = path.left;
      }
      if (currentDirection === 'R') {
        position = path.right;
      }
    }
  }

  console.log("stepsCount: ", stepsCount);
};

calculatePath();
