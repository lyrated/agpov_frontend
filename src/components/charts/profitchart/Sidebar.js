import { React, useState, useCallback } from 'react';

function ProfitChartSidebar({ setUrl }) {
  // constants
  const DEFAULT_DATA = 'acting';

  const depsOptions = {
    acting: 'Lead actor',
    directing: 'Director teams',
    production: 'Production teams',
    writing: 'Writer teams'
  }

  // hooks
  const [dataset, setDataset] = useState(DEFAULT_DATA);

  const isActive = i => {
    if (dataset === i) {
      return true;
    } else {
      return false;
    }
  }

  const handleDatasetChange = useCallback(e => {
    setDataset(e.target.id);
    setUrl({ dataset: e.target.id });
  }, [setUrl, setDataset]);

  return (
    <div className="sticky-top pt-3">
      <h3>Select data grouping:</h3>
      {Object.keys(depsOptions).map(i => (
        <button className={'timespan' + (isActive(i) ? ' active' : '')} key={i} id={i}
          onClick={handleDatasetChange}>{depsOptions[i]}</button>
      ))}
    </div>
  );
}

export default ProfitChartSidebar;