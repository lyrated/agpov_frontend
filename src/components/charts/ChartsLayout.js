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

import ProfitChart from './budgetrevenuechart/BudgetRevenueChart';
import ProfitChartSidebar from './budgetrevenuechart/Sidebar';
import ProfitChartInfo from './budgetrevenuechart/Info';

function ChartsLayout() {
  const [timeUrl, setTimeUrl] = useState({
    start: 1920,
    end: 2020,
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
    <main className="row">
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
    </main>
  );
}

export default ChartsLayout;