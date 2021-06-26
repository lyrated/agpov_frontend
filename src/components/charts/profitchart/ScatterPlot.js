import React, { useEffect } from 'react';
import * as d3 from 'd3';

function ScatterPlot({ data }) {
  useEffect(() => {
    if (data != null) {
      let margin = { top: 20, right: 10, bottom: 30, left: 30 },
        height = 500 - margin.top - margin.bottom,
        width = 900 - margin.right - margin.left;

      const svg = d3.select("#profit-chart").append("svg")
        .attr("viewBox", [0, 0, width, height]);

      let x = d3.scaleLinear()
        .domain(d3.extent(data, d => d.avgBudget/1000000)).nice()
        .range([margin.left, width - margin.right]);

      let y = d3.scaleLinear()
        .domain(d3.extent(data, d => d.avgRevenue/1000000)).nice()
        .range([height - margin.bottom, margin.top]);

      let color = d3.scaleOrdinal(data.map(d => d.category), d3.schemeCategory10);
      let shape = d3.scaleOrdinal(data.map(d => d.category), d3.symbols.map(s => d3.symbol().type(s)()));

      let xAxis = g => g
        .attr("transform", `translate(0,${height - margin.bottom})`)
        .call(d3.axisBottom(x).ticks(width / 80))
        .call(g => g.select(".domain").remove())
        .call(g => g.append("text")
          .attr("x", width)
          .attr("y", margin.bottom - 4)
          .attr("fill", "currentColor")
          .attr("text-anchor", "end")
          .text("Budget in million USD"));

      let yAxis = g => g
        .attr("transform", `translate(${margin.left},0)`)
        .call(d3.axisLeft(y))
        .call(g => g.select(".domain").remove())
        .call(g => g.append("text")
          .attr("x", -margin.left)
          .attr("y", 10)
          .attr("fill", "currentColor")
          .attr("text-anchor", "start")
          .text("Revenue in million USD"));

      let grid = g => g
        .attr("stroke", "currentColor")
        .attr("stroke-opacity", 0.1)
        .call(g => g.append("g")
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
        .call(xAxis);

      svg.append("g")
        .call(yAxis);

      svg.append("g")
        .call(grid);

      svg.append("g")
        .attr("stroke-width", 1.5)
        .attr("font-family", "sans-serif")
        .attr("font-size", 10)
        .selectAll("path")
        .data(data)
        .join("path")
        .attr("transform", d => `translate(${x(d.avgBudget/1000000)},${y(d.avgRevenue/1000000)})`)
        .attr("fill", d => color(d.category))
        .attr("d", d => shape(d.category));
    }
  });

  return (
    <div id="profit-chart" className="diagram"></div>
  );
}

export default ScatterPlot;