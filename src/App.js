import React from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import Home from './components/Home';
import ChartsLayout from './components/charts/ChartsLayout';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Route path="/" component={Home} exact />
        <Route path="/time" component={ChartsLayout} />
        <Route path="/genres" component={ChartsLayout} />
        <Route path="/profit" component={ChartsLayout} />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
