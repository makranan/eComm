import { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { Outlet, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Header, Footer, HeaderSwiper, Message } from './components';

const App = () => {
  const location = useLocation();
  const isHomeScreen = location.pathname === '/';
  const [isMessageVisible, setMessageVisible] = useState(true);
  const [isHeaderVisible, setHeaderVisible] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(window.pageYOffset);

  const closeMessage = () => {
    setMessageVisible(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;

      if (prevScrollPos > currentScrollPos) {
        // Scrolling up, show the header
        setHeaderVisible(true);
      } else {
        // Scrolling down, hide the header
        setHeaderVisible(false);
      }

      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [prevScrollPos]);

  return (
    <>
      <div
        className={`header-wrapper ${
          isHeaderVisible ? 'visible-header' : 'hidden-header'
        }`}
      >
        <Header />
      </div>
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

          {/* {isHomeScreen && <HeaderSwiper />} */}
          <Outlet />
        </Container>
      </main>
      <Footer />
      <ToastContainer />
    </>
  );
};

export default App;
