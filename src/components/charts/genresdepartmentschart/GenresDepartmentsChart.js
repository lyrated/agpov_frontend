import React, { useState, useEffect } from 'react';
import RadialChart from './RadialChart';


function GenresDeparmentsChart({ url }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    let urlString = '';
    Object.keys(url).forEach(u => {
      urlString += '&' + u + '=' + url[u];
    });
    fetch('http://localhost:9000/api/genres-departments?size=10000' + urlString)
      .then(res => res.json())
      .then(setData)
      .then(() => setLoading(false))
      .catch(setError);
  }, [url]);

  if (error) {
    return <pre>{JSON.stringify(error, null, 2)}</pre>;
  }

  return (
    <section id="charts">
      {loading && <p>LOADING...</p>}
      {!loading && <RadialChart data={data} />}
    </section>
  );
}

export default GenresDeparmentsChart;