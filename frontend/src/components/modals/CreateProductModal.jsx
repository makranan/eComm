import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useCreateProductMutation } from '../../slices/productsApiSlice';

const CreateProductModal = ({ showModal, setShowModal }) => {
  const [show, setShow] = useState(showModal);

  const [createProduct, { isLoading: loadingCreate }] =
    useCreateProductMutation();

  const handleClose = () => {
    setShowModal(false);
  };

  const handleCreate = () => {
    const createProductHandler = async () => {
      try {
        await createProduct();
        // refetch();
        toast.success('Product created successfully');
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    };
    // dispatch(createProduct(formData));
    // setShowModal(false);
  };

  return (
    <Modal show={show} onHide={handleClose} animation={true}>
      <Modal.Header closeButton>
        <Modal.Title>Create New Product</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* You can add a form here to collect information for the new product. */}
        {/* Example form fields:
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" placeholder="Enter product name" />
          </Form.Group>
          <Form.Group controlId="price">
            <Form.Label>Price</Form.Label>
            <Form.Control type="number" placeholder="Enter product price" />
          </Form.Group>
          ... Add more form fields as needed.
          */}
      </Modal.Body>
      <Modal.Footer>
        <Button variant='primary' onClick={handleCreate}>
          Create
        </Button>
        <Button variant='light' className='btn' onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateProductModal;
