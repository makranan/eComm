import { Link } from 'react-router-dom';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { socialMedia, footerLinks, developer } from '../footer';
import { FormContainer } from '../components';
import logo from '../assets/logo.svg';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className='bg-primary mt-4' bg='dark' variant='dark'>
      <Container fluid>
        <FormContainer sm={12} md={8}>
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
            <Col lg={6} sm={8} xs={10} className='text-start my-4'>
              <Form.Control type='email' placeholder='Join our Newsletter!' />
            </Col>
            <Col lg={3} sm={2} xs={3}>
              <Button type='submit' className='btn-light'>
                Submit
              </Button>
            </Col>
          </Row>
          <Row>
            {footerLinks.map((footerLink, index) => (
              <Col sm={6} md={4} key={index}>
                <div className='my-4'>
                  <h4 className='text-white '>{footerLink.title}</h4>
                  <ul className='mt-4 '>
                    {footerLink.links.map((link, linkIndex) => (
                      <li
                        className={`${
                          linkIndex !== footerLink.links.length - 1
                            ? 'mb-4'
                            : 'mb-0'
                        }`}
                        key={linkIndex}
                      >
                        <Link
                          to={link.link}
                          style={{
                            textTransform: 'uppercase',
                            textDecoration: 'none',
                            color: '#696969',
                          }}
                          className='footerLink footer-social-text '
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

          <Row className='text-center my-6'>
            <Col>
              {developer.map((dev, index) => (
                <div
                  style={{
                    marginTop: '3rem',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  key={index}
                >
                  <span style={{ color: 'white' }}>Contact developer</span>
                  <a
                    href={dev.link}
                    target='_blank'
                    rel='noopener noreferrer'
                    className={`uppercase, footer-social-text`}
                    style={{ fontSize: '1.5rem' }}
                  >
                    {dev.name}
                  </a>
                </div>
              ))}
            </Col>
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
