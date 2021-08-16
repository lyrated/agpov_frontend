import { React, useState } from 'react';
import Infobox from '../../common/Infobox';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

function GenresDepartmentsInfo({ url }) {
  let dataset = url.dataset === 'all' ? '' : <strong> (excluding acting)</strong>;

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const text = <>This chart shows how many female and male people work in all movie genres and departments{dataset} during the years <strong>
    {url.time} to {url.time + 9}</strong> according to the movie credits. <Button variant="info" onClick={handleShow}>
      Click here to read more.</Button></>;

  return (
    <>
      <h2 className="text-center mb-1">Gender distribution in genres and departments in the {url.time}s</h2>
      <p className="text-center">Click on a section to zoom in or the center to zoom out</p>
      <Infobox text={text} />

      {/* MODAL */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title><h2 className="mb-0">How this chart was made</h2></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>This chart is based on credits of movies from many different countries which were taken from the TMDb.org database.</p>
          <p>Not all movies had the full cast and crew listed.</p>
          <p>The people were grouped into <strong>movie genres</strong>, then their <strong>department</strong> and lastly the given <strong>gender</strong>. Movies without genres were excluded.</p>
          <p>Movies with multiple genres were counted once for each of their genres.</p>
          <p>The numbers were calculated by counting all people listed as female, male or undefined/non-binary of each group.</p>
          <p>Non-binary people were grouped together with undefined gender, because the area would be too small to show up on the chart.</p>
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

export default GenresDepartmentsInfo;