import React, { useState, useEffect } from 'react';
import ScatterPlot from './ScatterPlot';

function ProfitChart({ url }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    let urlString = '';
    Object.keys(url).forEach(u => {
      urlString += '&' + u + '=' + url[u];
    });
    fetch('/api/profit?size=55000' + urlString)
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
      {!loading && <ScatterPlot data={data} />}
    </section>
  );
}

export default ProfitChart;