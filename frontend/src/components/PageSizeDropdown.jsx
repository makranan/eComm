import React from 'react';

const PageSizeDropdown = ({ pageSize, setPageSize }) => {
  const handlePageSizeChange = (event) => {
    const newSize = event.target.value;
    setPageSize(newSize);
  };

  return (
    <div className='page-size-dropdown mx-4'>
      <label htmlFor='pageSize' style={{ marginTop: '10px' }}>
        <h6>Items per page:</h6>
      </label>
      <select id='pageSize' value={pageSize} onChange={handlePageSizeChange}>
        <option value='1'>1</option>
        <option value='2'>2</option>
        <option value='24'>24</option>
        <option value='32' default>
          32
        </option>
        <option value='56'>56</option>
        <option value='80'>80</option>
      </select>
    </div>
  );
};

export default PageSizeDropdown;
