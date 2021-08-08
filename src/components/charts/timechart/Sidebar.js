import { React, useState, useCallback } from 'react';

function TimeChartSidebar({ url, setUrl }) {
  // constants
  const START = 1912,
    END = 2021,
    GENRES = {
      all: 'All', action: 'Action', adventure: 'Adventure',
      animation: 'Animation', comedy: 'Comedy',
      crime: 'Crime', documentary: 'Documentary',
      drama: 'Drama', family: 'Family',
      fantasy: 'Fantasy', history: 'History',
      horror: 'Horror', music: 'Music',
      mystery: 'Mystery', romance: 'Romance',
      sciencefiction: 'Science Fiction', tvmovie: 'TV Movie',
      thriller: 'Thriller', war: 'War', western: 'Western'
    };

  // hooks
  const [start, setStart] = useState(START);
  const [end, setEnd] = useState(END);
  const [genre, setGenre] = useState('all');
  const [dep, setDep] = useState('all');
  const [cat, setCat] = useState('genres');

  const handleInputChange = useCallback(e => {
    setUrl('start=' + start + '&end=' + end + '&genre=' + genre + '&dep=' + dep + '&category=' + cat);
  }, [setUrl, start, end, genre, dep, cat]);

  // select options
  const yearsOptions = [];
  for (let i = START; i <= END; i++) {
    yearsOptions.push(<option key={i}>{i}</option>);
  }

  const genresOptions = [];
  for (let g of Object.keys(GENRES)) {
    genresOptions.push(<option key={g} value={g}>{GENRES[g]}</option>);
  }

  return (
    <>
      <div className="pb-2">
        <h2>Select years:</h2>
        <label className="mb-0">Start</label>
        <select className="custom-select" name="start" defaultValue={start} onChange={e => setStart(e.target.value)}>
          {yearsOptions}
        </select>
        <label className="mt-2 mb-0">End</label>
        <select className="custom-select" name="end" defaultValue={end} onChange={e => setEnd(e.target.value)}>
          {yearsOptions}
        </select>
      </div>

      <div className="py-2" onChange={e => setCat(e.target.value)}>
        <h2>Show category:</h2>
        <div className="form-check mb-1">
          <input className="form-check-input" type="radio" name="cat" id="catGenres" value="genres"
            disabled={!(genre === 'all' && dep === 'all')} defaultChecked />
          <label className="form-check-label" htmlFor="catGenres">
            Genres
          </label>
        </div>
        <div className="form-check">
          <input className="form-check-input" type="radio" name="cat" id="catDeps" value="departments"
            disabled={!(genre === 'all' && dep === 'all')} />
          <label className="form-check-label" htmlFor="catDeps">
            Departments
          </label>
        </div>
      </div>

      <div className="py-2">
        <h2>Genres:</h2>
        <select className="custom-select" name="genre" defaultValue={'all'} onChange={e => setGenre(e.target.value)}>
          {genresOptions}
        </select>
      </div>

      <div className="py-2">
        <h2>Departments:</h2>
        <select className="custom-select" name="dep" defaultValue={'all'} onChange={e => setDep(e.target.value)}>
          <option value="all">All</option>
          <option value="acting">Acting</option>
          <option value="writing">Writing</option>
          <option value="production">Production</option>
          <option value="directing">Directing</option>
        </select>
      </div>

      <p>{url}</p>
      <button className="btn btn-primary mt-2 w-100"
        onClick={handleInputChange}>Apply</button>
    </>
  );
}

export default TimeChartSidebar;