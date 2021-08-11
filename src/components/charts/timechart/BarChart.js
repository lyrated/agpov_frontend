import React, { useEffect } from 'react';
import * as d3 from 'd3';

function BarChart({ data }) {
  useEffect(() => {
    if (data !== null && !data.data) {
      let margin = { top: 30, right: 30, bottom: 30, left: 40 },
        height = 500 - margin.top - margin.bottom,
        width = 900 - margin.right - margin.left;

      let y = d3.scaleLinear()
        .domain([0, 50])
        .range([0, height]),
        colors = d3.scaleLinear()
          .domain([0, d3.max(data, d => d.y)])
          .range(['#01B4E4', '#D40242']);

      let yAxisValues = d3.scaleLinear()
        .domain([0, 50])
        .range([height, 0]),
        yAxisTicks = d3.axisLeft(yAxisValues)
          .tickValues(y.ticks(10).concat(y.domain()))
          .tickFormat(d => d + '%');

      let x = d3.scaleBand()
        .domain(data.map(d => d.x))
        .range([0, width]);
      let xAxisTicks = d3.axisBottom(x)
        .tickValues(x.domain().filter(function (d, i) {
          return !(i % 5);
        }));

      let tooltip = d3.select('body')
        .append('div')
        .style('position', 'absolute')
        .style('padding', '0 10px')
        .style('background', '#F0F0FA')
        .style('opacity', 0)
        .style('color', 'black');

      let chart = d3.select('#time-chart').append('svg')
        .attr('width', width + margin.right + margin.left + 10)
        .attr('height', height + margin.top + margin.bottom + 10)
        .append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top})`)
        .selectAll('rect').data(data)
        .enter().append('rect')
        .attr('fill', (d) => {
          return colors(d.y);
        })
        .attr('width', (d) => {
          return Math.floor(width / data.length) - 1;
        })
        .attr('height', (d) => {
          return 0;
        })
        .attr('x', (d, i) => {
          return i * (width / data.length);
        })
        .attr('y', (d) => {
          return height;
        })
        // on mouseover event
        .on('mouseover', (event, d) => {
          d3.select(event.currentTarget)
            .style('opacity', .8);
          tooltip.transition().duration(200).style('opacity', 0.9);
          tooltip.html(d.x + ': ' + d.y + '%')
            .style('left', (event.pageX - 35) + 'px')
            .style('top', (event.pageY - 30) + 'px');
        })
        .on('mouseout', (event, d) => {
          d3.select(event.currentTarget)
            .style('opacity', 1);
          tooltip.transition().duration(100).style('opacity', 0);
        });

      // guides
      d3.select('#time-chart svg').append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`)
        .call(yAxisTicks);
      d3.select('#time-chart svg').append('text')
        .attr('x', 0)
        .attr('y', 10)
        .attr('fill', '#FDC170')
        .style('font-size', '10pt')
        .text('% of women from all credits');

      d3.select('#time-chart svg').append('g')
        .attr('transform', `translate(${margin.left},${height + margin.top})`)
        .call(xAxisTicks);
      d3.select('#time-chart svg').append('text')
        .attr('x', width / 2 + margin.left)
        .attr('y', height + margin.top + margin.bottom + 5)
        .attr('fill', '#FDC170')
        .style('font-size', '10pt')
        .style('text-anchor', 'middle')
        .text('years');

      // legend
      const bgGradient = d3.select('#time-chart svg').append('linearGradient')
        .attr('id', 'bg-gradient');
      bgGradient
        .append('stop')
        .attr('stop-color', '#01B4E4')
        .attr('offset', '0%');
      bgGradient
        .append('stop')
        .attr('stop-color', '#D40242')
        .attr('offset', '100%');

      d3.select('#time-chart svg').append('text')
        .attr('x', width / 4 * 3)
        .attr('y', 30)
        .attr('fill', 'white')
        .style('font-size', '10pt')
        .text('0%');
      d3.select('#time-chart svg').append('rect')
        .attr('x', width / 4 * 3 + 30)
        .attr('y', 20)
        .attr('width', 200)
        .attr('height', 10)
        .style('fill', 'url(#bg-gradient)');
      d3.select('#time-chart svg').append('text')
        .attr('x', width / 4 * 3 + 240)
        .attr('y', 30)
        .attr('fill', 'white')
        .style('font-size', '10pt')
        .text(d3.max(data, d => d.y) + '%');

      // animation
      chart.transition()
        .attr('height', (d) => {
          return y(d.y);
        })
        .attr('y', (d, i) => {
          return height - y(d.y);
        })
        .duration(50)
        .delay((d, i) => {
          return i * 5
        });
    }
  });

  return (
    <div id="time-chart" className="diagram"></div>
  );
}

export default BarChart;