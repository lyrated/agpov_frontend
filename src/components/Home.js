import React from 'react';
import { NavLink } from 'react-router-dom';

function Home() {
  return (
    <main id="home" className="row justify-content-center">
      <div className="title">
        <h2>Where are the women?</h2>
      </div>
      <div className="welcome">
        <p className="font-weight-bold">
          Welcome to my final thesis project!
        </p>
        <p>
          My topic for the thesis is <strong>data visualization</strong>. I chose the database <a href="https://tmdb.org/" target="_blank" rel="noopener noreferrer">TMDb.org</a> with over 554K movies listed to make charts about the <strong>gender distribution</strong> in the movie industry with the help of the D3.js library. Precisely, I want to find out:
        </p>
        <ul>
          <li><em>How has the share of women changed over the years?</em></li>
          <li><em>How many women work in each department and movie genre?</em></li>
          <li><em>How much money is involved when women work on movies?</em></li>
        </ul>
        <div className="pb-3 text-center">
          <NavLink to="/time" className="btn btn-primary px-3" role="button">Go to the first chart</NavLink>
        </div>
        <p>
          If you find any technical errors, please contact me with screenshots included! You can reach me via <a href="mailto:Mai-Ly.Nguyen@Student.HTW-Berlin.de" target="_blank" rel="noopener noreferrer">e-mail</a> or on Discord at <strong>miyla#1024</strong>.
        </p>
        <p className="text-right text-info">
          - <em>Ly</em>
        </p>
        <p className="small pb-0">
          <em>Disclaimer:</em> In this project I only analyze people identified as female or male, but this does not mean that I want to push the agenda that there are only two genders. Unfortunately, there was not enough data to mention other genders in the charts.
        </p>
      </div>
    </main>
  );
}

export default Home;