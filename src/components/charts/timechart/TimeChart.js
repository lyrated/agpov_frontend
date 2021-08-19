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
    fetch('/api/time?size=1000&' + urlString)
      .then(res => res.json())
      .then(setData)
      .then(() => setLoading(false))
      .catch(setError);
  }, [url]);

  if (error) {
    return <pre>{JSON.stringify(error, null, 2)}</pre>;
  }

  if (url.category === 'none') {
    return (
      <>
        {loading && <p>LOADING...</p>}
        {!loading && <BarChart data={data} />}
      </>
    );
  } else {
    return (
      <>
        {loading && <p>LOADING...</p>}
        {!loading && <BarChartStacked data={data} />}
      </>
    );
  }
}

export default TimeChart;