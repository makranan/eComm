import { useState, useEffect } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { FormContainer, CheckoutSteps } from '../components';
// import CheckoutSteps from '../components/CheckoutSteps';
import { saveShippingAddress } from '../slices/cartSlice';
import { FaChevronRight, FaChevronLeft } from 'react-icons/fa';

const ShippingScreen = () => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [address, setAddress] = useState(shippingAddress.address || '');
  const [city, setCity] = useState(shippingAddress.city || '');
  const [postalCode, setPostalCode] = useState(
    shippingAddress.postalCode || ''
  );
  const [country, setCountry] = useState(shippingAddress.country || '');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    navigate('/payment');
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
      <CheckoutSteps step1 step2 />
      <FormContainer>
        <h1>Shipping</h1>

        <Form onSubmit={submitHandler}>
          <Form.Group className='my-2' controlId='address'>
            <Form.Label>Address</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter address'
              value={address}
              required
              onChange={(e) => setAddress(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group className='my-2' controlId='city'>
            <Form.Label>City</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter city'
              value={city}
              required
              onChange={(e) => setCity(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group className='my-2' controlId='postalCode'>
            <Form.Label>Postal Code</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter postal code'
              value={postalCode}
              required
              onChange={(e) => setPostalCode(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group className='my-2' controlId='country'>
            <Form.Label>Country</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter country'
              value={country}
              required
              onChange={(e) => setCountry(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Row className='d-flex align-items-center mt-4'>
            <Col>
              <Link to={'/cart'} className='btn btn-light my-3'>
                <div className='d-flex align-items-center'>
                  <FaChevronLeft /> &nbsp;Go Back
                </div>
              </Link>
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

export default ShippingScreen;
