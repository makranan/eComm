import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Row,
  Col,
  ListGroup,
  Image,
  // eslint-disable-next-line no-unused-vars
  Form,
  Button,
  Card,
} from 'react-bootstrap';
import { FaTrash, FaPlus, FaMinus, FaChevronLeft } from 'react-icons/fa';
import { BtnGoBack, BtnCount, Message, StyledNumberInput } from '../components';
import { addToCart, removeFromCart } from '../slices/cartSlice';
import { LinkContainer } from 'react-router-bootstrap';

const CartScreen = () => {
  // eslint-disable-next-line no-unused-vars
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const addToCartHandler = async (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
  };

  const removeFromCartHandler = async (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate('/login?redirect=/shipping');
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  function ScrollToTop() {
    useEffect(() => {
      window.scrollTo(0, 0);
    }, []);

    return null;
  }
  ScrollToTop();

  return (
    <>
      <BtnGoBack />
      <Row>
        <Col md={12}>
          <h1 style={{ marginBottom: '20px' }}>Shopping Cart</h1>
          {cartItems.length === 0 ? (
            <Message>
              Your cart is empty. <Link to='/'>Go Back</Link>
            </Message>
          ) : (
            <ListGroup variant='flush'>
              {/* LABELS */}
              <Row
                className='mb-2'
                style={{ borderBottom: '1px solid lightgray' }}
              >
                <Col xs={2}></Col>
                <Col xs={5}>
                  <h6 className='mx-2'>Quantity</h6>
                </Col>
                <Col>
                  <h6>Price</h6>
                </Col>
                <Col></Col>
              </Row>
              {cartItems.map((item, index) => (
                <ListGroup.Item
                  key={item._id}
                  className={index > 0 ? 'mt-2' : ''}
                >
                  <Row>
                    {/* Image on the left */}

                    <Col md={2} xs={2}>
                      <Link to={`/product/${item._id}`}>
                        <Image
                          src={item.images[0].original}
                          alt={item.name}
                          style={{ maxHeight: '150px' }}
                          fluid
                          rounded
                        ></Image>
                      </Link>
                    </Col>

                    {/* Details on the right */}

                    <Col xs={10}>
                      <Row>
                        <Col md={6} xs={6}>
                          <div className='d-flex align-items-center'>
                            <StyledNumberInput
                              value={item.qty}
                              onChange={(newValue) => {
                                addToCartHandler(item, newValue);
                              }}
                              min={1}
                              max={item.countInStock}
                            />

                            {/* <BtnCount
                              initialValue={item.qty}
                              maxValue={item.countInStock}
                              onCountChange={(newCount) =>
                                addToCartHandler(item, newCount)
                              }
                              step={1}
                              increaseIcon={<FaPlus />}
                              decreaseIcon={<FaMinus />}
                            /> */}
                          </div>
                        </Col>
                        <Col
                          md={3}
                          xs={3}
                          className={
                            window.innerWidth <= 768 ? 'mt-2 ' : 'mt-2 '
                          }
                        >
                          <h4>${item.price}</h4>
                        </Col>

                        <Col md={2} xs={2} className='text-end'>
                          <Button
                            type='button'
                            variant='danger'
                            className='btn btn-sm'
                            onClick={() => removeFromCartHandler(item._id)}
                          >
                            <FaTrash />
                          </Button>
                        </Col>
                      </Row>

                      <Row>
                        <Col sm={12} xs={12} className='mt-3'>
                          <Link to={`/product/${item._id}`}>
                            <h6>{item.name}</h6>
                          </Link>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>

        <Col></Col>

        <Col md={8} lg={6} xl={6} xxl={5}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <Row className='d-flex align-items-center'>
                  <Col
                    md={5}
                    sm={6}
                    xs={6}
                    style={{
                      verticalAlign: 'center',
                      padding: '0px',
                      marginTop: '10px',
                    }}
                  >
                    <h2 style={{ marginLeft: '10px' }}>
                      Subtotal:
                      {/* Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}
                  ) items */}
                    </h2>
                  </Col>

                  <Col md={7} sm={6} xs={6} className='text-end'>
                    <strong style={{ fontSize: '2rem' }}>
                      $
                      {cartItems
                        .reduce((acc, item) => acc + item.qty * item.price, 0)
                        .toFixed(2)}
                    </strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item className='no-pd-mr'>
                <Button
                  type='button'
                  className='btn-block btn-lg btn-full-w'
                  disabled={cartItems.length === 0}
                  onClick={checkoutHandler}
                >
                  Proceed to Checkout
                </Button>
                <LinkContainer to='/'>
                  <Button
                    type='button'
                    variant='light'
                    className='btn-block btn-lg btn-full-w'
                  >
                    <FaChevronLeft /> Continue Shopping
                  </Button>
                </LinkContainer>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default CartScreen;
