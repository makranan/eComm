import { Container } from 'react-bootstrap';
import { Outlet, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Header, Footer, HeaderSwiper } from './components';

const App = () => {
  const location = useLocation();
  const isHomeScreen = location.pathname === '/';

  return (
    <>
      <Header />
      <main className='py-3'>
        <Container>
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
