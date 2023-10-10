import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Row, Col, Offcanvas, Button, Form } from 'react-bootstrap';
import {
  Product,
  Loader,
  Message,
  Paginate,
  BtnGoBack,
  ProductFilter,
  FilterMenu,
} from '../components';
import { useGetProductsQuery } from '../slices/productsApiSlice';

const HomeScreen = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');
  const { keyword, pageNumber, category, brand } = useParams();
  const { data, isLoading, error } = useGetProductsQuery({
    keyword,
    pageNumber,
    category,
    brand,
  });

  if (isLoading) {
    // Loading state
  } else if (error) {
    // Error state
    console.error('Error fetching products:', error);
  } else if (data) {
    // Data fetched successfully
    console.log('Fetched products data:', data);
  }

  const handleFilter = (selectedCategory, selectedBrand) => {
    // Update state or make an API request to filter products
    // For example, update state to store the selected filters
    console.log('Selected Category:', selectedCategory);
    console.log('Selected Brand:', selectedBrand);
    setSelectedCategory(selectedCategory);
    setSelectedBrand(selectedBrand);
  };

  return (
    <>
      {isLoading ? (
        <div className='text-center'>
          <Loader />
          <h6>Loading ...</h6>
        </div>
      ) : error ? (
        <Message variant='danger'>
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          {keyword && <BtnGoBack />}

          {/* <FilterMenu /> */}
          <h1>Latest Products</h1>
          <Row>
            {data.products.map((product) => (
              <Col
                key={product._id}
                xs={12}
                sm={6}
                md={6}
                lg={4}
                xl={3}
                xxl={2}
              >
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginate
            pages={data.pages}
            page={data.page}
            keyword={keyword ? keyword : ''}
            category={category ? category : ''}
            brand={brand ? brand : ''}
          />
        </>
      )}
    </>
  );
};

export default HomeScreen;
