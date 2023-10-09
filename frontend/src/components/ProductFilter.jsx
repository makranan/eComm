import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';

const ProductFilter = ({ onFilter }) => {
  const navigate = useNavigate();
  const {
    keyword: keywordUrl,
    category: categoryUrl,
    brand: brandUrl,
    pageNumber,
  } = useParams();

  const [keyword, setKeyword] = useState(keywordUrl || '');
  const [brand, setBrand] = useState(brandUrl || '');
  const [category, setCategory] = useState(categoryUrl || '');

  const handleFilter = () => {
    // Call the onFilter function passed from the parent component
    onFilter(category, brand);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    // Construct the URL based on the provided values
    let url = '/';

    if (keyword) {
      url = `/search/${keyword}`;
      if (category) {
        url += `/category/${category}`;
        if (brand) {
          url += `/brand/${brand}`;
        }
      } else if (brand) {
        url += `/brand/${brand}`;
      }
    } else if (category) {
      url = `/search/category/${category}`;
      if (brand) {
        url += `/brand/${brand}`;
      }
    } else if (brand) {
      url = `/search/brand/${brand}`;
    }

    // Navigate to the constructed URL
    navigate(url);
  };

  return (
    <div>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='keyword'>
          <Form.Label>Keyword</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter keyword'
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId='category'>
          <Form.Label className='mt-2'>Category</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter category'
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId='brand'>
          <Form.Label className='mt-2'>Brand</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter brand'
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
          />
        </Form.Group>

        <Button
          className='mt-3'
          type='submit'
          variant='primary'
          onClick={handleFilter}
        >
          Apply Filters
        </Button>
      </Form>
    </div>
  );
};

export default ProductFilter;
