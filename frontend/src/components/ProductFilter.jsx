import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import Collapsible from 'react-collapsible';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css'; // Import the CSS for styling

// Define your hierarchical categories
const categories = [
  {
    name: 'Electronics',
    collapsible: true, // Make 'Electronics' collapsible
    subcategories: [
      {
        name: 'PC',
        collapsible: true, // Make 'PC' collapsible
        subcategories: [
          {
            name: 'Hard Drives',
            // selectable: true, // Make 'Hard Drives' selectable as a checkbox
            collapsible: true,
            subcategories: [
              {
                name: 'HDD',
                selectable: true, // Make 'HDD' selectable as a checkbox
              },
              {
                name: 'SSD',
                selectable: true, // Make 'SSD' selectable as a checkbox
                subcategories: [],
              },
            ],
          },
        ],
      },
      {
        name: 'Monitor',
        selectable: true, // Make 'Monitor' selectable as a checkbox
        subcategories: [],
      },
      {
        name: 'Drone',
        selectable: true, // Make 'Drone' selectable as a checkbox
        subcategories: [],
      },
      {
        name: 'test',
        selectable: true, // Make 'test' selectable as a checkbox
        subcategories: [],
      },
    ],
  },
  {
    name: 'Category 2',
    collapsible: true, // Make 'Category 2' collapsible
    subcategories: [
      {
        name: 'Subcategory 2.1',
        collapsible: true, // Make 'Subcategory 2.1' collapsible
        subcategories: [],
      },
      {
        name: 'Subcategory 2.2',
        collapsible: true, // Make 'Subcategory 2.2' collapsible
        subcategories: [],
      },
    ],
  },
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
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedSubcategories, setSelectedSubcategories] = useState([]);

  // Update selectedCategories based on URL parameters
  useEffect(() => {
    if (categoryUrl) {
      const categoryParams = categoryUrl.split('&');
      const updatedSelectedCategories = categoryParams.filter((param) => {
        return categories.some((category) => category.name === param);
      });
      setSelectedCategories(updatedSelectedCategories);

      const updatedSelectedSubcategories = categoryParams.filter((param) => {
        return categories.some((category) => {
          return category.subcategories.some(
            (subcategory) => subcategory.name === param
          );
        });
      });
      setSelectedSubcategories(updatedSelectedSubcategories);
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

  const handleSubcategoryClick = (clickedSubcategory) => {
    // Toggle the selected subcategory
    if (selectedSubcategories.includes(clickedSubcategory)) {
      setSelectedSubcategories(
        selectedSubcategories.filter(
          (subcategory) => subcategory !== clickedSubcategory
        )
      );
    } else {
      setSelectedSubcategories([...selectedSubcategories, clickedSubcategory]);
    }
  };

  const handleMinPriceChange = (value) => {
    setMinPrice(value);
  };

  const handleMaxPriceChange = (value) => {
    setMaxPrice(value);
  };

  const renderSubcategories = (subcategories, depth) => {
    if (depth >= 5) {
      return null; // Stop rendering if depth exceeds 5
    }

    if (!subcategories || subcategories.length === 0) {
      return null; // No subcategories to render
    }

    return subcategories.map((subcategory) => {
      if (subcategory.selectable) {
        const isSelected = selectedSubcategories.includes(subcategory.name);
        return (
          <div key={subcategory.name}>
            <Form.Check
              type='checkbox'
              id={subcategory.name}
              label={subcategory.name}
              checked={isSelected}
              onChange={() => handleSubcategoryClick(subcategory.name)}
            />
            {renderSubcategories(subcategory.subcategories, depth + 1)}
          </div>
        );
      } else if (subcategory.collapsible) {
        return (
          <Collapsible key={subcategory.name} trigger={subcategory.name}>
            {renderSubcategories(subcategory.subcategories, depth + 1)}
          </Collapsible>
        );
      } else {
        return null; // This subcategory won't be rendered
      }
    });
  };

  const renderCategories = (categories, depth) => {
    if (depth >= 5) {
      return null; // Stop rendering if depth exceeds 5
    }

    return categories.map((category) => {
      if (category.selectable) {
        const isSelected = selectedCategories.includes(category.name);
        return (
          <div key={category.name}>
            <Form.Check
              type='checkbox'
              id={category.name}
              label={category.name}
              checked={isSelected}
              onChange={() => handleCategoryClick(category.name)}
            />
            {renderSubcategories(category.subcategories, depth + 1)}
          </div>
        );
      } else if (category.collapsible) {
        return (
          <Collapsible key={category.name} trigger={category.name}>
            {renderCategories(category.subcategories, depth + 1)}
          </Collapsible>
        );
      } else {
        return null; // This category won't be rendered
      }
    });
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
          {renderCategories(categories, 1)} {/* Start depth at 1 */}
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
