import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Modal, Col, Row, Image } from 'react-bootstrap';

const MyModal = ({ product }) => {
  const [show, setShow] = useState(true);

  const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);

  return (
    <>
      <Modal show={show} onHide={handleClose} animation={true} centered>
        <Modal.Header closeButton>
          <Modal.Title>Item was added to your cart.</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col md={4} xs={2}>
              <Image src={product.images[0].original} fluid />
            </Col>
            <Col>
              <Link to={`/product/${product._id}`}>
                <h5>{product.name}</h5>
              </Link>
              <Row className='my-4'>
                <Col>
                  <strong>${product.price}</strong>
                </Col>
              </Row>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Link to='/cart'>
            <Button variant='primary' onClick={handleClose}>
              Go To Cart
            </Button>
          </Link>
          <Button variant='light' className='btn' onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default MyModal;
