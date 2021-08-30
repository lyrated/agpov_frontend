import React from 'react';
import { NavLink } from 'react-router-dom';

function Header() {
  return (
    <header className="row m-0">
      <div className="col-12 col-xl-6 p-0">
        <a href="/"><h1>A gendered point of view</h1></a>
        <p className="subtitle">Visualizing gender distribution in the movie industry</p>
      </div>

      {/* Navigation */}
      <div className="col p-0">
        <nav className="navbar navbar-expand-md px-0">
          <ul className="navbar-nav mx-auto ml-md-auto">
            <li className="nav-item">
              <NavLink exact to="/" activeClassName="active" className="nav-link">Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/time" activeClassName="active" className="nav-link">Distribution over time</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/genres" activeClassName="active" className="nav-link">Genres &amp; Departments</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/profit" activeClassName="active" className="nav-link">Budget &amp; Revenue</NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;