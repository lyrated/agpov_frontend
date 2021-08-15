import { React, useState, useCallback } from 'react';

function GenresDepartmentsSidebar({ setUrl }) {
  // constants
  const START = 1920,
    END = 2020,
    DEFAULT_DATA = 'crew';

  // hooks
  const [dataset, setDataset] = useState(DEFAULT_DATA);
  const [time, setTime] = useState(2010);

  const isActive = i => {
    if (+time === i) {
      return true;
    } else {
      return false;
    }
  }

  const handleTimeChange = useCallback(e => {
    setTime(e.target.id);
    setUrl({ dataset: dataset, time: e.target.id });
  }, [setUrl, setTime, dataset]);

  const handleDatasetChange = useCallback(e => {
    let value = e.target.checked ? e.target.value : DEFAULT_DATA;
    setDataset(value);
    setUrl({ dataset: value, time: time });
  }, [setUrl, setDataset, time]);

  // time interval
  const yearsOptions = [];
  for (let i = START; i < END; i += 10) {
    yearsOptions.push(i);
  }

  return (
    <>
      <h3>Select data:</h3>
      <div className="form-check pb-4">
        <input type="checkbox" id="data" className="form-check-input" value="all" onChange={handleDatasetChange} />
        <label htmlFor="data" className="form-check-label">include actors</label>
      </div>
      <div className="pb-2">
        <h3>Select time interval:</h3>
        {yearsOptions.map(i => (
          <button className={'timespan' + (isActive(i) ? ' active' : '')} key={i} id={i}
            onClick={handleTimeChange}>{i} - {i + 9}</button>
        ))}
      </div>
    </>
  );
}

export default GenresDepartmentsSidebar;