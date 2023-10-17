import React, { useState, useEffect, useContext } from 'react';
import {
  Form,
  Button,
  Accordion,
  AccordionContext,
  useAccordionButton,
  Card,
} from 'react-bootstrap';
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
  const [price, setPrice] = useState([minPrice, maxPrice]);

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
    onFilter(selectedCategories, brand, maxPrice, minPrice, keyword, price);
  };

  const clearFilters = () => {
    setKeyword('');
    setBrand('');
    setSelectedCategories([]);
    setMinPrice('');
    setMaxPrice('');
    navigate('/');
  };

  const submitHandler = (e) => {
    e.preventDefault();

    // console.log('Min Price:', minPrice);
    // console.log('Max Price:', maxPrice);

    // Construct the URL based on the provided values
    let url = '/search';

    if (keyword) {
      url += `/${keyword}`;
    }

    // Check if any category is selected
    if (selectedCategories.length > 0) {
      url += `/category/${selectedCategories.join('&')}`;
    }

    if (brand) {
      url += `/brand/${brand}`;
    }

    // Add price parameters to the URL
    if (minPrice && maxPrice) {
      url += `/price/${minPrice}-${maxPrice}`;
    } else if (minPrice) {
      url += `/price/${minPrice}-`;
    } else if (maxPrice) {
      url += `/price/-${maxPrice}`;
    }

    // Navigate to the constructed URL
    navigate(url);

    // // Construct the URL based on the provided values
    // let url = '/';

    // if (keyword) {
    //   url = `/search/${keyword}`;
    //   if (selectedCategories.length > 0) {
    //     url += `/category/${selectedCategories.join('&')}`;
    //     if (brand) {
    //       url += `/brand/${brand}`;
    //     }
    //   } else if (brand) {
    //     url += `/brand/${brand}`;
    //   }
    // } else if (selectedCategories.length > 0) {
    //   url = `/search/category/${selectedCategories.join('&')}`;
    //   if (brand) {
    //     url += `/brand/${brand}`;
    //   }
    // } else if (brand) {
    //   url = `/search/brand/${brand}`;
    // }

    // // Add price parameters to the URL
    // if (minPrice && maxPrice) {
    //   url = `/search/price/${minPrice}-${maxPrice}`;
    // } else if (minPrice) {
    //   url = `/search/price/${minPrice}-`;
    // } else if (maxPrice) {
    //   url = `/search/price/-${maxPrice}`;
    // }

    // // Navigate to the constructed URL
    // navigate(url);
  };

  const handleMinPriceChange = (value) => {
    setMinPrice(value);
  };

  const handleMaxPriceChange = (value) => {
    setMaxPrice(value);
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

  const renderSubcategories = (subcategories, parentCategory) => {
    if (!subcategories) {
      return null; // Handle the case where subcategories is undefined
    }

    return subcategories.map((subcategory) => (
      <Accordion.Item key={subcategory.name} eventKey={subcategory.name}>
        <Accordion.Header as='h6'>{subcategory.name}</Accordion.Header>
        <Accordion.Body>
          {parentCategory && (
            <Form.Check
              type='checkbox'
              label={subcategory.name}
              checked={selectedCategories.includes(subcategory.name)}
              onChange={() => handleCategoryClick(subcategory.name)}
            />
          )}
          {renderSubcategories(subcategory.subcategories)}
        </Accordion.Body>
      </Accordion.Item>
    ));
  };

  const renderCategories = (categories) => {
    return categories.map((category) => (
      <Accordion.Item key={category.name} eventKey={category.name}>
        <Accordion.Header as='h6'>{category.name}</Accordion.Header>
        <Accordion.Body>
          {category.subcategories.length > 0
            ? renderSubcategories(category.subcategories, category.name)
            : null}
        </Accordion.Body>
      </Accordion.Item>
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

        <Form.Label>Category</Form.Label>
        {/* <Accordion defaultActiveKey='0'>
          <Card>
            <Card.Header>
              <ContextAwareToggle eventKey='0'>
                {categories[0].name}
              </ContextAwareToggle>
            </Card.Header>
            <Accordion.Collapse eventKey='0'>
              <Card.Body></Card.Body>
            </Accordion.Collapse>
          </Card>
          <Card>
            <Card.Header>
              <ContextAwareToggle eventKey='1'>Click me!</ContextAwareToggle>
            </Card.Header>
            <Accordion.Collapse eventKey='1'>
              <Card.Body>Hello! I am another body</Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion> */}

        <Accordion defaultActiveKey='0' alwaysOpen>
          {renderCategories(categories)}
        </Accordion>

        {/* WORKING CATEGORIES FILTER */}

        {/* <Form.Group controlId='category'>
          <Form.Label className='mt-2'>Category</Form.Label>
          <div>{renderCategories(categories)}</div>
        </Form.Group> */}

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
