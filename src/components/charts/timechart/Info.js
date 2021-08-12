import { React } from 'react';

function TimeChartInfo({ url }) {
  let genre = url.genre === 'all' ? 'all genres' : url.genre + ' movies';
  let dep = url.dep === 'all' ? 'all departments' : url.dep;

  let textCat = '';
  if (url.category !== 'none') {
    textCat = `The bars are divided into sections which show how many participated in which ${url.category}.`;
    textCat += ' Hover over each section to get more information.';
  }

  return (
    <div className="col">
      <p>
        This chart shows how many women worked in <strong>{dep}</strong> in <strong>{genre}
        </strong> during the years <strong>{url.start} to {url.end}</strong> according to the movie credits. {textCat}
        <a href="#"> Click here to read more.</a>
      </p>
    </div>
  );
}

export default TimeChartInfo;