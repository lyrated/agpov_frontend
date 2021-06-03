import { React, useState } from 'react';

import Sidebar from './Sidebar';
import TimeChart from './timechart/TimeChart';
import GenresDeparmentsChart from './GenresDepartmentsChart';
import WorldMap from '../worldmap/WorldMap';

function ChartsLayout() {
  const [chart, setChart] = useState(<WorldMap />);

  return (
    <div className="row">
      <div className="col">
        <Sidebar />
      </div>

      <div className="col-12 col-xl-9 order-xl-first">
        <section id="info-text">
          <button className="btn btn-primary mr-2" onClick={() => setChart(<TimeChart />)}>Female participation over time</button>
          <button className="btn btn-primary mr-2" onClick={() => setChart(<GenresDeparmentsChart />)}>In genres</button>
          <button className="btn btn-primary mr-2" onClick={() => setChart(<WorldMap />)}>In departments</button>
        </section>
        {chart}
      </div>
    </div>
  );
}

export default ChartsLayout;