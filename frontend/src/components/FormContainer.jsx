import { Container, Row, Col } from 'react-bootstrap';

const FormContainer = ({ children, sm = 12, md = 6 }) => {
  return (
    <Container>
      <Row className='justify-content-center'>
        <Col sm={sm} md={md}>
          {children}
        </Col>
      </Row>
    </Container>
  );
};

export default FormContainer;
