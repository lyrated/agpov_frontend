import { React, useState } from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';

import TimeChart from './timechart/TimeChart';
import TimeChartSidebar from './timechart/Sidebar';

import GenresDeparmentsChart from './genresdepartmentschart/GenresDepartmentsChart';
import ProfitChart from './profitchart/ProfitChart';

function ChartsLayout() {
  const [timeUrl, setTimeUrl] = useState('&start=1912&end=2021&genre=all&dep=all&category=none');

  return (
    <div className="row">
      <div className="col">
        <section id="sidebar">
          <Router>
            <Route path="/time" render={() => <TimeChartSidebar setUrl={setTimeUrl} />} />
            {/* <Route path="/genres" component={GenresDeparmentsChart} />
            <Route path="/profit" component={ProfitChart} /> */}
          </Router>
        </section>
      </div>

      <div className="col-12 col-xl-9 order-xl-first">
        <section id="info-text">
          <p>SOME INFO TEXT</p>
        </section>
        <Router>
          <Route path="/time" render={() => <TimeChart url={timeUrl} />} />
          <Route path="/genres" component={GenresDeparmentsChart} />
          <Route path="/profit" component={ProfitChart} />
        </Router>
      </div>
    </div>
  );
}

export default ChartsLayout;