import { useState } from 'react';
import { Container } from 'react-bootstrap';
import { Outlet, useLocation } from 'react-router-dom';
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
              This store is for preview purpose only. Payment sections are
              running in test (sandbox) mode.
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
      <Footer />
      <ToastContainer theme='colored' />
    </>
  );
};

export default App;
