import React, { useEffect } from 'react';
import * as d3 from 'd3';

/**
 * Scatter Plot Base Code from https://observablehq.com/@d3/scatterplot-with-shapes
 */
function ScatterPlot({ data }) {
  useEffect(() => {
    if (data != null) {
      const margin = { top: 30, right: 30, bottom: 40, left: 40 },
        height = 600 - margin.top - margin.bottom,
        width = 850 - margin.right - margin.left;

      const formatValue = d3.format(".2s");

      const svg = d3.select("#profit-chart").append("svg")
        .attr("viewBox", [0, 0, width, height])
        .call(zoom);

      const x = d3.scaleLinear()
        .domain(d3.extent(data, d => d.avgBudget)).nice()
        .range([margin.left, width - margin.right]);

      const y = d3.scaleLinear()
        .domain(d3.extent(data, d => d.avgRevenue)).nice()
        .range([height - margin.bottom, margin.top]);

      const color = d3.scaleOrdinal().domain(data.map(d => d.category)).range(['#D93B63', '#01C6AC', '#01B4E4']);
      const shape = d3.scaleOrdinal(data.map(d => d.category), d3.symbols.map(s => d3.symbol().type(s)()));

      const xAxis = g => g
        .attr("transform", `translate(0,${height - margin.bottom})`)
        .call(d3.axisBottom(x).ticks(width / 80).tickFormat(formatValue))
        .call(g => g.select(".domain").remove())
        .call(g => g.append("text")
          .attr("x", width)
          .attr("y", margin.bottom - 4)
          .attr("fill", "#FDC170")
          .attr("text-anchor", "end")
          .text("Average budget in million constant USD"));

      const yAxis = g => g
        .attr("transform", `translate(${margin.left},0)`)
        .call(d3.axisLeft(y).tickFormat(formatValue))
        .call(g => g.select(".domain").remove())
        .call(g => g.append("text")
          .attr("x", -margin.left)
          .attr("y", 10)
          .attr("fill", "#FDC170")
          .attr("text-anchor", "start")
          .text("Average revenue in million constant USD"));

      // tooltip
      const tooltip = d3.select('body')
        .append('div')
        .style('position', 'absolute')
        .style('padding', '0 10px')
        .style('background', '#F0F0FA')
        .style('display', 'none')
        .style('opacity', 0)
        .style('font-size', '14px')
        .style('color', 'black');

      const tooltipMouseover = (event, d) => {
        tooltip.transition()
          .duration(100)
          .delay(200)
          .style('opacity', 0.9)
          .style('display', 'block');
        // format values
        const revenue = d3.format('$,d')(d.avgRevenue);
        const budget = d3.format('$,d')(d.avgBudget);
        const profit = d3.format('$,d')(d.profit);
        tooltip.html(`${d._id} (${d.count} movies):<br />${revenue} revenue<br />${budget} budget<br /><br />${profit} profit`)
          .style('left', (event.pageX - 70) + 'px')
          .style('top', (event.pageY - 120) + 'px');
      }

      const tooltipMouseout = (event, d) => {
        tooltip
          .style('opacity', 0)
          .style('display', 'none');
      }

      // color change
      const categories = [...new Set(data.map(d => d.category))];

      const colorChange = (d, col) => {
        categories.forEach(cat => {
          if (cat !== d.category) {
            const c = col ? col : color(cat);
            d3.selectAll(".dot." + cat)
              .transition()
              .duration(100)
              .attr("fill", d => { console.log(d); return c });
          }
        });
      }

      // grid background
      let grid = g => g
        .attr("stroke", "currentColor")
        .attr("stroke-opacity", 0.1)
        .call(g => g.append("g")
          .attr("class", "grid")
          .selectAll("line")
          .data(x.ticks())
          .join("line")
          .attr("x1", d => 0.5 + x(d))
          .attr("x2", d => 0.5 + x(d))
          .attr("y1", margin.top)
          .attr("y2", height - margin.bottom))
        .call(g => g.append("g")
          .selectAll("line")
          .data(y.ticks())
          .join("line")
          .attr("y1", d => 0.5 + y(d))
          .attr("y2", d => 0.5 + y(d))
          .attr("x1", margin.left)
          .attr("x2", width - margin.right));

      svg.append("g")
        .attr("class", "x-axis")
        .call(xAxis);

      svg.append("g")
        .attr("class", "y-axis")
        .call(yAxis);

      svg.append("g")
        .call(grid);

      const chart = svg.append("g")
        .attr("class", "dots")
        .attr("stroke-width", 1.5)
        .attr("font-family", "sans-serif")
        .attr("font-size", 10)
        .selectAll("path")
        .data(data)
        .join("path")
        .attr("opacity", 0)
        .attr("transform", d => `translate(${x(d.avgBudget)},${y(d.avgRevenue)})`)
        .attr("fill", d => color(d.category))
        .attr("d", d => shape(d.category))
        .attr("class", d => `dot ${d.category}`)
        // on mouseover event
        .on('mouseover', (event, d) => {
          d3.select(event.currentTarget)
            .style('opacity', 0.8);
          tooltipMouseover(event, d);
          colorChange(d, '#032541');
          setTimeout(() => {
            tooltipMouseout(event, d);
            colorChange(d);
          }, 15000);
        })
        .on('mouseout', (event, d) => {
          d3.select(event.currentTarget)
            .style('opacity', 1);
          tooltipMouseout(event, d);
          colorChange(d);
        });

      // animation
      chart.transition()
        .attr("opacity", 1)
        .duration(100)
        .delay((d, i) => i * 25);

      // legend
      svg.selectAll("legend")
        .data(categories)
        .join("path")
        .attr("stroke-width", 1.5)
        .attr("font-family", "sans-serif")
        .attr("font-size", 10)
        .attr("fill", d => color(d))
        .attr("d", d => shape(d))
        .attr("transform", (d, i) => `translate(${(width / 3) - 10 + i * 90}, 6)`)
        .text(d => d);
      // rename labels for other departments than acting for more clarity
      const labels = [...categories];
      if (labels.length === 3) {
        labels[0] = 'only women';
        labels[1] = 'only men';
        labels[2] = 'mixed genders';
      }
      svg.selectAll("legend")
        .data(labels)
        .join("text")
        .attr("fill", "white")
        .attr("font-size", "12px")
        .attr("x", (d, i) => (width / 3) + i * 90)
        .attr("y", 10)
        .text(d => d);

      /**
       * Zoomable Bar Chart Base Code from https://observablehq.com/@d3/zoomable-bar-chart
       */
      function zoom(svg) {
        const extent = [[margin.left, margin.top], [width, height]];

        svg.call(d3.zoom()
          .scaleExtent([1, 8])
          .translateExtent(extent)
          .extent(extent)
          .on('zoom', zoomed));

        function zoomed(event) {
          x.range([margin.left, width - margin.right].map(d => event.transform.applyX(d)));
          svg.selectAll('.dots path')
            .attr("transform", d => `translate(${x(d.avgBudget)},${y(d.avgRevenue)})`);
          svg.selectAll('.x-axis').call(xAxis);
          svg.selectAll(".grid line")
            .attr("x1", d => 0.5 + x(d))
            .attr("x2", d => 0.5 + x(d));
        }
      }
    }
  });

  return (
    <div id="profit-chart" className="diagram"></div>
  );
}

export default ScatterPlot;