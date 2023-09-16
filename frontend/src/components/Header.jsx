import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Badge, Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { FaShoppingCart, FaUser, FaTags } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { useLogoutMutation } from '../slices/usersApiSlice';
import { logout } from '../slices/authSlice';
import { LinkContainer } from 'react-router-bootstrap';
import { CheckoutStepsCircles } from '.';
import logo from '../assets/logo.svg';

const Header = () => {
  const { cartItems } = useSelector(state => state.cart);
  const { userInfo } = useSelector(state => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate('/login');
    } catch (err) {
      console.log(err);
    }
  };

  // Conditionally render CheckoutStepsCircles based on the current route
  // const location = useLocation();
  // const showCheckoutSteps = [
  //   '/cart',
  //   '/shipping',
  //   '/payment',
  //   '/placeorder',
  // ].includes(location.pathname);

  return (
    <>
      <CheckoutStepsCircles />
      <header>
        <Navbar bg='primary' variant='dark' expand='md' collapseOnSelect>
          <Container>
            <LinkContainer to='/'>
              <Navbar.Brand>
                <img
                  src={logo}
                  alt='Electro Empire'
                  style={{ height: '40px' }}
                />{' '}
                <strong style={{ fontSize: '1rem' }}>TechWorld</strong>
              </Navbar.Brand>
            </LinkContainer>
            <Navbar.Toggle aria-controls='basic-navbar-bav' />
            <Navbar.Collapse id='basic-navbar-nav'>
              <Nav className='ms-auto'>
                <LinkContainer to='/cart'>
                  <Nav.Link>
                    <FaShoppingCart /> &nbsp; Cart&nbsp;
                    {cartItems.length > 0 && (
                      <Badge className='bg-warning' pill>
                        {cartItems.reduce((a, c) => a + c.qty, 0)}
                      </Badge>
                    )}
                  </Nav.Link>
                </LinkContainer>
                {userInfo ? (
                  <div>
                    <NavDropdown title={userInfo.name} id='username'>
                      <LinkContainer to='/profile'>
                        <NavDropdown.Item>Profile</NavDropdown.Item>
                      </LinkContainer>
                      <NavDropdown.Item onClick={logoutHandler}>
                        Logout
                      </NavDropdown.Item>
                    </NavDropdown>
                  </div>
                ) : (
                  <LinkContainer to='/login'>
                    <Nav.Link>
                      <FaUser /> &nbsp; Sign In
                    </Nav.Link>
                  </LinkContainer>
                )}

                {userInfo && userInfo.isAdmin && (
                  <NavDropdown title='Admin' id='adminmenu'>
                    <LinkContainer to='/admin/productlist'>
                      <NavDropdown.Item>Products</NavDropdown.Item>
                    </LinkContainer>

                    <LinkContainer to='/admin/orderlist'>
                      <NavDropdown.Item>Orders</NavDropdown.Item>
                    </LinkContainer>

                    <LinkContainer to='/admin/userlist'>
                      <NavDropdown.Item>Users</NavDropdown.Item>
                    </LinkContainer>
                  </NavDropdown>
                )}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>
    </>
  );
};

export default Header;
