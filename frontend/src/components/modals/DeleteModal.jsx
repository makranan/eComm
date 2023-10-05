import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Modal, Col, Row, Image } from 'react-bootstrap';
import {
  useDeleteProductMutation,
  useGetProductDetailsQuery,
} from '../../slices/productsApiSlice';
import { toast } from 'react-toastify';

const DeleteModal = ({ product, showModal, setShowModal, onDelete }) => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShow(true);

  const [deleteProduct, { isLoading: loadingDelete, refetch }] =
    useDeleteProductMutation();

  const deleteHandler = async () => {
    try {
      if (product && product._id) {
        await onDelete(product._id);
        toast.success('Product deleted');
        navigate('/admin/productlist');
      } else {
        toast.error('Invalid product data.');
      }
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }

    handleClose();
  };

  return (
    <>
      <Modal show={showModal} onHide={handleClose} animation={true} centered>
        <Modal.Header closeButton>
          <Modal.Title>Your about to delete:</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {product ? ( // Check if product is not null/undefined
            <Row>
              <Col md={4} xs={2}>
                {product.images && product.images[0] ? ( // Check if images is an array and has at least one element
                  <Image src={product.images[0].original} fluid />
                ) : (
                  <p>No image available</p>
                )}
              </Col>
              <Col>
                <Link to={`/product/${product._id}`}>
                  <h5>{product.name}</h5>
                </Link>
                <Row className='my-4'>
                  <Col>
                    <h6>ID:</h6>
                    <strong>{product._id}</strong>
                    <h6
                      className='mt-3'
                      style={{
                        backgroundColor:
                          product.countInStock > 0 ? 'lightgreen' : 'orangered',
                        color: product.countInStock > 0 ? 'black' : 'white',
                        fontWeight: '900',
                        padding: '5px',
                        borderRadius: '5px',
                      }}
                    >
                      Stock: <span>{product.countInStock}</span>
                    </h6>
                    <strong></strong>
                  </Col>
                </Row>
              </Col>
            </Row>
          ) : (
            <p>Invalid product data.</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant='danger' onClick={deleteHandler}>
            Delete
          </Button>
          <Button variant='light' className='btn' onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DeleteModal;
