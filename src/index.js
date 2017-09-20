import * as d3 from './d3.exports.js';

// const temperatureDataUrl = 'https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/global-temperature.json';
const temperatureDataUrl = '../data/global-temperature.json';

// Graph dimensions
// I could have put everything in an object, but that might get awkward later
// in the code.
const width = 1100;
const height = 500;
const padding = {
  bottom: 50,
  left: 60,
  right: 50,
  top: 50
};

const yearAxisLength = width - padding.left - padding.right;
const monthAxisLength = height - padding.top - padding.bottom;

const svg = d3.select('#chart')
  .attr('width', width)
  .attr('height', height);

// Graph code that's not dependent on data
const xScale = d3.scaleTime()
  .range([padding.left, width - padding.right]);

const yScale = d3.scaleTime()
  .domain([new Date(null, 0, 1), new Date(null, 11, 31)])
  .range([padding.top, height - padding.bottom]);

const yearAxis = svg.append('g')
  .attr('transform', `translate(0, ${height - padding.bottom})`);

// Month axis. No variables needed because everything's set up here.
svg.append('g')
  .attr('transform', `translate(${padding.left}, 0)`)
  .call(d3.axisLeft(yScale).ticks(12, '%B'))
  .call((axis) => {
    // Center the labels between the tick marks.
    // Dividing the axis length by 12 gives the length of each "tick span".
    // Further dividing by two gives that halfway point, hence 24.
    axis.selectAll('text')
      .attr('transform', `translate(0, ${monthAxisLength / 24})`);
  });

// I'd like to use scaleSequential instead of scaleQuantize, but I don't know
// how to reverse the interpolation (I'd like red to represent the hotter
// temperatures).
const colorScale = d3.scaleQuantize()
  .range(d3.schemeRdBu[11].reverse());

d3.json(temperatureDataUrl, ({baseTemperature, monthlyVariance}) => {
  // I passed a dummy second argument to `new Date()` because it interprets a
  // single number value as the number of milliseconds since January 1, 1970.
  // See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date#Syntax
  const dateFromYear = ({year}) => new Date(year, 0);
  const years = d3.extent(monthlyVariance, dateFromYear);
  const yearValues = years.map((date) => date.getYear());

  const addBaseTemp = (variance) => baseTemperature + variance;
  const temperatures
      = d3.extent(monthlyVariance, ({variance}) => addBaseTemp(variance));

  // Last minute scale/axis set up
  xScale.domain(years);
  yearAxis.call(d3.axisBottom(xScale));
  colorScale.domain(temperatures);

  // Plot data
  svg.selectAll('rect')
    .data(monthlyVariance)
    .enter()
    .append('rect')
    .attr('fill', ({variance}) => colorScale(addBaseTemp(variance)))
    .attr('x', ({year}) => xScale(new Date(year, 0)))
    .attr('y', ({month}) => yScale(new Date(null, month - 1)))
    .attr('width', Math.ceil(yearAxisLength / (yearValues[1] - yearValues[0])))
    .attr('height', Math.ceil(monthAxisLength / 12));
});
