import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col, InputGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Loader, FormContainer } from '../components';
import { useLoginMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';
import { GoogleLogin, useGoogleOneTapLogin } from '@react-oauth/google';
import { toast } from 'react-toastify';
import Divider from '../components/Divider';

const LoginScreen = () => {
  const [validated, setValidated] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const redirect = searchParams.get('redirect') || '/';

  const responseMessage = (response) => {
    console.log(response);
  };
  const errorMessage = (error) => {
    console.log(error);
  };

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, redirect, navigate]);

  const submitHandler = async (e) => {
    e.preventDefault();

    const form = e.currentTarget;
    setValidated(true);

    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }

    if (!email || !password) {
      // Do not trigger validation when either field is empty
      return;
    }

    try {
      const res = await login({
        email,
        password,
      }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate(redirect);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  // useGoogleOneTapLogin({
  //   onSuccess: (credentialResponse) => {
  //     console.log(credentialResponse);
  //   },
  //   onError: () => {
  //     console.log('Login Failed');
  //   },
  // });

  return (
    <FormContainer xs={12} md={10}>
      <h1>Sign In</h1>
      <Form onSubmit={submitHandler} noValidate>
        <Row>
          <Col md={6}>
            <Form.Group controlId='email' className='my-3'>
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type='email'
                placeholder='Enter Email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              ></Form.Control>
              {/* <Form.Control.Feedback type='valid'>
            Email is valid.
          </Form.Control.Feedback> */}
              <Form.Control.Feedback type='invalid'>
                Please enter a valid email.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId='password' className='my-3'>
              <Form.Label>Enter Password</Form.Label>
              <Form.Control
                type='password'
                placeholder='Enter Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              ></Form.Control>
              {/* <Form.Control.Feedback type='valid'>
            Password is valid.
          </Form.Control.Feedback> */}
              <Form.Control.Feedback type='invalid'>
                Please enter a valid password.
              </Form.Control.Feedback>
            </Form.Group>

            <Row className='mt-2'>
              <Col xs={6}>
                <Button type='submit' variant='primary' disabled={isLoading}>
                  Sign In
                </Button>
              </Col>
              {/* <Col xs={4}>
            <h6>New Customer? </h6>
          </Col> */}
              <Col xs={6} className='text-end'>
                <Link
                  to={redirect ? `/register?redirect=${redirect}` : '/register'}
                >
                  <Button variant='primary'>Register</Button>
                </Link>
              </Col>
            </Row>
            <Row>
              <Col xs={6} className='mt-4'>
                <Link
                  to={redirect ? `/register?redirect=${redirect}` : '/register'}
                >
                  Forgot Password?
                </Link>
              </Col>
            </Row>
          </Col>

          <Col
            md={6}
            className='d-flex align-items-center justify-content-center '
          >
            <Col xs={12} md={6} className='text-center '>
              <div
                style={{
                  borderTop: '1px solid #b1b1b1',
                  borderBottom: '1px solid #b1b1b1',
                  paddingTop: '10px',
                  marginTop: '10px',
                }}
              >
                <Form.Label>
                  <h6>Other options</h6>
                </Form.Label>
              </div>

              <div className='mb-2 pt-2 d-flex justify-content-center mt-3'>
                <GoogleLogin
                  type='standard'
                  size='large'
                  theme='outline'
                  onSuccess={responseMessage}
                  onError={errorMessage}
                  useOneTap
                />
              </div>
              {/* <useGoogleOneTapLogin /> */}

              <Button
                style={{ border: '1px solid #eaeaea' }}
                variant='secondary'
                className='btn-full-w mt-3'
              >
                Buy as guest
              </Button>
            </Col>
          </Col>
        </Row>
        {isLoading && <Loader />}
      </Form>
    </FormContainer>
  );
};

export default LoginScreen;
