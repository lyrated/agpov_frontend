import React from 'react';
import img from './img_home01.jpg'

function Home() {
  return (
    <div className="row py-3">
      <div className="col-12 col-xl-6">
        <section id="home">
          <p>
            Welcome to my final thesis project! I hope you will like it here :)
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
            <a href="/time" className="btn btn-primary px-3" role="button">Go to the first chart</a>
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
        </section>
      </div>
      <div className="col-12 col-xl-6 text-center my-auto">
        <img src={img} alt="Photograph of a cinema with pink neon lights" className="img-fluid rounded-lg" />
        <p className="small text-muted mb-0">Photo by <a href="https://unsplash.com/@myke_simon" target="_blank" rel="noopener noreferrer">Myke Simon</a> on Unsplash</p>
      </div>
    </div>
  );
}

export default Home;