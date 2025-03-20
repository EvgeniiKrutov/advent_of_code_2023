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

const seedMap = {
  'seed-to-soil': [],
  'soil-to-fertilizer': [],
  'fertilizer-to-water': [],
  'water-to-light': [],
  'light-to-temperature': [],
  'temperature-to-humidity': [],
  'humidity-to-location': [],
};

const mapValueUsingMatrix = (matrix, seed) => {
  let value = seed;
  let isMapped = false;

  matrix.forEach((row) => {
    if (isMapped) return;
    const destinationRange = row[0];
    const sourceRange = row[1];
    const count = row[2];

    if (sourceRange === seed) {
      value = destinationRange;
    } else {
      for (let i = 1; i <= count; i++) {
        const newSource = sourceRange + i;
        if (newSource === seed && !isMapped) {
          isMapped = true;
          value = destinationRange + i;
          break;
        }
      }
    }
  });

  return value;
};

const calculateLowestSeedLocation = () => {
  const lines = readFile();
  let seedsList = [];
  let locationList = [];
  let mapKey = '';

  lines.forEach((line) => {
    if (line.includes('seeds:')) {
      seedsList = line
        .split('seeds: ')[1]
        .split(' ')
        .map((seed) => Number(seed));
    }

    if (line.includes('map:')) {
      mapKey = line.split(' map:')[0];
    }

    if (!line.includes('map:') && !line.includes('seeds:')) {
      seedMap[mapKey].push(line.split(' ').map((x) => Number(x)));
    }
  });

  seedsList.forEach((seed, index) => {
    const seedToSoilMap = seedMap['seed-to-soil'];
    const soilToFertilizerMap = seedMap['soil-to-fertilizer'];
    const fertilizerToWaterMap = seedMap['fertilizer-to-water'];
    const waterToLightMap = seedMap['water-to-light'];
    const lightToTemperatureMap = seedMap['light-to-temperature'];
    const temperatureToHumidityMap = seedMap['temperature-to-humidity'];
    const humidityToLocationMap = seedMap['humidity-to-location'];

    let soil = mapValueUsingMatrix(seedToSoilMap, seed);
    let fertilizer = mapValueUsingMatrix(soilToFertilizerMap, soil);
    let water = mapValueUsingMatrix(fertilizerToWaterMap, fertilizer);
    let light = mapValueUsingMatrix(waterToLightMap, water);
    let temperature = mapValueUsingMatrix(lightToTemperatureMap, light);
    let humidity = mapValueUsingMatrix(temperatureToHumidityMap, temperature);
    let location = mapValueUsingMatrix(humidityToLocationMap, humidity);

    locationList.push(location);

    console.log(`DONE: ${index}, location: ${location}`);
  });

  console.log("Minimal location", Math.min(...locationList));
};

calculateLowestSeedLocation();
