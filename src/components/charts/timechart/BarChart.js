import React, { useEffect } from 'react';
import * as d3 from 'd3';

function BarChart({ data }) {
  useEffect(() => {
    if (data != null) {
      let bardata = [];
      let dates = Object.keys(data);
      dates.forEach(d => {
        bardata.push(data[d]);
      });

      let margin = { top: 0, right: 0, bottom: 30, left: 21 },
        height = 500 - margin.top - margin.bottom,
        width = 900 - margin.right - margin.left;

      let yScale = d3.scaleLinear()
        .domain([0, d3.max(bardata)])
        .range([0, height]),
        // xScale = d3.scaleBand()
        //   .domain(bardata)
        //   .padding(0.2)
        //   .range([0, width]),
        colors = d3.scaleLinear()
          .domain([0, bardata.length - 1])
          .range(['#D93B63', '#90CEA1']);

      let yAxisValues = d3.scaleLinear()
        .domain([0, d3.max(bardata)])
        .range([height, 0]),
        yAxisTicks = d3.axisLeft(yAxisValues).ticks(10);

      let xAxisValues = d3.scaleLinear()
        .domain([dates[0], dates[dates.length-1]])
        .range([0, width]),
        xAxisTicks = d3.axisBottom(xAxisValues).ticks(10).tickFormat(d3.format("d"));

      let tooltip = d3.select('body')
        .append('div')
        .style('position', 'absolute')
        .style('padding', '0 10px')
        .style('background', '#F0F0FA')
        .style('opacity', 0)
        .style('color', 'black');

        console.log(data);
      let chart = d3.select('#time-chart').append('svg')
        .attr('width', width + margin.right + margin.left)
        .attr('height', height + margin.top + margin.bottom)
        // .style('background', '#F0F0F3')
        .append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top})`)
        .selectAll('rect').data(bardata)
        .enter().append('rect')
        .style('fill', (d, i) => {
          return colors(i);
        })
        .attr('width', (d) => {
          return Math.floor(width/dates.length)-1;
        })
        .attr('height', (d) => {
          return 0;
        })
        .attr('x', (d, i) => {
          return i * (width/dates.length);
        })
        .attr('y', (d) => {
          return height;
        })

        .on('mouseover', function (event, d) {
          tooltip.transition().duration(200).style('opacity', 0.9);
          tooltip.html(d)
            .style('left', (event.pageX - 35) + 'px')
            .style('top', (event.pageY - 30) + 'px');
        })
        .on('mouseout', function (event, d) {
          tooltip.transition().duration(100).style('opacity', 0);
        });

      // guides
      d3.select('#time-chart svg').append('g')
        .attr('transform', 'translate(20,0)')
        .call(yAxisTicks);
      d3.select('#time-chart svg').append('g')
        .attr('transform', `translate(20,${height})`)
        .call(xAxisTicks);

      // animation
      chart.transition()
        .attr('height', (d) => {
          return yScale(d);
        })
        .attr('y', (d, i) => {
          return height - yScale(d);
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