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

const calculateGameScore = () => {
  const lines = readFile();
  let gameScore = 0;

  const gamesList = lines.map(line => line.split(': ')[1]);

  gamesList.forEach(game => {
    const template = game.split(' | ')[0].replace(/\s{2,}/g, ' ').split(' ');
    const gameSet = game.split(' | ')[1].replace(/\s{2,}/g, ' ').split(' ');
    console.log("game set: ", gameSet);
    let matchAmount = 0;

    gameSet.forEach(set => {
      if (template.includes(set)) {
        matchAmount += 1;
      }
    });

    if (matchAmount === 1) {
      gameScore += 1;
    }

    if (matchAmount > 1) {
      let score = 1;
      for(let i = 2; i <= matchAmount; i++) {
        score = score * 2;
      }

      gameScore += score;
    }
  });

  console.log("GAMELIST: ", gameScore);
};

calculateGameScore();
