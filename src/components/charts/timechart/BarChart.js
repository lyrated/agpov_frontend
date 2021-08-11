import React, { useEffect } from 'react';
import * as d3 from 'd3';

function BarChart({ data }) {
  useEffect(() => {
    if (data !== null && !data.data) {
      let margin = { top: 30, right: 30, bottom: 30, left: 40 },
        height = 500 - margin.top - margin.bottom,
        width = 900 - margin.right - margin.left;

      let x = d3.scaleBand()
        .domain(data.map(d => d.x))
        .range([0, width])
        .padding(0.1);

      let y = d3.scaleLinear()
        .domain([0, 50])
        .rangeRound([0, height]);
      let yAxisValues = d3.scaleLinear()
        .domain([0, 50])
        .rangeRound([height, 0]);

      let colors = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.y)])
        .range(['#01B4E4', '#D40242']);

      let xAxis = g => g
        .attr('transform', `translate(${margin.left},${height + margin.top})`)
        .call(d3.axisBottom(x)
          .tickValues(x.domain().filter(function (d, i) {
            return !(i % 5);
          })));

      let yAxis = g => g
        .attr('transform', `translate(${margin.left},${margin.top})`)
        .call(d3.axisLeft(yAxisValues).ticks(null, 's').tickFormat(d => d + '%'));

      let tooltip = d3.select('body')
        .append('div')
        .style('position', 'absolute')
        .style('padding', '0 10px')
        .style('background', '#F0F0FA')
        .style('opacity', 0)
        .style('color', 'black');

      const svg = d3.select('#time-chart').append('svg')
        .attr('viewBox',
          [0, 0, width + margin.right + margin.left + 10, height + margin.top + margin.bottom + 10])
        .call(zoom);

      const chart = svg.append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top})`)
        .attr('class', 'bars')
        .selectAll('rect')
        .data(data)
        .join('rect')
        .attr('fill', d => colors(d.y))
        .attr('x', (d, i) => x(d.x))
        .attr('y', d => height)
        .attr('width', x.bandwidth())
        .attr('height', 0)
        // on mouseover event
        .on('mouseover', (event, d) => {
          d3.select(event.currentTarget)
            .style('opacity', .8);
          tooltip.transition().duration(100).style('opacity', 0.9);
          tooltip.html(d.x + ': ' + d.y + '%')
            .style('left', (event.pageX - 50) + 'px')
            .style('top', (event.pageY - 50) + 'px');
        })
        .on('mouseout', (event, d) => {
          d3.select(event.currentTarget)
            .style('opacity', 1);
          tooltip.transition().duration(100).style('opacity', 0);
        });

      // guides
      svg.append('g')
        .attr('class', 'x-axis')
        .call(xAxis);
      svg.append('text')
        .attr('x', width / 2 + margin.left)
        .attr('y', height + margin.top + margin.bottom + 5)
        .attr('fill', '#FDC170')
        .style('font-size', '10pt')
        .style('text-anchor', 'middle')
        .text('years');

      svg.append('g')
        .attr('class', 'y-axis')
        .call(yAxis);
      svg.append('text')
        .attr('x', 0)
        .attr('y', 15)
        .attr('fill', '#FDC170')
        .style('font-size', '10pt')
        .text('% of women from all credits');

      // legend
      const bgGradient = svg.append('linearGradient')
        .attr('id', 'bg-gradient');
      bgGradient
        .append('stop')
        .attr('stop-color', '#01B4E4')
        .attr('offset', '0%');
      bgGradient
        .append('stop')
        .attr('stop-color', '#D40242')
        .attr('offset', '100%');

      svg.append('text')
        .attr('x', width / 4 * 3)
        .attr('y', 30)
        .attr('fill', 'white')
        .style('font-size', '10pt')
        .text('0%');
      svg.append('rect')
        .attr('x', width / 4 * 3 + 30)
        .attr('y', 20)
        .attr('width', 200)
        .attr('height', 10)
        .style('fill', 'url(#bg-gradient)');
      svg.append('text')
        .attr('x', width / 4 * 3 + 240)
        .attr('y', 30)
        .attr('fill', 'white')
        .style('font-size', '10pt')
        .text(d3.max(data, d => d.y) + '%');

      // animation
      chart.transition()
        .attr('height', (d) => y(d.y))
        .attr('y', (d, i) => height - y(d.y))
        .duration(50)
        .delay((d, i) => {
          return i * 5
        });

      /**
       * Zoomable Bar Chart Code from https://observablehq.com/@d3/zoomable-bar-chart
       */
      function zoom(svg) {
        const extent = [[margin.left, margin.top], [width, height]];

        svg.call(d3.zoom()
          .scaleExtent([1, 8])
          .translateExtent(extent)
          .extent(extent)
          .on('zoom', zoomed));

        function zoomed(event) {
          x.range([0, width].map(d => event.transform.applyX(d)));
          svg.selectAll('.bars rect').attr('x', d => x(d.x)).attr('width', x.bandwidth());
          svg.selectAll('.x-axis').call(xAxis);
        }
      }
    }
  });

  return (
    <div id="time-chart" className="diagram"></div>
  );
}

export default BarChart;