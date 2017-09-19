import * as d3 from './d3.exports.js';

const temperatureDataUrl = 'https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/global-temperature.json';

// Graph dimensions
// I could have put everything in an object, but that might get awkward later
// in the code.
const width = 1100;
const height = 500;
const padding = {
  bottom: 50,
  left: 50,
  right: 50
};

const svg = d3.select('#chart')
  .attr('width', width)
  .attr('height', height);

// Graph code that's not dependent on data
const xScale = d3.scaleTime()
  .range([padding.left, width - padding.right]);

const yearAxis = svg.append('g')
  .attr('transform', `translate(0, ${height - padding.bottom})`);

d3.json(temperatureDataUrl, ({baseTemperature, monthlyVariance}) => {
  // I passed a dummy second argument to `new Date()` because it interprets a
  // single number value as the number of milliseconds since January 1, 1970.
  // See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date#Syntax
  const dateFromYear = ({year}) => new Date(year, 0);
  const years = d3.extent(monthlyVariance, dateFromYear);

  xScale.domain(years);

  yearAxis.call(d3.axisBottom(xScale));
});
