import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className='bg-primary ' bg='dark' variant='dark'>
      <Container fluid>
        <Row>
          <Col className='text-center py-3 text-white'>
            <p>eComm &copy; {currentYear}</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
