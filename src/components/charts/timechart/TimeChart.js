import React, { useState, useEffect } from 'react';
import BarChart from './BarChart';

function TimeChart() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch('http://localhost:9000/api/years?size=55000&gender=1')
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
      {!loading && <BarChart data={data} />}
    </section>
  );
}

export default TimeChart;