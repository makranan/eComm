import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { Form, Button, Col, Row } from 'react-bootstrap';
import { FormContainer, CheckoutSteps } from '../components';
import { savePaymentMethod } from '../slices/cartSlice';
import { FaChevronRight, FaChevronLeft } from 'react-icons/fa';

const PaymentScreen = () => {
  const [paymentMethod, setPaymentMethod] = useState('PayPal');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate('/placeorder');
  };

  useEffect(() => {
    if (!shippingAddress) {
      navigate('/shipping');
    }
  }, [shippingAddress, navigate]);

  const ScrollToTop = () => {
    useEffect(() => {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }, []);

    return null;
  };
  ScrollToTop();

  return (
    <>
      <CheckoutSteps step1 step2 step3 />

      <FormContainer>
        <h1>Payment Method</h1>

        <Form onSubmit={submitHandler}>
          <Form.Group>
            <Form.Label as='legend'>Select Method</Form.Label>
            <Col>
              <br />
              <Form.Check
                id='paypal'
                name='paymentMethod'
                value='PayPal'
                className=''
                type='radio'
                label='PayPal or Credit Card'
                onChange={(e) => setPaymentMethod(e.target.value)}
                checked
              ></Form.Check>
              <br />
            </Col>
          </Form.Group>
          <Row className='d-flex align-items-center mt-4'>
            <Col>
              <Link to='/shipping' className='btn btn-light'>
                <div className='d-flex align-items-center'>
                  <FaChevronLeft /> &nbsp;Go Back
                </div>
              </Link>
              {/* <BtnGoBack /> */}
            </Col>
            <Col className='d-flex justify-content-end'>
              <Button
                type='submit'
                variant='primary'
                className='d-flex align-items-center'
              >
                Continue &nbsp;
                <FaChevronRight />
              </Button>
            </Col>
          </Row>
        </Form>
      </FormContainer>
    </>
  );
};

export default PaymentScreen;
