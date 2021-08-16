import { React, useState, useCallback } from 'react';

function TimeChartSidebar({ setUrl }) {
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
  const [cat, setCat] = useState('none');
  const [selected, setSelected] = useState('none');

  const handleCatChange = e => {
    setCat(e.target.value);
    setSelected(e.target.value);
  }

  const handleGenreChange = e => {
    setGenre(e.target.value);
    if (e.target.value !== 'all') {
      setSelected('none');
      setCat('none');
    }
  }

  const handleDepChange = e => {
    setDep(e.target.value);
    if (e.target.value !== 'all') {
      setSelected('none');
      setCat('none');
    }
  }

  const handleInputChange = useCallback(e => {
    setUrl({ start: start, end: end, genre: genre, dep: dep, category: cat });
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
    <div class="sticky-top pt-3">
      <div className="pb-2">
        <h3>Select years:</h3>
        <label className="mb-0">Start</label>
        <select className="custom-select" name="start" defaultValue={start} onChange={e => setStart(e.target.value)}>
          {yearsOptions}
        </select>
        <label className="mt-2 mb-0">End</label>
        <select className="custom-select" name="end" defaultValue={end} onChange={e => setEnd(e.target.value)}>
          {yearsOptions}
        </select>
      </div>

      <div className="py-2">
        <h3>Select genre:</h3>
        <select className="custom-select" name="genre" defaultValue={'all'} onChange={handleGenreChange}>
          {genresOptions}
        </select>
      </div>

      <div className="py-2">
        <h3>Select department:</h3>
        <select className="custom-select" name="dep" defaultValue={'all'} onChange={handleDepChange}>
          <option value="all">All</option>
          <option value="acting">Acting</option>
          <option value="writing">Writing</option>
          <option value="production">Production</option>
          <option value="directing">Directing</option>
        </select>
      </div>

      <div className="pt-2">
        <h3>Divide into categories:</h3>
        <select className="custom-select" value={selected} name="cat" onChange={handleCatChange}>
          <option value="none">None</option>
          <option value="genres" disabled={genre !== 'all' || dep !== 'all'}>Genres</option>
          <option value="departments" disabled={genre !== 'all' || dep !== 'all'}>Departments</option>
        </select>
        <p className="small">Category can only be selected if 'All' is selected in above filters.</p>
      </div>

      <button className="btn btn-primary w-100"
        onClick={handleInputChange}>Apply filters</button>
    </div>
  );
}

export default TimeChartSidebar;