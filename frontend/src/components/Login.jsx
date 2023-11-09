import { useState, useEffect, useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col, InputGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Loader, FormContainer } from '../components';
import { useLoginMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';

import { toast } from 'react-toastify';
import Divider from '../components/Divider';
import { Eye, EyeSlash } from 'react-bootstrap-icons';

const Login = ({ onForgotPassword }) => {
  const [showPassword, setShowPassword] = useState(false);

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
    <>
      <h1>Sign In</h1>
      <Form onSubmit={submitHandler} noValidate>
        <Col>
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
            <InputGroup>
              <Form.Control
                type={showPassword ? 'text' : 'password'}
                placeholder='Enter Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <InputGroup.Text
                onClick={() => setShowPassword(!showPassword)}
                style={{ cursor: 'pointer' }}
              >
                {showPassword ? <EyeSlash size={20} /> : <Eye size={20} />}
              </InputGroup.Text>
            </InputGroup>
            {/* <Form.Control.Feedback type='valid'>
            Password is valid.
          </Form.Control.Feedback> */}
            <Form.Control.Feedback type='invalid'>
              Please enter a valid password.
            </Form.Control.Feedback>
          </Form.Group>

          <Row className='mt-2'>
            <Col xs={6}>
              <Button
                type='submit'
                variant='primary'
                className='custom-button'
                style={{ backgroundColor: '#3d3a4e' }}
                disabled={isLoading}
              >
                <span className='custom-button-content '>Sign In</span>
              </Button>
            </Col>
            {/* <Col xs={4}>
            <h6>New Customer? </h6>
          </Col> */}
            <Col xs={6} className='text-end'>
              <Link
                to={redirect ? `/register?redirect=${redirect}` : '/register'}
              >
                <Button
                  variant='primary'
                  className='custom-button'
                  style={{ backgroundColor: '#3d3a4e' }}
                >
                  <span className='custom-button-content'>Register</span>
                </Button>
              </Link>
            </Col>
          </Row>
          <Row>
            <Col xs={6} className='mt-4'>
              <Link onClick={onForgotPassword} className='unselectable'>
                Forgot Password?
              </Link>
            </Col>
          </Row>
        </Col>

        {isLoading && <Loader />}
      </Form>
    </>
  );
};

export default Login;
