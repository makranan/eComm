import { useState, useEffect, createContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col, InputGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {
  Loader,
  FormContainer,
  Login,
  LoginOtherOptions,
  ForgetPassword,
} from '../components';
import { useLoginMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';
import { toast } from 'react-toastify';
import Divider from '../components/Divider';

const LoginScreen = () => {
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  // const dispatch = useDispatch();
  const navigate = useNavigate();

  // const [login, { isLoading }] = useLoginMutation();

  // const { userInfo } = useSelector((state) => state.auth);
  // const { search } = useLocation();
  // const searchParams = new URLSearchParams(search);
  // const redirect = searchParams.get('redirect') || '/';

  // useEffect(() => {
  //   if (userInfo) {
  //     navigate(redirect);
  //   }
  // }, [userInfo, redirect, navigate]);

  return (
    <FormContainer xs={12} md={10}>
      <Row>
        <Col>
          {isForgotPassword ? (
            <ForgetPassword
              onBackToLogin={() => setIsForgotPassword(false)} // Pass a function to go back to Login
            />
          ) : (
            <Login
              onForgotPassword={() => setIsForgotPassword(true)} // Pass a function to switch to ForgetPassword
            />
          )}
        </Col>
        <Col md={4}>
          <LoginOtherOptions />
        </Col>
      </Row>
      {/* OTHER OPTION PLACEHOLDER */}

      {/* {isLoading && <Loader />} */}
    </FormContainer>
  );
};

export default LoginScreen;
