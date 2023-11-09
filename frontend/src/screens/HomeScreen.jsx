import { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { Row, Col, Offcanvas, Button, Form } from 'react-bootstrap';
import {
  Product,
  Loader,
  Message,
  Paginate,
  BtnGoBack,
  ProductFilter,
  FilterMenu,
  ProductCarousel,
} from '../components';
import PageSizeDropdown from '../components/PageSizeDropdown';
import { useGetProductsQuery } from '../slices/productsApiSlice';
import Skeleton from 'react-loading-skeleton';

const useSessionStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    const item = window.sessionStorage.getItem(key);
    return item ? JSON.parse(item) : initialValue;
  });

  useEffect(() => {
    window.sessionStorage.setItem(key, JSON.stringify(storedValue));
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
};

const HomeScreen = () => {
  const [pageSize, setPageSize] = useSessionStorage('pageSize', '24');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');
  const { keyword, pageNumber, category, brand, minPrice, maxPrice, price } =
    useParams();
  const { data, isLoading, error } = useGetProductsQuery({
    keyword,
    pageNumber,
    pageSize: pageSize,
    category,
    brand,
    minPrice,
    maxPrice,
    price,
  });

  const { search } = useLocation();
  const isSearchPage = window.location.pathname.includes('/search');

  useEffect(() => {
    if (data && data.products) {
      sessionStorage.setItem('products', JSON.stringify(data.products));
    }
  }, [data]);

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
  //   console.log('Selected Category:', selectedCategory);
  //   console.log('Selected Brand:', selectedBrand);
  //   setSelectedCategory(selectedCategory);
  //   setSelectedBrand(selectedBrand);
  // };

  const skeletonWidth = '100%';

  return (
    <>
      {(keyword || category || brand || price) && (
        <BtnGoBack className='mb-4' />
      )}
      <h4>{isSearchPage ? 'Filter Results' : 'Latest Products'}</h4>
      {isLoading ? (
        <div className='text-center'>
          {/* <Loader />
          <h6>Loading ...</h6> */}
          <Row>
            {Array.from({ length: 12 }).map((_, index) => (
              <Col key={index} xs={12} sm={6} md={6} lg={4} xl={3} xxl={2}>
                <div className='product-skeleton my-2'>
                  <Skeleton width={skeletonWidth} height={340} />
                  <Skeleton width={skeletonWidth} height={50} />
                  <Skeleton width={skeletonWidth} height={50} />
                </div>
              </Col>
            ))}
          </Row>
        </div>
      ) : error ? (
        <Message variant='danger'>
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          {/* <ProductCarousel /> */}

          {/* <FilterMenu /> */}

          {/* <h1>Latest Products</h1> */}
          {data.products.length === 0 ? (
            <Message variant='info'>No products found.</Message>
          ) : (
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
          )}
          <Paginate
            pageSize={pageSize}
            setPageSize={setPageSize}
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
