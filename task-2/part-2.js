// Determine which games would have been possible if the bag had been loaded with only 12 red cubes, 13 green cubes, and 14 blue cubes. What is the sum of the IDs of those games?
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

const calculateGames = () => {
  let gamesSum = 0;
  const lines = readFile();

  const gamesList = lines.map((line) => line.split(': ')[1]);

  gamesList.forEach((gameSet) => {
    const games = gameSet.split('; ');
    let greenMax = 0;
    let redMax = 0;
    let blueMax = 0;

    games.forEach((game) => {
      const items = game.split(', ');
      items.forEach(item => {
        const key = item.split(' ')[1];
        const value = Number(item.split(' ')[0]);

        switch(key) {
          case 'red': if (value > redMax) redMax = value; break;
          case 'green': if (value > greenMax) greenMax = value; break;
          case 'blue': if (value > blueMax) blueMax = value; break;
        }
      });
    });

    const multiply = greenMax * blueMax * redMax;
    gamesSum += multiply;
  });

  console.log(gamesSum);
};

calculateGames();
