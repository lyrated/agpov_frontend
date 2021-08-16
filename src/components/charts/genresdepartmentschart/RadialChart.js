import React, { useEffect } from 'react';
import * as d3 from 'd3';

/**
 * Zoomable Sunburst Base Code from https://observablehq.com/@d3/zoomable-sunburst
 */
function RadialChart({ data }) {
  useEffect(() => {
    if (data != null) {
      const width = 650;
      const radius = width / 6;

      const arc = d3.arc()
        .startAngle(d => d.x0)
        .endAngle(d => d.x1)
        .padAngle(d => Math.min((d.x1 - d.x0) / 2, 0.005))
        .padRadius(radius * 1.5)
        .innerRadius(d => d.y0 * radius)
        .outerRadius(d => Math.max(d.y0 * radius, d.y1 * radius - 1))

      const partition = data => {
        const root = d3.hierarchy(data)
          .sum(d => d.value)
          .sort((a, b) => b.value - a.value);
        return d3.partition()
          .size([2 * Math.PI, root.height + 1])
          (root);
      }

      // colors
      const color = d3.scaleOrdinal(d3.quantize(d3.interpolateRainbow, data.children.length + 1));

      const getColor = d => {
        if (d.depth === 3) {
          if (d.data.name === "Male") return "#FDC170";
          else if (d.data.name === "Female") return "#D40242";
          else return "#9A999F";
        }

        while (d.depth > 1) d = d.parent;
        return color(d.data.name);
      }

      const format = d3.format(",d");
      const formatPercentage = d3.format(".1f");

      const root = partition(data);

      root.each(d => d.current = d);

      // tooltip
      const tooltip = d3.select("body")
        .append("div")
        .style("position", "absolute")
        .style("padding", "0.2rem 0.5rem")
        .style("background", "#F0F0FA")
        .style("display", "block")
        .style("opacity", 0)
        .style("font-size", "14px")
        .style("color", "black");

      const showTooltip = (event, d) => {
        tooltip.transition().duration(100).delay(400)
          .style("opacity", 0.9)
          .style("display", "block");

        let parentString = d.ancestors()[1].data.name.toLowerCase();
        parentString = parentString === "genres" ? "all " + parentString : parentString;
        const percentage = d.value / d.ancestors()[1].value * 100;
        
        tooltip.html(`<p class="small text-muted mb-1">${d.ancestors().map(d => d.data.name).reverse().join(" > ")}</p>${formatPercentage(percentage)}% of ${parentString}<br />(${format(d.value)} people)`)
          .style("left", (event.pageX + 40) + "px")
          .style("top", (event.pageY - 10) + "px");
      }

      const hideTooltip = () => {
        tooltip
          .style("opacity", 0)
          .style("display", "none");
      }

      const svg = d3.select("#genres-departments-chart").append("svg")
        .attr("viewBox", [0, 0, width, width])
        .style("font", "10px sans-serif");

      const g = svg.append("g")
        .attr("transform", `translate(${width / 2},${width / 2})`);

      const path = g.append("g")
        .selectAll("path")
        .data(root.descendants().slice(1))
        .join("path")
        .attr("fill", getColor)
        .attr("fill-opacity", d => arcVisible(d.current) ? 0.75 : 0)
        .attr("d", d => arc(d.current))
        .on("mouseover", (event, d) => {
          if (arcVisible(d.current)) {
            showTooltip(event, d);
            setTimeout(hideTooltip, 6000);
          }
        })
        .on("mouseout", (event, d) => {
          hideTooltip();
        })
        .on("click", (event, d) => {
          hideTooltip();
        });

      path.filter(d => d.children)
        .style("cursor", "pointer")
        .on("click", clicked);

      const label = g.append("g")
        .attr("pointer-events", "none")
        .attr("text-anchor", "middle")
        .style("user-select", "none")
        .attr("fill", "#D2D2DC")
        .selectAll("text")
        .data(root.descendants().slice(1))
        .join("text")
        .attr("dy", "0.35em")
        .attr("fill-opacity", d => +labelVisible(d.current))
        .attr("transform", d => labelTransform(d.current))
        .text(d => d.data.name);

      const parent = g.append("circle")
        .datum(root)
        .attr("r", radius)
        .attr("fill", "none")
        .attr("pointer-events", "all")
        .on("click", clicked);

      const backLabel = g.append("text")
        .datum(root)
        .attr("pointer-events", "all")
        .style("cursor", "default")
        .style("font-size", "10pt")
        .attr("text-anchor", "middle")
        .attr("fill", "white")
        .attr("dy", "0")
        .text("Genres")
        .on("click", clicked);
      const goBackLabel = g.append("text")
        .datum(root)
        .attr("pointer-events", "all")
        .style("cursor", "default")
        .style("font-size", "8pt")
        .attr("text-anchor", "middle")
        .attr("fill", "transparent")
        .attr("dy", "10pt")
        .text("Go back")
        .on("click", clicked);

      function clicked(event, p) {
        if (p.depth > 0) {
          backLabel
            .style("cursor", "pointer")
            .text(`${p.parent.data.name} > ${p.data.name}`);
          goBackLabel.transition().duration(750)
            .style("cursor", "pointer")
            .attr("fill", "white");
        } else {
          backLabel
            .text("Genres")
            .style("cursor", "default");
          goBackLabel.transition().duration(750)
            .style("cursor", "default")
            .attr("fill", "transparent");
        }

        parent.datum(p.parent || root);
        backLabel.datum(p.parent || root);
        goBackLabel.datum(p.parent || root);

        root.each(d => d.target = {
          x0: Math.max(0, Math.min(1, (d.x0 - p.x0) / (p.x1 - p.x0))) * 2 * Math.PI,
          x1: Math.max(0, Math.min(1, (d.x1 - p.x0) / (p.x1 - p.x0))) * 2 * Math.PI,
          y0: Math.max(0, d.y0 - p.depth),
          y1: Math.max(0, d.y1 - p.depth)
        });

        const t = g.transition().duration(750);

        // Transition the data on all arcs, even the ones that aren’t visible,
        // so that if this transition is interrupted, entering arcs will start
        // the next transition from the desired position.
        path.transition(t)
          .tween("data", d => {
            const i = d3.interpolate(d.current, d.target);
            return t => d.current = i(t);
          })
          .filter(function (d) {
            return +this.getAttribute("fill-opacity") || arcVisible(d.target);
          })
          .attr("fill-opacity", d => arcVisible(d.target) ? 0.75 : 0)
          .attrTween("d", d => () => arc(d.current));

        label.filter(function (d) {
          return +this.getAttribute("fill-opacity") || labelVisible(d.target);
        }).transition(t)
          .attr("fill-opacity", d => +labelVisible(d.target))
          .attrTween("transform", d => () => labelTransform(d.current));
      }

      function arcVisible(d) {
        return d.y1 <= 3 && d.y0 >= 1 && d.x1 > d.x0;
      }

      function labelVisible(d) {
        return d.y1 <= 3 && d.y0 >= 1 && (d.y1 - d.y0) * (d.x1 - d.x0) > 0.03;
      }

      function labelTransform(d) {
        const x = (d.x0 + d.x1) / 2 * 180 / Math.PI;
        const y = (d.y0 + d.y1) / 2 * radius;
        return `rotate(${x - 90}) translate(${y},0) rotate(${x < 180 ? 0 : 180})`;
      }
    }
  });

  return (
    <div id="genres-departments-chart" className="diagram"></div>
  );
}

export default RadialChart;