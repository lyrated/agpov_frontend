import React from 'react';

import TimeChart from './timechart/TimeChart';
import GenresDeparmentsChart from './GenresDepartmentsChart';
import WorldMap from '../worldmap/WorldMap';

function Sidebar({ setChart }) {
  return (
    <section id="sidebar">
      <p>SIDEBAR</p>
      <button className="btn btn-primary mb-2 d-block" onClick={() => setChart(<TimeChart />)}>Female participation over time</button>
      <button className="btn btn-primary mb-2 d-block" onClick={() => setChart(<GenresDeparmentsChart />)}>In genres/deparments</button>
      <button className="btn btn-primary mb-2 d-block" onClick={() => setChart(<WorldMap />)}>Budget and revenue</button>
    </section>
  );
}

export default Sidebar;