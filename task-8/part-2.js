const fs = require("fs");

Math.GCD = function twogcd(first, second) {
  if (first < 0) first = -first;
  if (second < 0) second = -second;
  if (second > first) { var temp = first; first = second; second = temp; }
  while (true) {
      first %= second;
      if (first == 0) return second;
      second %= first;
      if (second == 0) return first;
  }
};

Math.LCM = function (first, second) {
  return first * (second / Math.GCD(first, second));
};

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

  let stepsCount = {};
  let positions = Object.keys(pathMap).filter((pathKey) =>
    pathKey.endsWith("A")
  );
  positions.forEach((_, index) => {
    stepsCount[index] = { count: 0, finished: false };
  });
  let isFinished = false;

  while (!isFinished) {
    for (let i = 0; i < directions.length; i++) {
      if (isFinished) {
        break;
      }

      const currentDirection = directions[i];

      positions.forEach((pos, index) => {
        if (positions[index].endsWith("Z")) return;

        stepsCount[index].count += 1;
        const path = pathMap[pos];

        if (currentDirection === "L") {
          positions[index] = path.left;
        }
        if (currentDirection === "R") {
          positions[index] = path.right;
        }

        if (positions[index].endsWith("Z")) {
          stepsCount[index].finished = true;
        }
      });
    }
    isFinished = Object.values(stepsCount).every((count) => count.finished);
  }

  const finalCounts = Object.values(stepsCount).map((step) => step.count);

  const resultLCM = finalCounts.reduce(Math.LCM); 
  console.log("resultLCM: ", resultLCM);
};

calculatePath();
