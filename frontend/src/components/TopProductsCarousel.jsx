import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { useGetTopProductQuery } from '../slices/productsApiSlice';
import { Product } from '.';

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 6,
    slidesToSlide: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 3,
    slidesToSlide: 3,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1,
  },
};

const ProductCarousel = () => {
  const { data: products, isLoading, error } = useGetTopProductQuery();

  if (error) {
    console.error('Error fetching top products:', error);
    return <div>Error fetching top products</div>;
  }

  if (isLoading || !products) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <h4>Top Products</h4>

      <Carousel
        swipeable={true}
        draggable={false}
        showDots={true}
        responsive={responsive}
        ssr={false}
        infinite={true}
        autoPlaySpeed={1000}
        keyBoardControl={true}
        customTransition='all .5'
        transitionDuration={500}
        containerClass='carousel-container'
        //   removeArrowOnDeviceType={['tablet', 'mobile']}
        dotListClass='custom-dot-list-style'
        partialVisbile={true}
        // itemClass='carousel-item-padding-40-px'
      >
        {products.map((product) => (
          <div key={product.id} className='mx-2'>
            <Product product={product} isCarousel={true} />
          </div>
        ))}
      </Carousel>
    </>
  );
};

export default ProductCarousel;
