import { Link } from 'react-router-dom';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { socialMedia, footerLinks } from '../footer';
import { FormContainer } from '../components';
import logo from '../assets/logo.svg';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className='bg-primary mt-4' bg='dark' variant='dark'>
      <Container fluid>
        <FormContainer>
          <Row className='d-flex align-items-center'>
            <Col lg={3} xs={5} className='my-4 mx-0'>
              <img src={logo} alt='Tech World' style={{ height: '40px' }} />{' '}
              <strong
                style={{
                  fontSize: '1rem',
                  textTransform: 'uppercase',
                  fontWeight: '600',
                  color: '#ffffff',
                  cursor: 'default',
                }}
              >
                TechWorld
              </strong>
            </Col>
            <Col lg={6} sm={8} xs={9} className='text-start my-4'>
              <Form.Control type='email' placeholder='Join our Newsletter!' />
            </Col>
            <Col lg={3} sm={2} xs={3}>
              <Button type='submit' className='btn-light'>
                Submit
              </Button>
            </Col>
          </Row>
          <Row>
            {footerLinks.map((footerLinkGroup, index) => (
              <Col md={4} key={index}>
                <div className='my-4'>
                  <h4 className='text-white '>{footerLinkGroup.title}</h4>
                  <ul className='mt-4 '>
                    {footerLinkGroup.links.map((link, linkIndex) => (
                      <li
                        key={linkIndex}
                        className={`${
                          linkIndex !== footerLinkGroup.links.length - 1
                            ? 'mb-4'
                            : 'mb-0'
                        }`}
                      >
                        <Link
                          to={link.link}
                          style={{
                            textTransform: 'uppercase',
                            textDecoration: 'none',
                          }}
                          className='footer-social-text'
                        >
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </Col>
            ))}
          </Row>
          <Row className='text-center my-4'>
            {socialMedia.map((social, index) => (
              <Col key={index}>
                <a
                  href={social.link}
                  target='_blank'
                  rel='noopener noreferrer'
                  className={`mx-4 footer-social-icon`}
                  style={{ fontSize: '2rem' }}
                >
                  {social.icon}
                </a>
              </Col>
            ))}
          </Row>
          <Row className='my-5 '>
            <Col className='text-center py-3'>
              <p>TechWorld &copy; {currentYear}</p>
            </Col>
          </Row>
        </FormContainer>
      </Container>
    </footer>
  );
};

export default Footer;
