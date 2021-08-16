import { React, useState } from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';

import TimeChart from './timechart/TimeChart';
import TimeChartSidebar from './timechart/Sidebar';
import TimeChartInfo from './timechart/Info';

import GenresDeparmentsChart from './genresdepartmentschart/GenresDepartmentsChart';
import GenresDepartmentsInfo from './genresdepartmentschart/Info';
import GenresDepartmentsSidebar from './genresdepartmentschart/Sidebar';

import ProfitChart from './profitchart/ProfitChart';
import ProfitChartSidebar from './profitchart/Sidebar';
import ProfitChartInfo from './profitchart/Info';

function ChartsLayout() {
  const [timeUrl, setTimeUrl] = useState({
    start: 1912,
    end: 2021,
    genre: 'all',
    dep: 'all',
    category: 'none'
  });

  const [gdUrl, setGdUrl] = useState({
    dataset: 'crew',
    time: 2010
  });

  const [profitUrl, setProfitUrl] = useState({
    dataset: 'acting'
  });

  return (
    <div className="row">
      <div className="col">
        <section id="sidebar">
          <h2>Filters</h2>
          <Router>
            <Route path="/time" render={() => <TimeChartSidebar setUrl={setTimeUrl} />} />
            <Route path="/genres" render={() => <GenresDepartmentsSidebar setUrl={setGdUrl} />} />
            <Route path="/profit" render={() => <ProfitChartSidebar setUrl={setProfitUrl} />} />
          </Router>
        </section>
      </div>

      <div className="col-12 col-lg-9 order-lg-first">
        <section id="charts">
          <Router>
            <Route path="/time" render={() => <TimeChartInfo url={timeUrl} />} />
            <Route path="/genres" render={() => <GenresDepartmentsInfo url={gdUrl} />} />
            <Route path="/profit" render={() => <ProfitChartInfo url={profitUrl} />} />
          </Router>

          <Router>
            <Route path="/time" render={() => <TimeChart url={timeUrl} />} />
            <Route path="/genres" render={() => <GenresDeparmentsChart url={gdUrl} />} />
            <Route path="/profit" render={() => <ProfitChart url={profitUrl} />} />
          </Router>
        </section>
      </div>
    </div>
  );
}

export default ChartsLayout;