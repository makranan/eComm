import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Rating, Loader, BtnAddToCart } from './';

const Product = ({ product, value, text }) => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);

  const handleImageLoad = () => {
    setLoading(false);
  };

  return (
    <Card className='my-3'>
      <Link to={`/product/${product._id}`}>
        <div style={{ position: 'relative', minHeight: '200px' }}>
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
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>
        <Card.Text as='div'>
          <Rating
            value={product.rating}
            text={`${product.numReviews} reviews`}
          />
        </Card.Text>
        <Card.Text as='h3' style={{ marginTop: '10px' }}>
          ${product.price}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;
