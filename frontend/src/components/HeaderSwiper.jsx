import { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { Link } from 'react-router-dom';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import '../assets/styles/swiper.css';
import { Autoplay, Navigation } from 'swiper/modules';
import { Loader } from './';
import Skeleton from 'react-loading-skeleton';

const HeaderSwiper = () => {
  const [loading, setLoading] = useState(true);

  const handleImageLoad = () => {
    setLoading(false);
  };

  const skeletonHeight = '100%';
  const skeletonWidth = '100%';

  return (
    <div className='unselectable'>
      <Swiper
        autoplay={{
          delay: 2500,
          disableOnInteraction: true,
        }}
        slidesPerView={1}
        spaceBetween={0}
        loop={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Navigation]}
        className='mb-3 '
      >
        <SwiperSlide>
          {loading ? (
            <Skeleton />
          ) : (
            <img
              src='/images/carousel/slide1.svg'
              alt=''
              onLoad={handleImageLoad}
            />
          )}
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
            src='/images/carousel/slide2.svg'
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
            src='/images/carousel/slide3.svg'
            alt=''
            onLoad={handleImageLoad}
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default HeaderSwiper;
