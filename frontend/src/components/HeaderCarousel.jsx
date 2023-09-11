import { Carousel } from 'react-bootstrap';
import { HeaderCarouselImage } from './';

const HeaderCarousel = () => {
  return (
    <>
      <Carousel
        variant='dark'
        slide={true}
        indicators={true}
        touch={true}
        className='mb-4'
      >
        <Carousel.Item style={{ height: 400 }}>
          <HeaderCarouselImage src='/images/carousel/slide1.jpg' />
          <Carousel.Caption style={{ color: '#fff' }}>
            <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <HeaderCarouselImage src='/images/carousel/slide2.jpg' />
          <Carousel.Caption>
            <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <HeaderCarouselImage src='/images/carousel/slide3.jpg' />
          <Carousel.Caption>
            <h3>Third slide label</h3>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </>
  );
};

export default HeaderCarousel;
