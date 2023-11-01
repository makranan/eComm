import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaChevronLeft } from 'react-icons/fa';

const BtnGoBack = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    const onBeforeUnload = () => {
      sessionStorage.setItem('scrollPosition', window.scrollY.toString());
    };

    window.addEventListener('beforeunload', onBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', onBeforeUnload);
    };
  }, []);

  return (
    <button
      className='d-flex align-items-center btn-light btn my-3'
      onClick={handleGoBack}
      style={{ border: '1px solid #eaeaea' }}
    >
      <FaChevronLeft /> &nbsp;Go Back
    </button>
  );
};

export default BtnGoBack;
