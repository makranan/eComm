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
import { FaTrash } from 'react-icons/fa';
import { BtnGoBack, Message } from '../components';
import { addToCart, removeFromCart } from '../slices/cartSlice';

const CartScreen = () => {
  // eslint-disable-next-line no-unused-vars
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector(state => state.cart);
  const { cartItems } = cart;
  const addToCartHandler = async (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
  };

  const removeFromCartHandler = async id => {
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
  return (
    <>
      <BtnGoBack />
      <Row>
        <Col md={8}>
          <h1 style={{ marginBottom: '20px' }}>Shopping Cart</h1>
          {cartItems.length === 0 ? (
            <Message>
              Your cart is empty. <Link to='/'>Go Back</Link>
            </Message>
          ) : (
            <ListGroup variant='flush'>
              {cartItems.map(item => (
                <ListGroup.Item key={item._id}>
                  <Row>
                    <Col md={2} xs={2}>
                      <Link to={`/product/${item._id}`}>
                        <Image
                          src={item.image}
                          alt={item.name}
                          fluid
                          rounded
                        ></Image>
                      </Link>
                    </Col>
                    <Col md={4} xs={4} className='mb-4'>
                      <Link to={`/product/${item._id}`}>
                        <h6>{item.name}</h6>
                      </Link>
                    </Col>
                    <Col md={2} xs={2}>
                      <input
                        type='number'
                        value={item.qty}
                        onChange={e => {
                          const newValue = e.target.value;
                          // Ensure newValue is a positive number
                          const parsedValue = Number(newValue);
                          if (
                            !isNaN(parsedValue) &&
                            parsedValue >= 1 &&
                            parsedValue <= item.countInStock
                          ) {
                            // Value is valid, update the quantity
                            addToCartHandler(item, parsedValue);
                          } else {
                            // Value is not valid, you can handle this by showing an error message or taking appropriate action
                            // For now, let's set it to 1 as a default
                            // addToCartHandler(item, 1);
                            <Message variant='danger'>test</Message>;
                          }
                        }}
                        min={1}
                        max={item.countInStock}
                      />

                      {/* <Form.Control
                      as='select'
                      value={item.qty}
                      onChange={e =>
                        addToCartHandler(item, Number(e.target.value))
                      }
                    >
                      {[...Array(item.countInStock).keys()].map(x => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </Form.Control> */}
                    </Col>
                    <Col
                      md={2}
                      xs={2}
                      className={window.innerWidth <= 768 ? 'mt-2 ' : 'mt-2 '}
                    >
                      <strong>${item.price}</strong>
                    </Col>
                    <Col md={1} xs={2}>
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
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>
                  Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}
                  ) items
                </h2>

                <strong style={{ fontSize: '2rem' }}>
                  $
                  {cartItems
                    .reduce((acc, item) => acc + item.qty * item.price, 0)
                    .toFixed(2)}
                </strong>
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  type='button'
                  className='btn-block btn-lg btn-full-w'
                  disabled={cartItems.length === 0}
                  onClick={checkoutHandler}
                >
                  Proceed to Checkout
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default CartScreen;
