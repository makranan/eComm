import { useNavigate, Link } from 'react-router-dom';
import { FaChevronLeft } from 'react-icons/fa';

const BtnGoBack = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <button
      className='d-flex align-items-center btn-light btn my-3'
      onClick={handleGoBack}
    >
      <FaChevronLeft /> &nbsp;Go Back
    </button>
  );
};

export default BtnGoBack;
