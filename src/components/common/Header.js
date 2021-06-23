import React from 'react';
import { NavLink } from 'react-router-dom';

function Header() {
  return (
    <header className="row m-0">
      <div className="col-12 col-lg-6 p-0">
        <a href="/"><h1>Gender Behind The Scenes</h1></a>
        <p className="subtitle">Visualizing gender distribution in the movie industry</p>
      </div>

      {/* Navigation */}
      <div className="col p-0 my-auto">
        <nav className="navbar navbar-expand-md px-0">
          <ul className="navbar-nav ml-0 ml-md-auto">
            <li className="nav-item">
              <NavLink exact to="/" activeClassName="active" className="nav-link">Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/charts" activeClassName="active" className="nav-link">Charts</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/world-map" activeClassName="active" className="nav-link">World Map</NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;