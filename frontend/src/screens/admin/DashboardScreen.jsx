import React from 'react';
import { Nav, Col, Row, Tab } from 'react-bootstrap';
import { ProductListScreen, OrderListScreen, UserListScreen } from './';

const DashboardScreen = () => {
  return (
    <div className='container-dashboard'>
      <Tab.Container id='left-tabs-example' defaultActiveKey='first'>
        <Row>
          <Col sm={2} style={{ padding: '0' }}>
            <Nav variant='pills' className='flex-column' fill>
              <Nav.Item>
                <Nav.Link eventKey='first'>Products</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey='second'>Orders</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey='third'>Users</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey='fourth'>Tab 2</Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>

          <Col sm={10}>
            <Tab.Content>
              <Tab.Pane eventKey='first'>
                <ProductListScreen />
              </Tab.Pane>
              <Tab.Pane eventKey='second'>
                <OrderListScreen />
              </Tab.Pane>
              <Tab.Pane eventKey='third'>
                <UserListScreen />
              </Tab.Pane>
              <Tab.Pane eventKey='fourth'></Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </div>
  );
};

export default DashboardScreen;
