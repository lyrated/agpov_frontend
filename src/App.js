import React from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import Home from './components/Home';
import WorldMap from './components/worldmap/WorldMap';
import ChartsLayout from './components/charts/ChartsLayout';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Route path="/" component={Home} exact />
        <Route path="/charts" component={ChartsLayout} />
        <Route path="/world-map" component={WorldMap} />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
