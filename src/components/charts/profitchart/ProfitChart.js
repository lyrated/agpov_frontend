import React, { useState, useEffect } from 'react';
import ScatterPlot from './ScatterPlot';

function ProfitChart() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch('http://localhost:9000/api/profit?size=20000&dataset=acting')
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
      {!loading && <ScatterPlot data={data} />}
    </section>
  );
}

export default ProfitChart;