import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { CheckoutSteps, Message, Loader, BtnGoBack } from '../components';
import { useCreateOrderMutation } from '../slices/orderApiSlice';
import { clearCartItems } from '../slices/cartSlice';
import { FaCcVisa } from 'react-icons/fa';
import { BsPaypal } from 'react-icons/bs';
import { MdOutlineAttachMoney } from 'react-icons/md';

const PlaceOrderScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.auth.userInfo);
  const [createOrder, { isLoading, error }] = useCreateOrderMutation();

  useEffect(() => {
    if (!cart.shippingAddress.address) {
      navigate('/shipping');
    } else if (!cart.paymentMethod) {
      navigate('/payment');
    }
  }, [cart.shippingAddress.address, cart.paymentMethod, navigate]);

  let paymentIcon;

  if (cart.paymentMethod === 'PayPal') {
    paymentIcon = <BsPaypal />;
  } else if (cart.paymentMethod === 'Blik') {
    paymentIcon = '';
  } else if (cart.paymentMethod === 'Cash') {
    paymentIcon = <MdOutlineAttachMoney />;
  } else if (cart.paymentMethod === 'Visa') {
    paymentIcon = <FaCcVisa />;
  }

  const placeOrderHandler = async () => {
    try {
      const res = await createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
        user: user._id,
      }).unwrap();

      dispatch(clearCartItems());
      navigate(`/order/${res._id}`);
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  const ScrollToTop = () => {
    useEffect(() => {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }, []);

    return null;
  };
  ScrollToTop();

  return (
    <>
      <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
      <BtnGoBack />
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item className='py-4'>
              <h2>Shipping</h2>
              <p>
                <strong>Name: </strong>
                {cart.shippingAddress.name}
              </p>
              <p>
                <strong>Address: </strong>
                {cart.shippingAddress.address}, {cart.shippingAddress.city}{' '}
                {cart.shippingAddress.postalCode},{' '}
                {cart.shippingAddress.country}
              </p>
            </ListGroup.Item>

            <ListGroup.Item className='py-4'>
              <h2>Payment Method</h2>
              <strong>Method: </strong>
              {paymentIcon} {cart.paymentMethod}
            </ListGroup.Item>

            <ListGroup.Item className='py-4'>
              <h2>Order Items</h2>
              {cart.cartItems.length === 0 ? (
                <Message>Your cart is empty.</Message>
              ) : (
                <ListGroup variant='flush'>
                  {cart.cartItems.map((item, index) => (
                    <ListGroup.Item
                      key={index}
                      className={index > 0 ? 'mt-2' : ''}
                    >
                      <Row className='d-flex align-items-center'>
                        <Col md={3} xs={3}>
                          <Image
                            src={item.images[0].original}
                            alt={item.name}
                            fluid
                            rounded
                          ></Image>
                        </Col>

                        <Col>
                          <Link to={`/product/${item._id}`}>
                            <h6>{item.name}</h6>
                          </Link>
                        </Col>

                        <Col md={3} xs={3}>
                          {item.qty} * {item.price} ={' '}
                          <strong>
                            {' '}
                            ${(item.qty * item.price).toFixed(2)}
                          </strong>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>

        <Col md={4}>
          <Card
            style={{
              boxShadow: '0px -5px 15px rgba(0, 0, 0, 0.1)',
            }}
          >
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2 className='pt-2'>Order Summary</h2>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Items:</Col>
                  <Col>
                    <strong>${cart.itemsPrice}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Shipping:</Col>
                  <Col>
                    <strong>${cart.shippingPrice}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Tax:</Col>
                  <Col>
                    <strong>${cart.taxPrice}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item variant='info'>
                <Row>
                  <Col>Total:</Col>
                  <Col>
                    <strong style={{ fontWeight: '600' }}>
                      ${cart.totalPrice}
                    </strong>
                  </Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                {error && (
                  <Message variant='danger'>{error.data.message}</Message>
                )}
                {isLoading && <Loader />}
              </ListGroup.Item>

              <ListGroup.Item>
                <p>
                  By placing order you are accepting our{' '}
                  <Link to='/tos'>Terms of Service</Link>
                </p>
              </ListGroup.Item>

              <ListGroup.Item className='no-pd-mr'>
                <Button
                  type='button'
                  className='btn-block btn-lg btn-full-w'
                  disabled={cart.cartItems.length === 0}
                  onClick={placeOrderHandler}
                >
                  Place Order
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default PlaceOrderScreen;
