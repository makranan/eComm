import { useState } from 'react';
import { Link } from 'react-router-dom';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import '../assets/styles/swiper.css';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { Loader } from './';

const HeaderSwiper = () => {
  const [loading, setLoading] = useState(true);

  const handleImageLoad = () => {
    setLoading(false);
  };

  return (
    <div className='unselectable'>
      <Swiper
        autoplay={{
          delay: 2500,
          disableOnInteraction: true,
        }}
        slidesPerView={1}
        spaceBetween={30}
        loop={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Navigation]}
        className='mySwiper mb-3'
      >
        <SwiperSlide>
          {loading && (
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
              }}
            >
              <Loader />
            </div>
          )}
          <Link to='/cart'>
            <img
              src='/images/carousel/slide1.jpg'
              alt=''
              onLoad={handleImageLoad}
            />
          </Link>
        </SwiperSlide>
        <SwiperSlide>
          {loading && (
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
              }}
            >
              <Loader />
            </div>
          )}
          <img
            src='/images/carousel/slide2.jpg'
            alt=''
            onLoad={handleImageLoad}
          />
        </SwiperSlide>
        <SwiperSlide>
          {loading && (
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
              }}
            >
              <Loader />
            </div>
          )}
          <img
            src='/images/carousel/slide3.jpg'
            alt=''
            onLoad={handleImageLoad}
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default HeaderSwiper;
