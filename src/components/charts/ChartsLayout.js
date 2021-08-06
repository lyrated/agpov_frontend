import { React } from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';

import Sidebar from './Sidebar';

import TimeChart from './timechart/TimeChart';
import GenresDeparmentsChart from './genresdepartmentschart/GenresDepartmentsChart';
import ProfitChart from './profitchart/ProfitChart';

function ChartsLayout() {

  return (
    <div className="row">
      <div className="col">
        <Sidebar />
      </div>

      <div className="col-12 col-xl-9 order-xl-first">
        <section id="info-text">
          <p>SOME INFO TEXT</p>
        </section>
        <Router>
          <Route path="/time" component={TimeChart} />
          <Route path="/genres" component={GenresDeparmentsChart} />
          <Route path="/profit" component={ProfitChart} />
        </Router>
      </div>
    </div>
  );
}

export default ChartsLayout;