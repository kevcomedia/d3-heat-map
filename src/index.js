import * as d3 from './d3.exports.js';

/**
 * Feel free to modify/remove anything below.
 */

const data = [20, 10, 30];

const svg = d3.select('#chart')
  .attr('width', 600)
  .attr('height', 300);

const xScale = d3.scaleLinear()
  .domain([0, data.length - 1])
  .range([100, 500]);

const colorScale = d3.scaleLinear()
  .domain([d3.min(data), d3.max(data)])
  .range(['orange', 'blue']);

svg.selectAll('circle')
  .data(data)
  .enter()
  .append('circle')
  .attr('fill', (d) => colorScale(d))
  .attr('cx', (d, i) => xScale(i))
  .attr('cy', 150)
  .attr('r', (d) => d * 3);
