import React from 'react';
import { Col, Row } from 'react-bootstrap';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { useGetTopProductQuery } from '../slices/productsApiSlice';
import { Product } from '.';
import 'react-multi-carousel/lib/styles.css';
import Skeleton from 'react-loading-skeleton';

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 6,
    slidesToSlide: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 4,
    slidesToSlide: 3,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 2,
    slidesToSlide: 1,
  },
};

const skeletonWidth = '100%';

const ProductCarousel = () => {
  const { data: products, isLoading, error } = useGetTopProductQuery();

  if (error) {
    console.error('Error fetching top products:', error);
    return <div>Error fetching top products</div>;
  }

  if (isLoading || !products) {
    return (
      <Row>
        <Col xs={12}>
          <div className='product-skeleton my-2'>
            <Skeleton width={skeletonWidth} height={240} />
            <Skeleton width={skeletonWidth} height={50} />
            <Skeleton width={skeletonWidth} height={50} />
          </div>
        </Col>
      </Row>
    );
  }

  return (
    <>
      <h4>Top Products</h4>

      <div className='mb-2'>
        <Carousel
          swipeable={true}
          draggable={false}
          showDots={true}
          responsive={responsive}
          ssr={true}
          infinite={true}
          autoPlaySpeed={1000}
          keyBoardControl={true}
          customTransition='transform 400ms ease-in-out'
          // transitionDuration={500}
          // containerClass='carousel-container'
          //   removeArrowOnDeviceType={['tablet', 'mobile']}
          // dotListClass='custom-dot-list-style'
          // partialVisible={true}
          //   customDot={<CustomDot />}
          // itemClass='carousel-item-padding-40-px'
        >
          {products.map((product) => (
            <div key={product._id} className='mx-2'>
              <Product product={product} isCarousel={true} />
            </div>
          ))}
        </Carousel>
      </div>
    </>
  );
};

export default ProductCarousel;
