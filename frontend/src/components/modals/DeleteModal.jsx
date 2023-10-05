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
      await onDelete(product._id); // Call onDelete, which is deleteProduct from ProductDetails

      toast.success('Product deleted');
      navigate('/admin/productlist');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }

    handleClose();
  };

  return (
    <>
      <Modal show={showModal} onHide={handleClose} animation={true}>
        <Modal.Header closeButton>
          <Modal.Title>Your about to delete:</Modal.Title>
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
                  <strong>{product._id}</strong>
                </Col>
              </Row>
            </Col>
          </Row>
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
