import { Row, Col, Card } from 'react-bootstrap';
import { FormContainer } from '../components';

const FeaturesScreen = () => {
  return (
    <>
      <h1>Features</h1>
      <Row>
        <Col xs={6}>
          <Card className='p-4'>
            <h2>For Customers</h2>
            <p>
              Customers can browse products, add them to their cart, and
              purchase them using a variety of payment methods.
            </p>
          </Card>
        </Col>
        <Col xs={6}>
          <Card className='p-4'>
            <h2>For Admins</h2>
            <p>
              Admins can add and remove products, update product details, and
              view orders.
            </p>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default FeaturesScreen;
