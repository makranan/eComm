import { Row, Col, Card } from 'react-bootstrap';
import { FormContainer } from '../components';

const FeaturesScreen = () => {
  return (
    <>
      <h1>Features</h1>
      <Row>
        <Col xs={12}>
          <Card className='p-4 mb-4'>
            <h2>General Features</h2>
            <p>
              This is a fully functional e-commerce app with a variety of
              features for both customers and admins.
            </p>
            <ul>
              <li>Register email validation</li>
              <li>
                Register and login using Google, Facebook or Apple account
              </li>
              <li>Password recovery</li>
            </ul>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col xs={6}>
          <Card className='p-4'>
            <h2>For Customers</h2>
            <p>
              Customers can browse products, add them to their cart, and
              purchase them using a variety of payment methods.
            </p>
            <ul>
              <li>Search products by keyword, category, or brand</li>
              <li>Filter products by price range</li>
              <li>View product details and reviews</li>
              <li>Rate and review products</li>
              <li>View and update their profile</li>
              <li>View their order history</li>
              <li>View and track their orders</li>
              <li>View and update their profile</li>
            </ul>
          </Card>
        </Col>
        <Col xs={6}>
          <Card className='p-4'>
            <h2>For Admins</h2>
            <p>
              Admins can add and remove products, update product details, and
              view orders.
            </p>
            <ul>
              <li>Add, update, and remove products</li>
              <li>View and update product details</li>
              <li>View and update order details</li>
              <li>View and update user details</li>
            </ul>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default FeaturesScreen;
