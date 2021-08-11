import React, { useState, useEffect } from 'react';
import BarChart from './BarChart';
import BarChartStacked from './BarChartStacked';

function TimeChart({ url }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch('http://localhost:9000/api/time?size=1000&' + url)
      .then(res => res.json())
      .then(setData)
      .then(() => setLoading(false))
      .catch(setError);
  }, [url]);

  if (error) {
    return <pre>{JSON.stringify(error, null, 2)}</pre>;
  }

  if (!url.includes('category=none')) {
    return (
      <section id="charts">
        {loading && <p>LOADING...</p>}
        {!loading && <BarChartStacked data={data} />}
      </section>
    );
  } else {
    return (
      <section id="charts">
        {loading && <p>LOADING...</p>}
        {!loading && <BarChart data={data} />}
      </section>
    );
  }
}

export default TimeChart;