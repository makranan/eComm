import React from 'react';
import { Col, Row, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaApple, FaFacebook, FaGoogle } from 'react-icons/fa';
import { googleLogo, facebookLogo } from '../assets';

const LoginOtherOptions = () => {
  const responseMessage = (response) => {
    console.log(response);
  };
  const errorMessage = (error) => {
    console.log(error);
  };

  // test

  return (
    <Col className='d-flex align-items-center justify-content-center '>
      <Col className='text-center '>
        <div
          style={{
            borderTop: '1px solid #b1b1b1',
            borderBottom: '1px solid #b1b1b1',
            paddingTop: '10px',
            marginTop: '10px',
          }}
        >
          <Form.Label>
            <h6 className='unselectable'>Other options</h6>
          </Form.Label>
        </div>

        <div className='mb-2 pt-2 d-flex justify-content-center mt-3 unselectable'></div>

        <Row>
          <Link
          // to='/auth/google'
          >
            <Button
              className='btn-full-w'
              variant='secondary'
              style={{ border: '1px solid #eaeaea' }}
            >
              <div className='d-flex justify-content-center align-items-center'>
                {/* <FaGoogle size={24} style={{ marginRight: '10px' }} /> */}
                <img src={googleLogo} alt='Google' className='mx-2' />
                Sign In with Google
              </div>
            </Button>
          </Link>
        </Row>

        <Row className='mt-3'>
          <Link
          // to='/auth/google'
          >
            <Button
              className='btn-full-w'
              variant='secondary'
              style={{ border: '1px solid #eaeaea' }}
            >
              <div className='d-flex justify-content-center align-items-center'>
                {/* <FaFacebook size={24} style={{ marginRight: '10px' }} /> */}
                <img
                  src={facebookLogo}
                  alt='Facebook'
                  className='mx-2'
                  style={{ width: '20px' }}
                />
                Sign In with Facebook
              </div>
            </Button>
          </Link>
        </Row>

        <Row className='mt-3'>
          <Link
          // to='/auth/google'
          >
            <Button
              className='btn-full-w'
              variant='secondary'
              style={{ border: '1px solid #eaeaea' }}
            >
              <div className='d-flex justify-content-center align-items-center'>
                <FaApple size={24} style={{ marginRight: '10px' }} /> Sign In
                with Apple
              </div>
            </Button>
          </Link>
        </Row>

        <Button
          style={{ border: '1px solid #eaeaea' }}
          variant='secondary'
          className='btn-full-w mt-3'
        >
          Buy as guest
        </Button>
      </Col>
    </Col>
  );
};

export default LoginOtherOptions;
