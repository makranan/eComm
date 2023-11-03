import React, { useState, useEffect } from 'react';
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
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
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

  useEffect(() => {
    // Add a window resize event listener to update the window width
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    // Attach the event listener
    window.addEventListener('resize', handleResize);

    // Remove the event listener when the component unmounts
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const isSmallScreen = windowWidth <= 400;

  return (
    <>
      <CheckoutStepsCircles />
      <FilterMenu show={show} onHide={handleClose} />
      <header>
        <Navbar
          bg='primary'
          variant='dark'
          expand='md'
          fixed='true'
          style={{ paddingTop: '5px' }}
        >
          <Container className='d-flex'>
            <LinkContainer to='/'>
              <Navbar.Brand>
                <img
                  src={logo}
                  alt='Tech World'
                  style={{ height: isSmallScreen ? '1.5rem' : '2.5rem' }}
                />{' '}
                <strong
                  style={{
                    fontSize: isSmallScreen ? '0.7rem' : '1rem',
                    fontWeight: '600',
                  }}
                >
                  {isSmallScreen ? 'TechWorld' : 'TechWorld'}
                </strong>
              </Navbar.Brand>
            </LinkContainer>

            <div
              className='ms-auto'
              style={{
                display: window.innerWidth < 768 ? 'flex' : 'none',
                marginRight: '1rem',
              }}
            >
              <LinkContainer to='/cart'>
                <Nav.Link className='mb-1'>
                  <FaShoppingCart
                    color='white'
                    style={{ marginRight: '5px' }}
                    size={20}
                  />

                  {/* Cart */}
                  {cartItems.length > 0 && (
                    <Badge className='bg-warning' pill>
                      <span
                        style={{
                          color: 'black',
                          fontWeight: '900',
                          fontSize: '1rem',
                        }}
                      >
                        {cartItems.reduce((a, c) => a + c.qty, 0)}
                      </span>
                    </Badge>
                  )}
                </Nav.Link>
              </LinkContainer>
            </div>

            <Navbar.Toggle aria-controls='basic-navbar-bav' />
            <Navbar.Collapse id='basic-navbar-nav'>
              <div className='ms-auto d-flex justify-content-center'>
                <SearchBox openSearchHandler={filterMenuHandler} />
              </div>

              <Nav className='ms-auto ' navbarScroll>
                <LinkContainer
                  to='/cart'
                  style={{
                    display: window.innerWidth < 768 ? 'none' : 'flex',
                  }}
                >
                  <Nav.Link className='mb-1'>
                    <FaShoppingCart style={{ marginRight: '5px' }} />
                    {/* {isSmallScreen ? '' : 'Cart'} */}
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
