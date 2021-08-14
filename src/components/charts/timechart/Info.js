import { React, useState } from 'react';
import Infobox from '../../common/Infobox';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

function TimeChartInfo({ url }) {
  let genre = url.genre === 'all' ? 'movies of all genres' : url.genre + ' movies';
  let dep = url.dep === 'all' ? 'all departments' : url.dep;

  let textCat = '';
  if (url.category !== 'none') {
    textCat = `The bars are divided into sections which show how many participated in which ${url.category}.`;
    textCat += ' Hover over each section to get more information.';
  }

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const text = <>This chart shows the percentages of women who worked in <strong>{dep}</strong> and <strong>{genre}
    </strong> during the years <strong>{url.start} to {url.end}</strong> according to the movie credits. {textCat} <Button 
    variant="info" onClick={handleShow}>Click here to read more.</Button></>;

  return (
    <>
      <h2 className="text-center mb-0">Women's participation in {genre} over the years {url.start} - {url.end}</h2>
      <p className="text-center">Double click or use your mousewheel to zoom in</p>
      <Infobox text={text} />

      {/* MODAL */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title><h2 className="mb-0">How this chart was made</h2></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>This chart is based on credits of movies from many different countries which were taken from the TMDb.org database.</p>
          <p>Not all movies had the full cast and crew listed.</p>
          <p>The movies were grouped into <strong>years</strong> according to their release date. The chart excluded movies without release date.</p>
          <p>It also only considers people who were marked with the gender <strong>female or male</strong>.</p>
          <p>The numbers were calculated by counting all people listed as women, and dividing it by the sum of all female and male people.</p>
          <p>Roughly <strong>36%</strong> of the credited people did not have any gender listed or were non-binary.</p>
          <p>Unfortunately, non-binary people could not be included in this analysis as there was not enough data.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default TimeChartInfo;