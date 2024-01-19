import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { Form, Button, Col, Row } from 'react-bootstrap';
import { FormContainer, CheckoutSteps, BtnGoBack } from '../components';
import { savePaymentMethod } from '../slices/cartSlice';
import { paypalLogo, blikLogo, cashLogo, visaLogo } from '../assets';
import { FaChevronRight, FaChevronLeft } from 'react-icons/fa';

const PaymentScreen = () => {
  const cart = useSelector((state) => state.cart);

  const { paymentMethod: initialPaymentMethod } = cart;
  const [paymentMethod, setPaymentMethod] = useState(
    initialPaymentMethod || 'PayPal'
  );
  const { shippingAddress } = cart;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoSize = 100;

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate('/placeorder');
  };

  const handlePaymentMethod = (method) => {
    setPaymentMethod(method);
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

            {/* Use buttons instead of radio options */}
            <Col style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button
                variant='light'
                className={`payment-logo ${
                  paymentMethod === 'PayPal' ? 'selected' : ''
                }`}
                onClick={() => handlePaymentMethod('PayPal')}
              >
                <img src={paypalLogo} alt='PayPal' width={logoSize} />
              </Button>

              <Button
                variant='light'
                className={`payment-logo ${
                  paymentMethod === 'Blik' ? 'selected' : ''
                }`}
                style={{ marginLeft: '1rem' }}
                onClick={() => handlePaymentMethod('Blik')}
              >
                <img src={blikLogo} alt='Blik' width={logoSize} />
              </Button>

              <Button
                variant='light'
                className={`payment-logo ${
                  paymentMethod === 'Cash' ? 'selected' : ''
                }`}
                style={{ marginLeft: '1rem' }}
                onClick={() => handlePaymentMethod('Cash')}
              >
                <img src={cashLogo} alt='Cash' width={logoSize} />
              </Button>

              <Button
                variant='light'
                className={`payment-logo ${
                  paymentMethod === 'Visa' ? 'selected' : ''
                }`}
                style={{ marginLeft: '1rem' }}
                onClick={() => handlePaymentMethod('Visa')}
              >
                <img src={visaLogo} alt='Visa' width={logoSize} />
              </Button>
            </Col>

            {/* <Col>
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

              <Form.Check
                id='blik'
                name='paymentMethod'
                value='Blik'
                className=''
                type='radio'
                label='Blik'
                onChange={(e) => setPaymentMethod(e.target.value)}
              ></Form.Check>
            </Col> */}
          </Form.Group>
          <Row className='d-flex align-items-center mt-4'>
            <Col>
              <BtnGoBack />
              <Link to='/shipping' className='btn btn-light'>
                <div className='d-flex align-items-center'>
                  <FaChevronLeft /> &nbsp;Go Back
                </div>
              </Link>
              {/* <BtnGoBack /> */}
            </Col>
            <Col className='d-flex justify-content-end'>
              <Button type='submit' variant='primary' className='custom-button'>
                <span className='d-flex align-items-center custom-button-content'>
                  Continue &nbsp;
                  <FaChevronRight />
                </span>
              </Button>
            </Col>
          </Row>
        </Form>
      </FormContainer>
    </>
  );
};

export default PaymentScreen;
