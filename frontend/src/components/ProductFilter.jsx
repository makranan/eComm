import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css'; // Import the CSS for styling

// Define your hierarchical categories
const categories = [
  {
    name: 'Electronics',
    subcategories: [
      { name: 'PC', subcategories: [] },
      { name: 'Monitor', subcategories: [] },
      { name: 'Drone', subcategories: [] },
      { name: 'test', subcategories: [] },
    ],
  },
  {
    name: 'Category 2',
    subcategories: [
      { name: 'Subcategory 2.1', subcategories: [] },
      { name: 'Subcategory 2.2', subcategories: [] },
    ],
  },
  // Add more categories and subcategories as needed
];

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
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const [selectedCategories, setSelectedCategories] = useState(
    categoryUrl ? categoryUrl.split('&') : []
  );

  // Update selectedCategories based on URL parameters
  useEffect(() => {
    if (categoryUrl) {
      setSelectedCategories(categoryUrl.split('&'));
    }
  }, [categoryUrl]);

  const handleFilter = () => {
    // Call the onFilter function passed from the parent component
    onFilter(selectedCategories, brand);
  };

  const clearFilters = () => {
    setKeyword('');
    setBrand('');
    setSelectedCategories([]);
    // navigate('/');
  };

  const submitHandler = (e) => {
    e.preventDefault();

    // Construct the URL based on the provided values
    let url = '/';

    if (keyword) {
      url = `/search/${keyword}`;
      if (selectedCategories.length > 0) {
        url += `/category/${selectedCategories.join('&')}`;
        if (brand) {
          url += `/brand/${brand}`;
        }
      } else if (brand) {
        url += `/brand/${brand}`;
      }
    } else if (selectedCategories.length > 0) {
      url = `/search/category/${selectedCategories.join('&')}`;
      if (brand) {
        url += `/brand/${brand}`;
      }
    } else if (brand) {
      url = `/search/brand/${brand}`;
    }

    // Add price parameters to the URL
    if (minPrice && maxPrice) {
      url = `/search/price/${minPrice}-${maxPrice}`;
    } else if (minPrice) {
      url = `/search/price/${minPrice}-`;
    } else if (maxPrice) {
      url = `/search/price/-${maxPrice}`;
    }

    // Navigate to the constructed URL
    navigate(url);
  };

  const handleCategoryClick = (clickedCategory) => {
    // Toggle the selected category
    if (selectedCategories.includes(clickedCategory)) {
      setSelectedCategories(
        selectedCategories.filter((category) => category !== clickedCategory)
      );
    } else {
      setSelectedCategories([...selectedCategories, clickedCategory]);
    }
  };

  const handleMinPriceChange = (value) => {
    setMinPrice(value);
  };

  const handleMaxPriceChange = (value) => {
    setMaxPrice(value);
  };

  const renderCategories = (categories) => {
    return categories.map((category) => (
      <div key={category.name}>
        <Form.Check
          type='checkbox'
          id={category.name}
          label={category.name}
          checked={selectedCategories.includes(category.name)}
          onChange={() => handleCategoryClick(category.name)}
        />
        {category.subcategories.length > 0 && (
          <div className='ml-3'>{renderCategories(category.subcategories)}</div>
        )}
      </div>
    ));
  };

  return (
    <div>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='keyword'>
          <Form.Label>Search</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter keyword'
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId='category'>
          <Form.Label className='mt-2'>Category</Form.Label>
          <div>{renderCategories(categories)}</div>
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

        <Form.Group controlId='price'>
          <Form.Label className='mt-2'>Price Range</Form.Label>
          <Slider
            min={0}
            max={3000} // You can adjust this based on your price range
            step={10} // Adjust the step value as needed
            value={[minPrice, maxPrice]}
            onChange={(value) => {
              handleMinPriceChange(value[0]);
              handleMaxPriceChange(value[1]);
            }}
            range
          />
          <div className='d-flex align-items-center gap-2 mt-2'>
            <input
              type='text'
              className='ml-2 form-control'
              placeholder='Min Price'
              value={minPrice}
              onChange={(e) => handleMinPriceChange(e.target.value)}
            />

            <input
              type='text'
              className='ml-2 form-control'
              placeholder='Max Price'
              value={maxPrice}
              onChange={(e) => handleMaxPriceChange(e.target.value)}
            />
          </div>
        </Form.Group>

        <Button
          className='mt-3'
          type='submit'
          variant='primary'
          onClick={handleFilter}
        >
          Apply Filters
        </Button>

        <Button
          className='mt-3 ml-3'
          type='button'
          variant='secondary'
          onClick={clearFilters}
        >
          Clear Filters
        </Button>
      </Form>
    </div>
  );
};

export default ProductFilter;
