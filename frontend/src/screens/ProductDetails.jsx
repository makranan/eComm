import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  Form,
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
} from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import {
  Rating,
  BtnGoBack,
  BtnCount,
  Loader,
  Message,
  ProductImageGallery,
  StyledNumberInput,
} from '../components';
import { useGetProductDetailsQuery } from '../slices/productsApiSlice';
import { addToCart } from '../slices/cartSlice';
import { FaPlus, FaMinus } from 'react-icons/fa';

// import '../assets/styles/custom.css';

const ProductDetails = () => {
  const { id: productId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [qty, setQty] = useState(1);
  const [selectedQty, setSelectedQty] = useState(1);

  const {
    data: product,
    isLoading,
    error,
  } = useGetProductDetailsQuery(productId);

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
    navigate('/cart');
  };

  function ScrollToTop() {
    useEffect(() => {
      window.scrollTo(0, 0);
    }, []);

    return null;
  }
  ScrollToTop();

  return (
    <>
      <BtnGoBack className='btn-primary btn my-3' to='/' />

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <Row>
          <Col md={5}>
            {/* <Image src={product.image} alt={product.name} fluid /> */}
            <ProductImageGallery
              images={product.images}
              showPlayButton={false}
            />
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
                      <strong style={{ fontWeight: '600' }}>
                        ${product.price}{' '}
                      </strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item
                  variant={product.countInStock === 0 ? 'danger' : ''}
                >
                  <Row>
                    <Col>Stock:</Col>
                    <Col>
                      <strong
                        style={{
                          color: product.countInStock > 0 ? 'green' : 'red',
                        }}
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
                {product.countInStock > 0 && (
                  <ListGroup.Item>
                    <Row className='d-flex align-items-center'>
                      {/* <Col>Qty:</Col> */}
                      <Col>
                        <div className='d-flex flex-column align-items-center'>
                          <StyledNumberInput
                            value={qty}
                            onChange={newValue => {
                              setQty(newValue); // Update local state
                            }}
                            min={1}
                            max={product.countInStock}
                          />

                          <div style={{ marginTop: '5px' }}>
                            <BtnCount
                              initialValue={qty}
                              maxValue={product.countInStock}
                              onCountChange={newCount => {
                                setQty(newCount); // Update local state
                              }}
                              step={1}
                              increaseIcon={<FaPlus />}
                              decreaseIcon={<FaMinus />}
                            />
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                )}

                <ListGroup.Item className='no-pd-mr'>
                  <Button
                    className='btn-block btn-full-w'
                    type='button'
                    disabled={product.countInStock === 0}
                    onClick={addToCartHandler}
                  >
                    Add To Cart
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </>
  );
};

export default ProductDetails;
