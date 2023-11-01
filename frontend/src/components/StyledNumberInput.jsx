import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { FaPlus, FaMinus } from 'react-icons/fa';

// const customInputStyle = {
//   backgroundColor: '#fff',
//   color: '#000',
//   padding: window.innerWidth >= 400 ? '10px' : '0px',
//   border: '1px solid #ccc',
//   borderRadius: '5px',
//   width: 'auto',
//   textAlign: 'center',
//   position: 'relative',
//   display: 'flex',
//   alignItems: 'center',
// };

const inputStyle = {
  flex: 1,
  color: '#000',
  border: 'none',
  textAlign: 'center',
  outline: 'none',
  background: 'none',
  width: '40px',
};

const buttonStyle = {
  border: 'none',
  backgroundColor: 'transparent',
  cursor: 'pointer',
  color: '#979797',
};

function StyledNumberInput({ value, onChange, min, max }) {
  const [inputValue, setInputValue] = useState(value.toString());
  const [padding, setPadding] = useState(
    window.innerWidth >= 400 ? '10px' : '0px'
  );

  const handleInputChange = (event) => {
    const newValue = event.target.value;
    setInputValue(newValue);
  };

  const handleInputBlur = () => {
    // Parse the input value as an integer
    let newValue = parseInt(inputValue, 10);

    // Validate the value and restrict it to be within the min and max range
    newValue = isNaN(newValue) ? min : Math.min(Math.max(newValue, min), max);

    // Update the input value
    setInputValue(newValue.toString());

    // Call the onChange function with the validated value
    onChange(newValue);
  };

  const incrementValue = () => {
    let newValue = value + 1;
    newValue = Math.min(newValue, max);
    setInputValue(newValue.toString());
    onChange(newValue);
  };

  const decrementValue = () => {
    let newValue = value - 1;
    newValue = Math.max(newValue, min);
    setInputValue(newValue.toString());
    onChange(newValue);
  };

  useEffect(() => {
    const handleResize = () => {
      setPadding(window.innerWidth >= 400 ? '10px' : '0px');
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div
      style={{
        backgroundColor: '#fff',
        padding,
        border: '1px solid #ccc',
        borderRadius: '5px',
        width: 'auto',
        textAlign: 'center',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        minWidth: '130px',
      }}
    >
      <Button
        type='button'
        onClick={decrementValue}
        style={buttonStyle}
        size='sm'
        disabled={value <= min}
      >
        <FaMinus />
      </Button>
      <input
        type='text'
        style={inputStyle}
        value={inputValue}
        onChange={handleInputChange}
        onBlur={handleInputBlur}
        min={min}
        max={max}
      />
      <Button
        type='button'
        onClick={incrementValue}
        style={buttonStyle}
        size='sm'
        disabled={value >= max}
      >
        <FaPlus />
      </Button>
    </div>
  );
}

export default StyledNumberInput;
