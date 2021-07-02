import React, { useState, useEffect } from 'react';
import RadialChart from './RadialChart';


function GenresDeparmentsChart() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch('http://localhost:9000/api/genres-departments?size=100000&dataset=crew')
      .then(res => res.json())
      .then(setData)
      .then(() => setLoading(false))
    .catch(setError);
  }, []);

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