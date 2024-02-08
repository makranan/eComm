import { useState } from 'react';
import { Container } from 'react-bootstrap';
import { Outlet, useLocation, Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import {
  Header,
  Footer,
  HeaderSwiper,
  Message,
  TopProductsCarousel,
} from './components';

const App = () => {
  const location = useLocation();
  const isHomeScreen = location.pathname === '/';
  const [isMessageVisible, setMessageVisible] = useState(true);

  const closeMessage = () => {
    setMessageVisible(false);
  };

  return (
    <>
      <Header />

      {/* {isHomeScreen && <HeaderSwiper />} */}

      <main className='py-3'>
        <Container>
          {isMessageVisible && (
            <Message className='text-center' variant='warning'>
              {/* Payment sections are running in sandbox mode. Please use the
                following test credit card for payments:
                <br />
                <strong>4242 4242 4242 4242</strong>
                <br />
                <strong>
                  <span className='unselectable'>Exp: </span>01/22
                </strong>
                <br />
                <strong>
                  <span className='unselectable'>CVV: </span>123
                </strong> */}
              Experience the power of e-commerce with our fully customizable
              demo app, available for purchase! Showcase your products,
              streamline transactions, and provide a seamless shopping
              experience to your customers. Elevate your online presence with
              our user-friendly solution. Interested? Get in touch or click{' '}
              <Link to='/appfeatures'>HERE</Link> to learn more!
              <br /> For admin credentials, contact me at: <br />
              <strong>
                <a href='mailto:krasowskinan@gmail.com?subject=TechWorld Admin Credentials'>
                  krasowskinan@gmail.com
                </a>{' '}
              </strong>
              <button
                onClick={closeMessage}
                style={{
                  position: 'absolute',
                  top: '5px',
                  right: '5px',
                  borderRadius: '5px',
                  border: 'none',
                  padding: '0 5px 0 5px',
                  background: 'none',
                  color: 'black',
                }}
              >
                &times;
              </button>
            </Message>
          )}

          {isHomeScreen && <TopProductsCarousel />}

          <Outlet />
        </Container>
      </main>

      {/* <Footer /> */}
      <ToastContainer theme='colored' />
    </>
  );
};

export default App;
