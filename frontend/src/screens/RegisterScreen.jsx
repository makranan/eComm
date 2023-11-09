import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useRegisterMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { FormContainer, Loader } from '../components';
import { toast } from 'react-toastify';

const RegisterScreen = () => {
  const [validated, setValidated] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();

  const { userInfo } = useSelector((state) => state.auth);
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const redirect = searchParams.get('redirect') || '/';

  const validateForm = () => {
    if (name.trim() === '') {
      toast.error('Name is required');
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error('Invalid email format');
      return false;
    }
    if (password.length < 6) {
      toast.error('Password must be at least 6 characters long');
      return false;
    }
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return false;
    }
    if (!acceptTerms) {
      toast.error('Please accept the terms and services');
      return false;
    }
    return true;
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
      e.stopPropagation();
    }

    if (
      !email ||
      !password ||
      // password !== confirmPassword ||
      name.trim() === ''
    ) {
      // Do not trigger validation when either field is empty
      return;
    }

    if (validateForm()) {
      try {
        const res = await register({
          name,
          email,
          password,
        }).unwrap();
        dispatch(setCredentials({ ...res }));
        navigate(redirect);
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <FormContainer>
      <h1>Register</h1>
      <Form onSubmit={submitHandler} noValidate validated={validated}>
        <Form.Group controlId='name' className='my-3'>
          <Form.Label>Your Name</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter Your Name'
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='email' className='my-3'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          ></Form.Control>
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
        </Form.Group>

        <Form.Group controlId='confirmPassword' className='my-3'>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Confirm Password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='acceptTerms' className='my-4'>
          <Form.Check
            type='checkbox'
            className='checkbox-wrapper'
            label={
              <>
                <span style={{ color: 'red' }}>*</span> Accept our{' '}
                <Link> Terms and Services </Link>
              </>
            }
            checked={acceptTerms}
            onChange={(e) => setAcceptTerms(e.target.checked)}
            required
          />
        </Form.Group>

        <Button type='submit' variant='primary' disabled={isLoading}>
          Register
        </Button>
        {isLoading && <Loader />}
      </Form>
      <Row className='py-3'>
        <Col>
          Already Registered?{' '}
          <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
            Sign In
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default RegisterScreen;
