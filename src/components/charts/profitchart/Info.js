import { React, useState } from 'react';
import Infobox from '../../common/Infobox';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

function ProfitChartInfo({ url }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  let data;
  switch (url.dataset) {
    case 'acting':
      data = 'lead actors';
      break;
    case 'directing':
      data = 'director teams';
      break;
    case 'writing':
      data = 'writer teams';
      break;
    case 'production':
      data = 'production teams';
      break;
    default:
      data = url.dataset;
  }

  const text = <>This chart shows the average budget and revenue <strong>(adjusted for inflation)</strong> of movies from 1913 - 2021 grouped by the <strong>
    {data}' gender</strong>. Each shape represents one genre and you can hover over them for more information. <Button
      variant="info" onClick={handleShow}>Click here to read more.</Button></>;

  return (
    <>
      <h2 className="text-center mb-0">Average budget and revenue of movie genres grouped by {data}' gender</h2>
      <p className="text-center">Double click or use your mousewheel to zoom in</p>
      <Infobox text={text} />

      {/* MODAL */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title><h2 className="mb-0">How this chart was made</h2></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>This chart is based on data of movies from many different countries which were taken from the TMDb.org database.</p>
          <p>The movies were grouped into <strong>movie genres</strong> and the <strong>gender</strong> of the {data}. Movies without genres, budget and revenue data were excluded.</p>
          <p>Movies with multiple genres were counted once for each of their genres.</p>
          <p>The numbers are <strong>adjusted for inflation</strong> by taking the CPI (Consumer Price Index) of their release date and the mean value was calculated.</p>
          <p>For the dataset with lead actors, the first actor listed in the credits was assumed to be the lead actor and selected to analyze.</p>
          <p>For the dataset with other departments, the data was grouped by teams with "only women", "only men" and "mixed gender" (women and men).</p>
          <p>Unfortunately there was not enough data for non-binary people to show in this chart.</p>
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

export default ProfitChartInfo;