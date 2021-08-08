import React, { useEffect } from 'react';
import * as d3 from 'd3';

function BarChart({ data }) {
  useEffect(() => {
    if (data != null) {
      let margin = { top: 30, right: 0, bottom: 30, left: 21 },
        height = 500 - margin.top - margin.bottom,
        width = 900 - margin.right - margin.left;

      let yScale = d3.scaleLinear()
        .domain([0, 50])
        .range([0, height]),
        colors = d3.scaleLinear()
          .domain([0, data.length - 1])
          .range(['#D93B63', '#90CEA1']);

      let yAxisValues = d3.scaleLinear()
        .domain([0, 50])
        .range([height, 0]),
        yAxisTicks = d3.axisLeft(yAxisValues).tickValues(yScale.ticks(10).concat(yScale.domain()));

      let xAxisValues = d3.scaleLinear()
        .domain([data[0].x, +data[data.length - 1].x + 1])
        .range([0, width]),
        xAxisTicks = d3.axisBottom(xAxisValues).ticks(20).tickFormat(d3.format("d"));

      let tooltip = d3.select('body')
        .append('div')
        .style('position', 'absolute')
        .style('padding', '0 10px')
        .style('background', '#F0F0FA')
        .style('opacity', 0)
        .style('color', 'black');

      let chart = d3.select('#time-chart').append('svg')
        .attr('width', width + margin.right + margin.left)
        .attr('height', height + margin.top + margin.bottom)
        // .style('background', '#F0F0F3')
        .append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top})`)
        .selectAll('rect').data(data)
        .enter().append('rect')
        .style('fill', (d, i) => {
          return colors(i);
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
        .attr('transform', `translate(20,${margin.top})`)
        .call(yAxisTicks);
      d3.select('#time-chart svg').append('g')
        .attr('transform', `translate(20,${height + margin.top})`)
        .call(xAxisTicks);

      // animation
      chart.transition()
        .attr('height', (d) => {
          return yScale(d.y);
        })
        .attr('y', (d, i) => {
          return height - yScale(d.y);
        })
        .duration(100)
        .delay((d, i) => {
          return i * 20
        });
    }
  });

  return (
    <div id="time-chart" className="diagram"></div>
  );
}

export default BarChart;