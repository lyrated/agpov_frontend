import React, { useState, useEffect } from 'react';
import * as d3 from 'd3';


function GenresDeparmentsChart() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch('http://localhost:9000/api/genres-departments?gender=1')
      .then(res => res.json())
      .then(setData)
      .then(() => setLoading(false))
    .catch(setError);
  }, []);

  useEffect(() => {
    if (data != null) {
      let bardata = [];
      Object.keys(data).forEach(d => {
        bardata.push(data[d]);
      });
      let height = 400,
        width = 900,
        yScale = d3.scaleLinear()
          .domain([0, d3.max(bardata)])
          .range([0, height]),
        xScale = d3.scaleBand()
          .domain(bardata)
          .padding(0.2)
          .range([0, width]);

      let chart = d3.select('#genres-departments-chart').append('svg')
        .attr('width', width)
        .attr('height', height)
        // .style('background', '#F0F0F3')
        .selectAll('rect').data(bardata)
        .enter().append('rect')
        .style('fill', '#D93B63')
        .attr('width', (d) => {
          return xScale.bandwidth();
        })
        .attr('height', 0)
        .attr('x', (d) => {
          return xScale(d);
        })
        .attr('y', height);

      //animation
      chart.transition()
        .attr('height', (d) => {
          return yScale(d);
        })
        .attr('y', (d, i) => {
          return height - yScale(d);
        })
        .duration(1000)
        .delay((d, i) => {
          return i * 100
        });
    }
  }, [data]);

  if (error) {
    return <pre>{JSON.stringify(error, null, 2)}</pre>;
  }

  return (
    <section id="charts">
      <p>{loading ? 'LOADING...' : JSON.stringify(data)}</p>
      <div id="genres-departments-chart" className="diagram"></div>
    </section>
  );
}

export default GenresDeparmentsChart;