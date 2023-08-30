import { Navbar, Nav, Container } from 'react-bootstrap';
import { FaShoppingCart, FaUser, FaTags } from 'react-icons/fa';
import { LinkContainer } from 'react-router-bootstrap';

import './header.css';

const Header = () => (
  <header>
    <Navbar bg='dark' variant='dark' expand='md' collapseOnSelect>
      <Container>
        <LinkContainer to='/'>
          <Navbar.Brand>
            <FaTags /> eComm
          </Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls='basic-navbar-bav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='ms-auto'>
            <LinkContainer to='/cart'>
              <Nav.Link>
                <FaShoppingCart /> &nbsp; Cart
              </Nav.Link>
            </LinkContainer>
            <LinkContainer to='/login'>
              <Nav.Link>
                <FaUser /> &nbsp; Login
              </Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  </header>
);

export default Header;
