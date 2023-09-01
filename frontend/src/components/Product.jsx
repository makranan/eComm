import { useState } from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Rating } from './';
import ScaleLoader from 'react-spinners/ScaleLoader';

const Product = ({ product, value, text }) => {
  const [loading, setLoading] = useState(true);

  const handleImageLoad = () => {
    setLoading(false);
  };

  return (
    <Card className='my-3 py-3 rounded'>
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
              <ScaleLoader color='#a5a5a5' loading={loading} size={30} />
            </div>
          )}
          <Card.Img
            src={product.image}
            variant='top'
            onLoad={handleImageLoad}
            style={{ display: loading ? 'none' : 'flex' }}
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
        <Card.Text as='h3'>${product.price}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;
