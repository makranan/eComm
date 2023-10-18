import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useGetProductsQuery } from '../slices/productsApiSlice';
import { Button, Offcanvas, Form, Badge } from 'react-bootstrap';
import { ProductFilter } from '../components';

function FilterMenu({ name, ...props }) {
  const [show, setShow] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  // const [selectedBrand, setSelectedBrand] = useState('');
  // const { keyword, category, brand, pageNumber } = useParams();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // if (isLoading) {
  //   // Loading state
  // } else if (error) {
  //   // Error state
  //   console.error('Error fetching products:', error);
  // } else if (data) {
  //   // Data fetched successfully
  //   console.log('Fetched products data:', data);
  // }

  // const handleFilter = (selectedCategory, selectedBrand) => {
  //   // Update state or make an API request to filter products
  //   // For example, update state to store the selected filters
  //   // console.log('Selected Category:', selectedCategory);
  //   // console.log('Selected Brand:', selectedBrand);
  //   // setSelectedCategory(selectedCategory);
  //   // setSelectedBrand(selectedBrand);
  //   handleClose();
  // };

  return (
    <>
      {/* <Button variant='info' onClick={handleShow} className='filter-btn me-2'>
        <FaFilter />
      </Button> */}
      <Offcanvas
        show={show}
        onHide={handleClose}
        {...props}
        style={{ opacity: '1', background: '' }}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Filter Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <ProductFilter onFilter={handleClose} />
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default FilterMenu;
