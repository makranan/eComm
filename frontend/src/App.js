import { Container } from 'react-bootstrap';
import { Outlet, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Header, Footer, HeaderSwiper } from './components';

const App = () => {
  const location = useLocation();
  const isHomeScreen = location.pathname === '/';

  return (
    <>
      <Header />
      {/* {isHomeScreen && <HeaderSwiper />} */}
      <main className='py-3'>
        <Container>
          <Outlet />
        </Container>
      </main>
      <Footer />
      <ToastContainer />
    </>
  );
};

export default App;
