const customInputStyle = {
  backgroundColor: '#fff',
  color: '#000',
  padding: '10px',
  border: '1px solid #ccc',
  borderRadius: '5px',
  width: 'auto',
  maxWidth: 'calc(50% - 5px)',
  textAlign: 'center',
};

function StyledNumberInput({ value, onChange, min, max }) {
  const handleInputChange = (event) => {
    let newValue = parseInt(event.target.value, 10);
    if (isNaN(newValue)) {
      newValue = min || 0; // Default to min value if input is not a number
    }
    onChange(newValue); // Update the state directly
  };

  const handleBlur = () => {
    // Ensure the value is within the specified range when the input loses focus
    let newValue = parseInt(value, 10);
    newValue = Math.min(Math.max(newValue, min || 0), max || Infinity);
    onChange(newValue); // Update the state directly
  };

  return (
    <input
      type='text'
      style={customInputStyle}
      value={value}
      onChange={handleInputChange}
      onBlur={handleBlur}
      min={min || undefined}
      max={max || undefined}
    />
  );
}

export default StyledNumberInput;
