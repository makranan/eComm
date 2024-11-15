import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Row, Col, ListGroup, Image, Button, Card } from 'react-bootstrap';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import { Message, Loader } from '../components';
import { useSelector } from 'react-redux';
import {
  useGetOrderDetailsQuery,
  usePayOrderMutation,
  useGetPayPalClientIdQuery,
  useDeliverOrderMutation,
} from '../slices/orderApiSlice';
import { toast } from 'react-toastify';

const OrderScreen = () => {
  const { id: orderId } = useParams();
  const {
    data: order,
    refetch,
    isLoading,
    error,
  } = useGetOrderDetailsQuery(orderId);

  const [deliverOrder, { isLoading: loadingDeliver }] =
    useDeliverOrderMutation();

  const deliverOrderHandler = async () => {
    try {
      await deliverOrder(orderId);
      refetch();
      toast.success('Order delivered');
    } catch (err) {
      toast.error(err?.data?.message || err.message);
    }
  };

  const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation();
  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();
  const {
    data: paypal,
    isLoading: loadingPayPal,
    error: errorPayPal,
  } = useGetPayPalClientIdQuery();
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!errorPayPal && !loadingPayPal && paypal.clientId) {
      const loadPayPalScript = async () => {
        paypalDispatch({
          type: 'resetOptions',
          value: {
            'client-id': paypal.clientId,
            currency: 'USD',
          },
        });
        paypalDispatch({ type: 'setLoadingStatus', value: 'pending' });
      };

      if (order && !order.isPaid) {
        if (!window.paypal) {
          loadPayPalScript();
        }
      }
    }
  }, [order, paypal, paypalDispatch, loadingPayPal, errorPayPal]);

  function onApprove(data, actions) {
    return actions.order.capture().then(async function (details) {
      try {
        await payOrder({ orderId, details });
        refetch();
        toast.success('Payment successfull');
      } catch (err) {
        toast.error(
          `Payment unsuccessfull: ${err?.data?.message || err.message}`
        );
      }
    });
  }

  async function onApproveTest() {
    await payOrder({ orderId, details: { payer: {} } });
    refetch();
    toast.success('Payment successfull');
  }

  function onError(err) {
    toast.error(err.message);
  }

  function createOrder(data, actions) {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: {
              value: order.totalPrice,
            },
          },
        ],
      })
      .then((orderId) => {
        return orderId;
      });
  }

  const ScrollToTop = () => {
    useEffect(() => {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }, []);

    return null;
  };
  ScrollToTop();

  return isLoading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'></Message>
  ) : (
    <>
      <h1 className='mb-4' style={{ marginTop: '60px' }}>
        <span className='unselectable'>Order </span>
        <strong
          className='text-white '
          style={{
            background: 'grey',
            fontWeight: '700',
            fontSize: '1em',
            textWrap: 'wrap',
            whiteSpace: 'normal', // This property controls text wrapping
            overflowWrap: 'break-word', // This property ensures word breaks when needed
          }}
        >
          {order._id}
        </strong>
      </h1>

      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>User</h2>
              <p>
                <strong>Username: </strong> {order.user.name}
              </p>

              <p>
                <strong>Email: </strong> {order.user.email}
              </p>

              <h2>Shipping</h2>

              <p>
                <strong>Name: </strong>
                {order.shippingAddress.name}
              </p>
              <p>
                <strong>Address: </strong> {order.shippingAddress.address},{' '}
                {order.shippingAddress.city} {order.shippingAddress.postalCode},{' '}
                {order.shippingAddress.country}
              </p>
              {order.isDelivered ? (
                <Message variant='success'>
                  Delivered on {order.deliveredAt}
                </Message>
              ) : (
                <Message variant='danger'>Not Delivered</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method:</strong> {order.paymentMethod}
              </p>
              {order.isPaid ? (
                <Message variant='success'>Paid on {order.paidAt}</Message>
              ) : (
                <Message variant='danger'>Not Paid</Message>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Order Items</h2>
              {order.orderItems.map((item, index) => (
                <ListGroup.Item key={index}>
                  <Row className='d-flex align-items-center'>
                    <Col md={2} xs={3}>
                      <Image
                        src={item.images[0].thumbnail}
                        alt={item.name}
                        fluid
                      />
                    </Col>

                    <Col>
                      <Link to={`/product/${item.product}`}>
                        <h6>{item.name}</h6>
                      </Link>
                    </Col>

                    <Col md={4} xs={3}>
                      {item.qty} * {item.price} ={' '}
                      <strong>${(item.qty * item.price).toFixed(2)}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
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
                <h2 className='pt-2'>Order Summary:</h2>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Items:</Col>
                  <Col>
                    <strong>${order.itemsPrice}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Shipping:</Col>
                  <Col>
                    <strong>${order.shippingPrice}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Tax:</Col>
                  <Col>
                    <strong>${order.taxPrice}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row
                  style={{
                    padding: '10px 0 ',
                  }}
                >
                  <Col>Total:</Col>
                  <Col>
                    <strong>${order.totalPrice}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              {!order.isPaid && (
                <ListGroup.Item>
                  {loadingPay && <Loader />}
                  {isPending ? (
                    <Loader />
                  ) : (
                    <div>
                      <Button
                        onClick={onApproveTest}
                        style={{ marginBottom: '5px' }}
                      >
                        Test Pay Order
                      </Button>
                      <div>
                        <PayPalButtons
                          createOrder={createOrder}
                          onApprove={onApprove}
                          onError={onError}
                        ></PayPalButtons>
                      </div>
                    </div>
                  )}
                </ListGroup.Item>
              )}

              {loadingDeliver && <Loader />}

              {userInfo &&
                userInfo.isAdmin &&
                order.isPaid &&
                !order.isDelivered && (
                  <ListGroup.Item>
                    <Button
                      type='button'
                      className='btn btn-block'
                      onClick={deliverOrderHandler}
                    >
                      Mark as Delivered
                    </Button>
                  </ListGroup.Item>
                )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default OrderScreen;
