import { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import { Product } from '../components';
import { ScaleLoader } from 'react-spinners';
import axios from 'axios';

const HomeScreen = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get('/api/products');
        setProducts(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <>
      <h1>Latest Products</h1>
      <Row>
        {loading ? (
          // Display a loading spinner while products are being fetched
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100vh',
            }}
          >
            <ScaleLoader color='#a5a5a5' loading={loading} size={150} />
          </div>
        ) : (
          // Display products once loading is complete
          products.map(product => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <ProductLoader product={product} />
            </Col>
          ))
        )}
      </Row>
    </>
  );
};

const ProductLoader = ({ product }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    // Simulate fetching product data
    setTimeout(() => {
      setLoading(false);
    }, 0); // Replace with actual fetching logic
  }, []);

  return (
    <div>
      {loading ? (
        // Display a loading spinner for each product while loading
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100px',
          }}
        >
          <ScaleLoader color='#a5a5a5' loading={loading} size={50} />
        </div>
      ) : (
        // Display the product once loading is complete
        <Product product={product} />
      )}
    </div>
  );
};

export default HomeScreen;
