import { Navbar, Nav, Container } from 'react-bootstrap';
import { FaShoppingCart, FaUser } from 'react-icons/fa';

import './header.css';

const Header = () => (
  <header>
    <Navbar bg='dark' variant='dark' expand='md' collapseOnSelect>
      <Container>
        <Navbar.Brand href='/'>eComm</Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-bav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='ms-auto'>
            <Nav.Link href='/cart'>
              <FaShoppingCart /> &nbsp; Cart
            </Nav.Link>
            <Nav.Link href='/login'>
              <FaUser /> &nbsp; Login
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  </header>
);

export default Header;
