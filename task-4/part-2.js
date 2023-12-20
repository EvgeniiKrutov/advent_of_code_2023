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

const gameMap = {};

const calculateGameCards = () => {
  const lines = readFile();

  const gamesList = lines.map(line => line.split(': ')[1]);
  for (let i = 1; i <= lines.length; i++) {
    gameMap[i] = 1;
  }

  gamesList.forEach((game, index) => {
    const template = game.split(' | ')[0].replace(/\s{2,}/g, ' ').split(' ');
    const gameSet = game.split(' | ')[1].replace(/\s{2,}/g, ' ').split(' ');
    let matchAmount = 0;

    gameSet.forEach(set => {
      if (template.includes(set)) {
        matchAmount += 1;
      }
    });

    console.log(`A: ${index} ${matchAmount}`);

    if (matchAmount !== 0) {
      const value = gameMap[index + 1];
      for (let i = 1; i <= matchAmount; i++) {
        gameMap[index + i + 1] += value;
      }
    }
  });

  let gameCardsSum = 0;
  Object.values(gameMap).forEach(value => gameCardsSum += value);
  console.log("GAMELIST: ", gameCardsSum);
};

calculateGameCards();
