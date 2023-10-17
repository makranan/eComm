import React from 'react';
import { Col, Row, Form, Button } from 'react-bootstrap';

const LoginOtherOptions = () => {
  const responseMessage = (response) => {
    console.log(response);
  };
  const errorMessage = (error) => {
    console.log(error);
  };
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
