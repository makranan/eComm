import React from 'react';

const dividerStyles = {
  display: 'flex',
  alignItems: 'center',
  borderBottom: '1px solid #b1b1b1',
  position: 'relative',
};

const orStyles = (vertical) => {
  return {
    background: '#fff',
    color: '#b1b1b1',
    fontSize: '12px',
    width: vertical ? 'auto' : '30px', // Adjust width and height properties
    height: vertical ? '30px' : 'auto', // Adjust width and height properties
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    border: '1px solid #b1b1b1',
    borderRadius: '50%',
    fontWeight: 'bold',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: vertical
      ? 'translate(-50%, -50%) rotate(90deg)'
      : 'translate(-50%, -50%) rotate(90deg)', // Adjust transform property
    userSelect: 'none',
  };
};

const Divider = ({ vertical }) => {
  return (
    <div style={dividerStyles}>
      <div style={orStyles(vertical)}>OR</div>
    </div>
  );
};

export default Divider;
