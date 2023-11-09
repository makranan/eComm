import { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { FaSearch, FaSlidersH } from 'react-icons/fa';

const SearchBox = ({ openSearchHandler, style }) => {
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
    <div
      style={{
        width: 'auto',
        height: '100%',
        position: 'relative',
        margin: '0',
        ...style,
      }}
    >
      <Form onSubmit={submitHandler} className={`d-flex align-items-center`}>
        <div className='input-group'>
          <Button
            type='button'
            variant='outline-secondary'
            // className='p-2'
            onClick={openSearchHandler}
            style={{
              // transform: 'translate(-55px, 4px)',
              // background: 'red',
              border: 'none',
              zIndex: '100',
            }}
          >
            <FaSlidersH style={{ fontSize: '1rem' }} />
          </Button>

          <Form.Control
            type='text'
            name='keyword'
            onChange={(e) => setKeyword(e.target.value)}
            value={keyword}
            placeholder='Search...'
            // className='mr-sm-2 ml-sm-5'
          />

          <Button
            type='submit'
            variant='outline-secondary'
            // className='p-2 mx-2'
            style={{
              // position: 'absolute',
              // right: '-20px', // Adjust this value as needed
              border: 'none',
              zIndex: '100',
              // boxShadow: '-10px 0px 10px rgba(0, 0, 0, 0.3)',
            }}
          >
            <FaSearch style={{ fontSize: '1rem' }} />
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default SearchBox;
