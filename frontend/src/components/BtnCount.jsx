import React, { useState } from 'react';
import { Button } from 'react-bootstrap';

function BtnCount({
  initialValue,
  maxValue,
  onCountChange,
  step,
  increaseIcon,
  decreaseIcon,
  variant,
}) {
  const [count, setCount] = useState(initialValue);

  const handleIncrement = () => {
    if (count + step <= maxValue) {
      setCount(count + step);
      onCountChange(count + step);
    }
  };

  const handleDecrement = () => {
    if (count - step >= 1) {
      setCount(count - step);
      onCountChange(count - step);
    }
  };

  return (
    <div>
      <Button
        type='button'
        onClick={handleDecrement}
        className='btn btn-light btn-sm mx-1'
        variant={variant}
      >
        {decreaseIcon}
      </Button>
      <Button
        type='button'
        onClick={handleIncrement}
        className='btn btn-light btn-sm mx-1'
        variant={variant}
      >
        {increaseIcon}
      </Button>
    </div>
  );
}

export default BtnCount;
