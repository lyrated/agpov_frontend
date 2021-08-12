import React, { useState, useEffect } from 'react';
import BarChart from './BarChart';
import BarChartStacked from './BarChartStacked';

function TimeChart({ url }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    let urlString = '';
    Object.keys(url).forEach(u => {
      urlString += '&' + u + '=' + url[u];
    });
    fetch('http://localhost:9000/api/time?size=1000&' + urlString)
      .then(res => res.json())
      .then(setData)
      .then(() => setLoading(false))
      .catch(setError);
  }, [url]);

  if (error) {
    return <pre>{JSON.stringify(error, null, 2)}</pre>;
  }

  if (url.category !== 'none') {
    return (
      <section id="charts">
        <h2 className="text-center mb-1">Women's participation in movies over time</h2>
        <p className="text-center">Double click or use your mousewheel to zoom in</p>
        {loading && <p>LOADING...</p>}
        {!loading && <BarChartStacked data={data} />}
      </section>
    );
  } else {
    return (
      <section id="charts">
        <h2 className="text-center mb-1">Women's participation in movies over time</h2>
        <p className="text-center">Double click or use your mousewheel to zoom in</p>
        {loading && <p>LOADING...</p>}
        {!loading && <BarChart data={data} />}
      </section>
    );
  }
}

export default TimeChart;