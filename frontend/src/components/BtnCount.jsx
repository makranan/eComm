import React, { useState } from 'react';

function BtnCount({
  initialValue,
  maxValue,
  onCountChange,
  step,
  increaseIcon,
  decreaseIcon,
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
      <button
        type='button'
        onClick={handleDecrement}
        className='btn btn-light btn-sm'
      >
        {decreaseIcon}
      </button>
      <button
        type='button'
        onClick={handleIncrement}
        className='btn btn-light btn-sm'
      >
        {increaseIcon}
      </button>
    </div>
  );
}

export default BtnCount;
