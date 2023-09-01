import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import { Link } from 'react-router-dom';
import { Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap';
import { Rating, BtnGoBack } from '../components';
import axios from 'axios';

const ProductDetails = () => {
  const [product, setProduct] = useState([]);

  const { id: productId } = useParams();
  const isInStock = product.countInStock > 0;

  useEffect(() => {
    const fetchProduct = async () => {
      const { data } = await axios.get(`/api/products/${productId}`);
      setProduct(data);
    };
    fetchProduct();
  }, [productId]);

  return (
    <>
      <BtnGoBack className='btn-primary btn my-3' to='/' />
      <Row>
        <Col md={5}>
          <Image src={product.image} alt={product.name} fluid />
        </Col>
        <Col md={4}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h3>{product.name}</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              <Rating
                value={product.rating}
                text={`${product.numReviews} ratings`}
              />
            </ListGroup.Item>
            <ListGroup.Item>Price: $ {product.price}</ListGroup.Item>
            <ListGroup.Item>{product.description}</ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <Row>
                  <Col>Price:</Col>
                  <Col>
                    <strong>${product.price} </strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Stock:</Col>
                  <Col>
                    <strong
                      className={isInStock ? 'text-success' : 'text-danger'}
                    >
                      {`${
                        product.countInStock > 0
                          ? product.countInStock
                          : 'Out Of Stock'
                      }`}
                    </strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  className='btn-block'
                  type='button'
                  disabled={product.countInStock === 0}
                >
                  Add To Cart
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default ProductDetails;
