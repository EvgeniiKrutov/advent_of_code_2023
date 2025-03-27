const { cardsPriorityMap2, cardTypes } = require("./constants");
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

const sortCardsByPriority = (a, b) => {
  const priorityA = cardsPriorityMap2[a];
  const priorityB = cardsPriorityMap2[b];

  if (priorityA > priorityB) return -1;
  if (priorityB > priorityA) return 1;

  return 0;
};

const sortCardsByType = (a, b) => {
  const typeA = a.split("_")[2];
  const typeB = b.split("_")[2];

  if (typeA > typeB) return -1;
  if (typeB > typeA) return 1;

  return 0;
};

const sortCardsByLetter = (a, b) => {
  const cardA = a.split("_")[0].split("");
  const cardB = b.split("_")[0].split("");

  for (let i = 0; i < 5; i++) {
    const priorityA = cardsPriorityMap2[cardA[i]];
    const priorityB = cardsPriorityMap2[cardB[i]];

    if (priorityA > priorityB) return 1;
    if (priorityB > priorityA) return -1;
  }

  return 0;
};

const parseCard = (card) => {
  let parsedCard = {};
  let currSymbol = undefined;

  card.forEach((c) => {
    if (!currSymbol || c !== currSymbol) {
      parsedCard[c] = 1;
      currSymbol = c;
    } else {
      parsedCard[c] = parsedCard[c] + 1;
    }
  });

  const jokerValue = parsedCard["J"];
  if (parsedCard["J"] !== 5) {
    parsedCard["J"] = undefined;
  }

  const priorityKey = Object.values(parsedCard)
    .sort((a, b) => {
      return b - a;
    })
    .join("");

  let jokerPriorityKey = priorityKey;
  if (!!jokerValue && parsedCard['J'] !== 5) {
    const tempKey = jokerPriorityKey.split("");
    tempKey[0] = Number(tempKey[0]) + Number(jokerValue);
    jokerPriorityKey = tempKey.join("");
  }

  return cardTypes[jokerPriorityKey];
};

const calculateCards = () => {
  const lines = readFile();

  const resultLines = lines
    .map((line) => {
      const card = line.split(" ")[0];
      const bid = line.split(" ")[1];

      const sortedCard = card.split("").sort(sortCardsByPriority);

      const cardType = parseCard(sortedCard);

      return `${card}_${bid}_${cardType}`;
    })
    .sort(sortCardsByType)
    .reverse();

  let finalResult = [];

  for (let type = 1; type < 8; type++) {
    const typesArray = resultLines
      .filter((line) => line.split("_")[2] === String(type))
      .sort(sortCardsByLetter);

    finalResult = finalResult.concat(typesArray);
  }

  let result = 0;

  finalResult.forEach((line, index) => {
    const bid = Number(line.split("_")[1]);

    result += bid * (index + 1);
  });

  console.log("RESULT: ", result);
};

calculateCards();
