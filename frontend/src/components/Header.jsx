import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Badge, Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { useLogoutMutation } from '../slices/usersApiSlice';
import { logout } from '../slices/authSlice';
import { LinkContainer } from 'react-router-bootstrap';
import { CheckoutStepsCircles, SearchBox, FilterMenu } from '.';
import logo from '../assets/logo.svg';

const Header = () => {
  const [show, setShow] = useState(false);
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);

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

  const filterMenuHandler = (e) => {
    setShow(true);
  };

  const handleClose = (e) => {
    setShow(false);
  };

  const customDropdownStyle = {
    transform: 'translateX(-20%)', // Shift 20% to the left
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
      <FilterMenu show={show} onHide={handleClose} />
      <header>
        <Navbar bg='primary' variant='dark' expand='md' collapseOnSelect>
          <Container>
            <LinkContainer to='/'>
              <Navbar.Brand>
                <img src={logo} alt='Tech World' style={{ height: '2.5rem' }} />{' '}
                <strong style={{ fontSize: '1rem', fontWeight: '600' }}>
                  TechWorld
                </strong>
              </Navbar.Brand>
            </LinkContainer>
            <Navbar.Toggle aria-controls='basic-navbar-bav' />
            <Navbar.Collapse id='basic-navbar-nav'>
              <div className='ms-auto'>
                <SearchBox openSearchHandler={filterMenuHandler} />
              </div>
              <Nav className='ms-auto ' navbarScroll>
                <LinkContainer to='/cart'>
                  <Nav.Link className='mb-1'>
                    <FaShoppingCart style={{ marginRight: '5px' }} />
                    Cart
                    {cartItems.length > 0 && (
                      <Badge className='bg-warning' pill>
                        <span style={{ color: 'black', fontWeight: '900' }}>
                          {cartItems.reduce((a, c) => a + c.qty, 0)}
                        </span>
                      </Badge>
                    )}
                  </Nav.Link>
                </LinkContainer>
                {userInfo ? (
                  <NavDropdown
                    title={userInfo.name}
                    id='username'
                    drop='down-centered'
                  >
                    <LinkContainer to='/profile'>
                      <NavDropdown.Item>Profile</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Item onClick={logoutHandler}>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                ) : (
                  <LinkContainer to='/login'>
                    <Nav.Link>
                      <FaUser /> &nbsp; Sign In
                    </Nav.Link>
                  </LinkContainer>
                )}
                {userInfo && userInfo.isAdmin && (
                  <NavDropdown title='Admin' id='adminmenu' drop='start'>
                    <LinkContainer to='/admin/'>
                      <NavDropdown.Item>Dashboard</NavDropdown.Item>
                    </LinkContainer>
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
