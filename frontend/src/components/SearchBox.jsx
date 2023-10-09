import { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';

const SearchBox = () => {
  const navigate = useNavigate();
  const { keyword: urlKeyword } = useParams();

  const [keyword, setKeyword] = useState(urlKeyword || '');
  // eslint-disable-next-line no-unused-vars
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [formControlClass, setFormControlClass] = useState('');

  useEffect(() => {
    const handleResize = () => {
      const newWindowWidth = window.innerWidth;
      setWindowWidth(newWindowWidth);

      // Set the class based on the window width
      if (newWindowWidth < 768) {
        setFormControlClass('my-4');
      } else {
        setFormControlClass('');
      }
    };

    // Initial setup
    handleResize();

    // Add an event listener to update windowWidth when the window size changes
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();

    if (keyword.trim()) {
      setKeyword('');
      navigate(`/search/${keyword}`);
    } else {
      navigate('/');
    }
  };

  return (
    <Form onSubmit={submitHandler} className={`d-flex ${formControlClass}`}>
      <Form.Control
        type='text'
        name='keyword'
        onChange={(e) => setKeyword(e.target.value)}
        value={keyword}
        placeholder='Search...'
        className='mr-sm-2 ml-sm-5'
      ></Form.Control>
      <Button type='submit' className='p-2 mx-2'>
        <FaSearch style={{ fontSize: '1rem' }} />
      </Button>
    </Form>
  );
};

export default SearchBox;
