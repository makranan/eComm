import { useState } from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Rating, Loader, BtnAddToCart, MyModal } from './';

const Product = ({ product, value, text }) => {
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const handleImageLoad = () => {
    setLoading(false);
  };

  return (
    <Card className='my-3'>
      <Link to={`/product/${product._id}`}>
        <div>
          {loading && (
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
              }}
            >
              <Loader />
            </div>
          )}
          <Card.Img
            src={product.image}
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
                onAddToCart={() => setShowModal(true)}
              />
            </div>
          </Col>
        </Row>
      </Card.Body>
      {/* Render the MyModal component with product information */}
      {showModal && (
        <MyModal product={product} handleClose={() => setShowModal(false)} />
      )}
    </Card>
  );
};

export default Product;
