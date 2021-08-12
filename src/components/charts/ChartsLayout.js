import { React, useState } from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';

import TimeChart from './timechart/TimeChart';
import TimeChartSidebar from './timechart/Sidebar';
import TimeChartInfo from './timechart/Info';

import GenresDeparmentsChart from './genresdepartmentschart/GenresDepartmentsChart';
import ProfitChart from './profitchart/ProfitChart';

function ChartsLayout() {
  const [timeUrl, setTimeUrl] = useState({
    start: 1912,
    end: 2021,
    genre: 'all',
    dep: 'all',
    category: 'none'
  });

  // const [gdUrl, setGdUrl] = useState({});

  // const [profitUrl, setProfitUrl] = useState({});

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
        <section id="info-text" className="row mx-0">
          <div className="col-auto my-auto text-center text-info">
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" className="bi bi-info-circle-fill" viewBox="0 0 16 16">
              <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" />
            </svg>
          </div>
          <Router>
            <Route path="/time" render={() => <TimeChartInfo url={timeUrl} />} />
            {/* <Route path="/genres" component={GenresDeparmentsChart} />
            <Route path="/profit" component={ProfitChart} /> */}
          </Router>
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