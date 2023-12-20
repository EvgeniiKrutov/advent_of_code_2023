// Determine which games would have been possible if the bag had been loaded with only 12 red cubes, 13 green cubes, and 14 blue cubes. What is the sum of the IDs of those games?
const fs = require('fs');

const RED_MAX = 12;
const GREEN_MAX = 13;
const BLUE_MAX = 14;

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

const calculateGames = () => {
  let gamesSum = 0;
  const lines = readFile();

  const gamesList = lines.map((line) => line.split(': ')[1]);

  gamesList.forEach((gameSet, index) => {
    const games = gameSet.split('; ');
    const isGameSetValid = games.every((game) => {
      const items = game.split(', ');
      const isGameValid = items.every(item => {
        const key = item.split(' ')[1];
        const value = item.split(' ')[0];
        let isValid = true;

        switch(key) {
          case 'red': if (value > RED_MAX) isValid = false; break;
          case 'green': if (value > GREEN_MAX) isValid = false; break;
          case 'blue': if (value > BLUE_MAX) isValid = false; break;
        }

        return isValid;
      });
      return isGameValid;
    });

    if(isGameSetValid) gamesSum += index + 1;
  });

  console.log(gamesSum);
};

calculateGames();
