import { useState } from 'react';
import { Card, Row, Col, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
// eslint-disable-next-line no-unused-vars
import { Link, useParams } from 'react-router-dom';
import { useDeleteProductMutation } from '../slices/productsApiSlice';
import { Rating, Loader, BtnAddToCart } from './';
import { AddToCartModal, DeleteModal } from './modals';
import { FaEdit, FaTrash } from 'react-icons/fa';

const Product = ({ product, value, text }) => {
  // const { id: productId } = useParams();

  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAddToCartModal, setShowAddToCartModal] = useState(false);

  const { userInfo } = useSelector((state) => state.auth);

  const [deleteProduct, { isLoading: loadingDelete }] =
    useDeleteProductMutation();

  const handleImageLoad = () => {
    setLoading(false);
  };

  const openDeleteModal = () => {
    setShowDeleteModal(true);
  };

  const openAddToCartModal = () => {
    setShowAddToCartModal(true);
  };

  return (
    <Card className='my-3 card-shadow'>
      {userInfo && userInfo.isAdmin && (
        <Col className='text-end'>
          <Link to={`/admin/product/${product._id}/edit`}>
            <Button variant='light' className='btn-sm'>
              <FaEdit />
            </Button>
          </Link>
          <Button
            variant='light'
            className='btn-sm'
            onClick={() => openDeleteModal()}
          >
            <FaTrash style={{ color: 'red' }} />
          </Button>
        </Col>
      )}

      {product && (
        <AddToCartModal
          product={product}
          showModal={showAddToCartModal}
          setShowModal={setShowAddToCartModal}
        />
      )}

      {product && (
        <DeleteModal
          product={product}
          showModal={showDeleteModal}
          setShowModal={setShowDeleteModal}
          onDelete={deleteProduct}
        />
      )}

      <Link to={`/product/${product._id}`}>
        <div>
          {loading && (
            <div
              style={{
                // position: 'relative',
                // top: '50%',
                // left: '50%',
                // transform: 'translate(-50%, -50%)',
                padding: '70px',
              }}
            >
              <Loader />
            </div>
          )}
          <Card.Img
            src={product.images[0].original}
            variant='top'
            onLoad={handleImageLoad}
            style={{
              display: loading ? 'none' : 'flex',
              marginTop: '0px',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        </div>
      </Link>
      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Title as='div' className='product-title'>
            <strong>
              <h6>{product.name}</h6>
            </strong>
          </Card.Title>
        </Link>
        <Card.Text as='div'>
          <Rating
            value={product.rating}
            text={`${product.numReviews} reviews`}
          />
        </Card.Text>
        <Row className='d-flex align-items-center'>
          <Col lg={6} md={7} sm={7} xs={6}>
            <Card.Text as='h5' style={{ marginTop: '10px' }}>
              <div
                style={{
                  whiteSpace: 'nowrap',
                  backgroundColor: '#ffffff',
                  zIndex: '1',
                  display: 'inline-block',
                  position: 'relative',
                  pointerEvents: 'none',
                  borderRadius: '5px',
                  marginBottom: '5px',
                }}
              >
                <strong>${product.price}</strong>
              </div>
            </Card.Text>
          </Col>
          <Col>
            <div className='text-end' style={{ transform: 'translateX(2px)' }}>
              <BtnAddToCart
                product={product}
                onAddToCart={() => openAddToCartModal()}
              />
            </div>
          </Col>
        </Row>
      </Card.Body>
      {/* Render the MyModal component with product information */}
      {/* {showModal && (
        <MyModal product={product} handleClose={() => setShowModal(false)} />
      )} */}
    </Card>
  );
};

export default Product;
