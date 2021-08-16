import React from 'react';
import img from './img_home01.jpg'

function Home() {
  return (
    <section id="home">
      <h2>How many women work in the movie industry?</h2>
      <div className="row py-3">
        <div className="col-12 col-lg-6 pr-5">
          <p>
            Welcome and thank you for your interest in my final thesis project: <em>"A gendered point of view"</em>! I hope you'll like it.
          </p>
          <p>
            My topic for the thesis is <strong>data visualization</strong>, and I chose the database <a href="https://tmdb.org/" target="_blank" rel="noopener noreferrer">TMDb.org</a> to make charts about the <strong>gender distribution</strong> of the people working in the movie industry with the help of the D3.js library.
          </p>
          <p>
            The questions I'm trying to answer by analyzing the data were:
          </p>
          <ul>
            <li><em>How has the share of women changed over the years?</em></li>
            <li><em>How many women work in each department and movie genre?</em></li>
            <li><em>How much money is involved when women work in the movie industry?</em></li>
          </ul>
          <div className="pb-3 text-center">
            <a href="/time" className="btn btn-primary px-3" role="button">Go to the first chart</a>
          </div>
          <p>
            If you find any technical errors, please contact me with screenshots included! You can reach me via <a href="mailto:Mai-Ly.Nguyen@Student.HTW-Berlin.de">e-mail</a> or on Discord at <strong>miyla#1024</strong>.
          </p>
          <p className="text-right text-info">
            - <em>Ly</em>
          </p>
          <p className="small">
            <em>Disclaimer:</em> In this project I only analyze people identified as female or male, but this does not mean that I want to push the agenda that there are only two genders. Unfortunately, there was not enough data to mention other genders in the charts.
          </p>
        </div>

        <div className="col-12 col-lg-6 text-right">
          <img src={img} alt="Photograph of a cinema with pink neon lights" className="img-fluid" />
          <span className="small text-muted">Photo by <a href="https://unsplash.com/@myke_simon?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Myke Simon</a> on Unsplash</span>
        </div>
      </div>
    </section>
  );
}

export default Home;