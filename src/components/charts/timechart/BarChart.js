import React, { useEffect } from 'react';
import * as d3 from 'd3';

function BarChart({ data }) {
  useEffect(() => {
    if (data !== null && !data.data) {
      let margin = { top: 30, right: 30, bottom: 30, left: 50 },
        height = 450 - margin.top - margin.bottom,
        width = 900 - margin.right - margin.left;

      let x = d3.scaleBand()
        .domain(data.map(d => d.x))
        .range([0, width])
        .padding(0.05);

      let y = d3.scaleLinear()
        .domain([0, 50])
        .rangeRound([0, height]);
      let yAxisValues = d3.scaleLinear()
        .domain([0, 50])
        .rangeRound([height, 0]);

      const MIN_COLOR = d3.schemePuRd[5][0];
      const MAX_COLOR = d3.schemePuRd[5][4];
      let colors = d3.scaleLinear()
        .domain([d3.min(data, d => d.y), d3.max(data, d => d.y)])
        .range([MIN_COLOR, MAX_COLOR]);

      let xAxis = g => g
        .attr('transform', `translate(${margin.left},${height + margin.top})`)
        .call(d3.axisBottom(x)
          .tickValues(x.domain().filter(function (d, i) {
            if (data.length <= 30) return d;
            if (data.length <= 50) return !(i % 2);
            return !(i % 5);
          }))
          .tickSizeOuter(0));

      let yAxis = g => g
        .attr('transform', `translate(${margin.left},${margin.top})`)
        .call(d3.axisLeft(yAxisValues).ticks(null, 's').tickFormat(d => d + '%'));

      let tooltip = d3.select('body')
        .append('div')
        .style('position', 'absolute')
        .style('padding', '0 10px')
        .style('background', '#F0F0FA')
        .style('display', 'none')
        .style('opacity', 0)
        .style('font-size', '14px')
        .style('color', 'black');

      const svg = d3.select('#time-chart').append('svg')
        .attr('viewBox',
          [0, 0, width + margin.right + margin.left, height + margin.top + margin.bottom + 10])
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
            .style('opacity', 0.9);
          tooltip.transition()
            .duration(100)
            .delay(500)
            .style('opacity', 0.9)
            .style('display', 'block');
          tooltip.html(d.x + ': ' + d.y + '%')
            .style('left', (event.pageX + 10) + 'px')
            .style('top', (event.pageY - 20) + 'px');
          setTimeout(() => {
            tooltip.style('opacity', 0).style('display', 'none');
          }, 5000);
        })
        .on('mouseout', (event, d) => {
          d3.select(event.currentTarget)
            .style('opacity', 1);
          tooltip
            .style('opacity', 0)
            .style('display', 'none');
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
        .attr('stop-color', MIN_COLOR)
        .attr('offset', '0%');
      bgGradient
        .append('stop')
        .attr('stop-color', MAX_COLOR)
        .attr('offset', '100%');

      svg.append('text')
        .attr('x', width / 4 * 3)
        .attr('y', 30)
        .attr('fill', 'white')
        .attr('text-anchor', 'end')
        .style('font-size', '12px')
        .text(d3.format(".1f")(d3.min(data, d => d.y)) + '%');
      svg.append('rect')
        .attr('x', width / 4 * 3 + 10)
        .attr('y', 20)
        .attr('width', 200)
        .attr('height', 10)
        .style('fill', 'url(#bg-gradient)');
      svg.append('text')
        .attr('x', width / 4 * 3 + 220)
        .attr('y', 30)
        .attr('fill', 'white')
        .style('font-size', '12px')
        .text(d3.format(".1f")(d3.max(data, d => d.y)) + '%');

      // animation
      chart.transition()
        .attr('height', (d) => y(d.y))
        .attr('y', (d, i) => height - y(d.y))
        .duration(50)
        .delay((d, i) => {
          return i * 5
        });

      // if data is empty:
      if (data.length === 0) {
        svg.append('text')
          .attr('x', width / 2 + margin.right)
          .attr('y', height / 2 + margin.top)
          .attr('text-anchor', 'middle')
          .attr('fill', 'white')
          .style('font-size', '16px')
          .text('This result contains no data. Please change your filters.');
      }

      /**
       * Zoomable Bar Chart Code from https://observablehq.com/@d3/zoomable-bar-chart
       */
      function zoom(svg) {
        const extent = [[margin.left, margin.top], [width, height]];

        const max = Math.max(Math.ceil(data.length / 10), 2);
        svg.call(d3.zoom()
          .scaleExtent([1, max])
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