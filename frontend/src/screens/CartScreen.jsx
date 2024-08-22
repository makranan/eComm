//TODO: fix h4 error
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
import { FaTrash, FaChevronLeft } from 'react-icons/fa';
import {
  BtnGoBack,
  BtnCount,
  Message,
  StyledNumberInput,
  FormContainer,
} from '../components';
import { addToCart, removeFromCart } from '../slices/cartSlice';
import { LinkContainer } from 'react-router-bootstrap';
import { createNextState } from '@reduxjs/toolkit';

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

  const styleVisibilityBelow400 = {
    display: window.innerWidth >= 510 ? 'none' : 'block',
  };

  const styleVisibilityAbove400 = {
    display: window.innerWidth < 510 ? 'none' : 'block',
  };

  return (
    <>
      <FormContainer xs={12} md={10}>
        <BtnGoBack />
        <Row className='mt-3' style={styleVisibilityAbove400}>
          <Col md={12}>
            {/* <h4 style={{ marginBottom: '30px' }}>Shopping Cart</h4> */}
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
                            style={{
                              maxHeight: '150px',
                            }}
                            // className={
                            //   window.innerWidth <= 350
                            //     ? 'display: none'
                            //     : 'display: block'
                            // }
                            // className={display: window.innerWidth <= 350 ? 'none' : 'block',}
                            fluid
                            rounded
                          ></Image>
                          {item.discount > 0 ? (
                            <div
                              className='discount-label'
                              style={{ marginBottom: '5px' }}
                            >
                              <span className='discount-label-content'>
                                {item.discount}%
                              </span>
                            </div>
                          ) : null}
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
                            <h4>
                              {item.discount && item.discount > 0 ? (
                                <div className='d-flex'>
                                  <h4>
                                    $
                                    {(
                                      item.price -
                                      (item.price * item.discount) / 100
                                    ).toFixed(2)}
                                  </h4>

                                  <h4
                                    // style={{
                                    //   textDecoration: 'line-through',
                                    //   color: 'red',
                                    // }}
                                    className='old-price'
                                  >
                                    ${item.price}
                                  </h4>
                                </div>
                              ) : (
                                <h4>${item.price}</h4>
                              )}
                            </h4>
                          </Col>

                          <Col md={3} xs={3} className='text-end'>
                            <Button
                              type='button'
                              variant='outline-danger'
                              className='btn btn-sm'
                              style={{ border: 'none' }}
                              onClick={() => removeFromCartHandler(item._id)}
                            >
                              <FaTrash size={14} />
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
        </Row>

        {/* BELOW 400px */}

        <Row style={styleVisibilityBelow400}>
          <Col md={12}>
            <h1
              // style={{ marginBottom: '20px', marginTop: '20px' }}
              className='my-4'
            >
              Shopping Cart
            </h1>
            {cartItems.length === 0 ? (
              <Message>
                Your cart is empty. <Link to='/'>Go Back</Link>
              </Message>
            ) : (
              <ListGroup variant='flush'>
                {/* LABELS */}
                {/* <Row
                className='mb-2'
                style={{ borderBottom: '1px solid lightgray' }}
              >
                <Col xs={5}>
                  <h6 className='mx-2'>Quantity</h6>
                </Col>
                <Col>
                  <h6>Price</h6>
                </Col>
                <Col></Col>
              </Row> */}
                {cartItems.map((item, index) => (
                  <ListGroup.Item
                    key={item._id}
                    className={index > 0 ? 'mt-2' : ''}
                  >
                    <Row>
                      {/* Image on the left */}

                      <Row>
                        <Col xs={6}>
                          <Link to={`/product/${item._id}`}>
                            <Image
                              src={item.images[0].original}
                              alt={item.name}
                              // style={{
                              //   maxHeight: '150px',
                              // }}
                              // className={
                              //   window.innerWidth <= 350
                              //     ? 'display: none'
                              //     : 'display: block'
                              // }
                              // className={display: window.innerWidth <= 350 ? 'none' : 'block',}
                              fluid
                              rounded
                            ></Image>
                          </Link>
                        </Col>

                        <Col xs={6}>
                          <Row className='text-end'>
                            <Col className='my-2'>
                              <h4>${item.price}</h4>
                            </Col>
                          </Row>

                          <Row>
                            <div className=''>
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
                          </Row>
                        </Col>
                      </Row>
                      {/* Details on the right */}

                      <Col xs={10}>
                        <Row>
                          <Col xs={10} className='mt-3'>
                            <Link to={`/product/${item._id}`}>
                              <h6>{item.name}</h6>
                            </Link>
                          </Col>
                        </Row>
                      </Col>

                      <Col
                        xs={2}
                        className='d-flex align-items-center justify-content-start'
                      >
                        <Button
                          type='button'
                          variant='danger'
                          className='btn btn-sm '
                          onClick={() => removeFromCartHandler(item._id)}
                        >
                          <FaTrash />
                        </Button>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            )}
          </Col>
        </Row>

        <Row>
          <Col></Col>
          <Col xs={12} md={8} lg={6} className='pt-4'>
            <Card
              style={{
                boxShadow: '0px -10px 10px rgba(0, 0, 0, 0.1)',
              }}
            >
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
                      <h5 style={{ marginLeft: '10px' }}>
                        Subtotal:
                        {/* Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}
                        ) items */}
                      </h5>
                    </Col>

                    <Col
                      md={7}
                      sm={6}
                      xs={6}
                      className='text-end'
                      style={{
                        verticalAlign: 'center',
                        padding: '0px',
                        marginTop: '10px',
                      }}
                    >
                      <h2 style={{ fontSize: '1.5rem' }}>
                        $
                        {/* {cartItems
                          .reduce((acc, item) => acc + item.qty * item.price, 0)
                          .toFixed(2)} */}
                        {cartItems
                          .reduce((acc, item) => {
                            let finalPrice = item.price;
                            if (item.discount) {
                              finalPrice =
                                item.price - (item.price * item.discount) / 100;
                            }
                            return acc + item.qty * finalPrice;
                          }, 0)
                          .toFixed(2)}
                      </h2>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item className='no-pd-mr'>
                  <Button
                    type='button'
                    className='custom-button btn-full-w'
                    style={{
                      backgroundColor: '#3d3a4e',
                      borderRadius: '0px',
                    }}
                    disabled={cartItems.length === 0}
                    onClick={checkoutHandler}
                  >
                    <span className='custom-button-content'>
                      Proceed to Checkout
                    </span>
                  </Button>
                  <LinkContainer to='/'>
                    <Button
                      type='button'
                      variant='sencodary'
                      bg='light'
                      className='back-button btn-full-w py-4'
                    >
                      <svg
                        height='16'
                        width='16'
                        xmlns='http://www.w3.org/2000/svg'
                        version='1.1'
                        viewBox='0 0 1024 1024'
                      >
                        <path d='M874.690416 495.52477c0 11.2973-9.168824 20.466124-20.466124 20.466124l-604.773963 0 188.083679 188.083679c7.992021 7.992021 7.992021 20.947078 0 28.939099-4.001127 3.990894-9.240455 5.996574-14.46955 5.996574-5.239328 0-10.478655-1.995447-14.479783-5.996574l-223.00912-223.00912c-3.837398-3.837398-5.996574-9.046027-5.996574-14.46955 0-5.433756 2.159176-10.632151 5.996574-14.46955l223.019353-223.029586c7.992021-7.992021 20.957311-7.992021 28.949332 0 7.992021 8.002254 7.992021 20.957311 0 28.949332l-188.073446 188.073446 604.753497 0C865.521592 475.058646 874.690416 484.217237 874.690416 495.52477z'></path>
                      </svg>
                      <span>CONTINUE SHOPPING</span>
                    </Button>
                  </LinkContainer>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      </FormContainer>
    </>
  );
};

export default CartScreen;
