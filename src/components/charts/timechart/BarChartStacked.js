import React, { useEffect } from 'react';
import * as d3 from 'd3';

/**
 * Stacked Bar Chart Code from https://observablehq.com/@d3/stacked-bar-chart
 */
function BarChartStacked(props) {
  useEffect(() => {
    if (props.data !== null && props.data.data) {
      const data = props.data.data;
      const columns = props.data.columns;

      let margin = { top: 30, right: 30, bottom: 30, left: 50 },
        height = 500 - margin.top - margin.bottom,
        width = 900 - margin.right - margin.left;

      let series = d3.stack()
        .keys(columns.slice(1))(data)
        .map(d => (d.forEach(v => v.key = d.key), d));

      let x = d3.scaleBand()
        .domain(data.map(d => d.name))
        .range([0, width])
        .padding(0.1);

      let y = d3.scaleLinear()
        .domain([0, 50])
        .rangeRound([height, 0]);

      const colors = [
        '#999999', '#A42147', '#2D847B', '#F3A712', '#FDAAA0',
        '#DE3F4C', '#66A0ED', '#42C3A8', '#F9CD44', '#EA7073',
        '#57A3C7', '#9381FF', '#0EE0D2', '#FFF275', '#CC3E55',
        '#B96481', '#08627C', '#FCD491', '#70FF8D', '#6652D4'
      ];
      let color = d3.scaleOrdinal()
        .domain(series.map(d => d.key))
        .range(colors)
        .unknown('#ccc');

      let xAxis = g => g
        .attr('transform', `translate(${margin.left},${height + margin.top})`)
        .call(d3.axisBottom(x)
          .tickValues(x.domain().filter(function (d, i) {
            return !(i % 5);
          })));

      let yAxis = g => g
        .attr('transform', `translate(${margin.left},${margin.top})`)
        .call(d3.axisLeft(y).ticks(null, 's').tickFormat(d => d + '%'));

      let formatValue = x => isNaN(x) ? 'N/A' : x.toLocaleString('en');

      let tooltip = d3.select('body')
        .append('div')
        .style('position', 'absolute')
        .style('padding', '0 10px')
        .style('background', '#F0F0FA')
        .style('display', 'block')
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
        .selectAll('g')
        .data(series)
        .join('g')
        .attr('fill', d => color(d.key))
        .selectAll('rect')
        .data(d => d)
        .join('rect')
        .attr('x', (d, i) => x(d.data.name))
        .attr('y', height)
        .attr('height', 0)
        .attr('width', x.bandwidth())
        // on mouseover event
        .on('mouseover', (event, d) => {
          d3.select(event.currentTarget)
            .style('opacity', 0.9);
          tooltip.transition().duration(100)
            .style('opacity', 0.9)
            .style('display', 'block');
          tooltip.html(`${d.data.name}: ${d.key} - ${formatValue(d.data[d.key])}%`)
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

      // animation
      chart.transition()
        .attr('height', d => y(d[0]) - y(d[1]))
        .attr('y', d => y(d[1]))
        .duration(50)
        .delay((d, i) => {
          return i * 5
        });

      //guides
      svg.append('g')
        .attr('class', 'x-axis')
        .call(xAxis);
      svg.append('text')
        .attr('x', width / 2)
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
      const legend = columns.slice(1, Math.round(columns.length / 3) + 1);
      svg.selectAll('legend')
        .data(legend).enter()
        .append('rect')
        .attr('fill', d => color(d))
        .attr('width', 10)
        .attr('height', 10)
        .attr('x', width / 5 * 3)
        .attr('y', (d, i) => (i * 20) + 10);
      // replace label for Actors to avoid confusion
      let iActors = legend.indexOf('Actors');
      if (iActors !== -1) {
        legend[iActors] = 'Background Acting';
      }
      svg.selectAll('labels')
        .data(legend).enter()
        .append('text')
        .attr('fill', 'white')
        .attr('x', width / 5 * 3 + 15)
        .attr('y', (d, i) => (i * 20) + 20)
        .style('font-size', '12px')
        .text(d => d);

      const legend2 = columns.slice(Math.round(columns.length / 3) + 1, Math.round(columns.length / 3) * 2 + 1);
      svg.selectAll('legend')
        .data(legend2).enter()
        .append('rect')
        .attr('fill', d => color(d))
        .attr('width', 10)
        .attr('height', 10)
        .attr('x', width / 5 * 3 + 125)
        .attr('y', (d, i) => (i * 20) + 10);
      // rename Costume & Make Up to shorten it
      let iCM = legend2.indexOf('Costume & Make-Up');
      if (iCM !== -1) {
        legend2[iCM] = 'Costume/Make-Up';
      }
      svg.selectAll('labels')
        .data(legend2).enter()
        .append('text')
        .attr('fill', 'white')
        .attr('x', width / 5 * 3 + 15 + 125)
        .attr('y', (d, i) => (i * 20) + 20)
        .style('font-size', '12px')
        .text(d => d);

      const legend3 = columns.slice(Math.round(columns.length / 3) * 2 + 1);
      svg.selectAll('legend')
        .data(legend3).enter()
        .append('rect')
        .attr('fill', d => color(d))
        .attr('width', 10)
        .attr('height', 10)
        .attr('x', width / 5 * 3 + 250)
        .attr('y', (d, i) => (i * 20) + 10);
      svg.selectAll('labels')
        .data(legend3).enter()
        .append('text')
        .attr('fill', 'white')
        .attr('width', 100)
        .attr('x', width / 5 * 3 + 15 + 250)
        .attr('y', (d, i) => (i * 20) + 20)
        .style('font-size', '12px')
        .text(d => d);

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
          svg.selectAll('.bars rect').attr('x', d => x(d.data.name)).attr('width', x.bandwidth());
          svg.selectAll('.x-axis').call(xAxis);
        }
      }
    }
  });

  return (
    <div id="time-chart" className="diagram"></div>
  );
}

export default BarChartStacked;