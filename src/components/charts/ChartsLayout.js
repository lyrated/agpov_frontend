import { React, useState } from 'react';

import Sidebar from './Sidebar';
import WorldMap from '../worldmap/WorldMap';

function ChartsLayout() {
  const [chart, setChart] = useState(<WorldMap />);

  return (
    <div className="row">
      <div className="col">
        <Sidebar setChart={setChart} />
      </div>

      <div className="col-12 col-xl-9 order-xl-first">
        <section id="info-text">
          <p>SOME INFO TEXT</p>
        </section>
        {chart}
      </div>
    </div>
  );
}

export default ChartsLayout;