import * as d3 from './d3.exports.js';

const temperatureDataUrl = 'https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/global-temperature.json';

d3.json(temperatureDataUrl, ({baseTemperature, monthlyVariance}) => {
  console.log(baseTemperature);
  console.log(monthlyVariance);
});
