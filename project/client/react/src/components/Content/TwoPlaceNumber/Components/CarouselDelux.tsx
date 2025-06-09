import React, { useState, useRef, useMemo } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';
import 'swiper/css';
import 'swiper/css/navigation';

import photo1 from '../../../../picture/TwoPlace/DeLux/TPDeLuxOne.png';
import photo2 from '../../../../picture/TwoPlace/DeLux/TPDeLuxTwo.png';
import photo3 from '../../../../picture/TwoPlace/DeLux/TPDeLuxTree.png';
import photo4 from '../../../../picture/TwoPlace/DeLux/TpDeLuxFour.png';
import photo5 from '../../../../picture/White.png';

interface SlideItem {
  src: string;
  alt: string;
}

const CarouselDelux: React.FC = () => {
  const swiperRef = useRef<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  
  // Генерация уникальных ID для навигации
  const [prevId, nextId] = useMemo(() => [
    `delux-prev-${Math.random().toString(36).substr(2, 9)}`,
    `delux-next-${Math.random().toString(36).substr(2, 9)}`
  ], []);

  const slides: SlideItem[] = useMemo(() => [
    { src: photo1, alt: 'Делюкс номер 1' },
    { src: photo2, alt: 'Делюкс номер 2' },
    { src: photo3, alt: 'Делюкс номер 3' },
    { src: photo4, alt: 'Делюкс номер 4' },
    { src: photo5, alt: 'Делюкс номер 5' },
  ], []);

  const handleSlideChange = (swiper: SwiperType) => {
    setActiveIndex(swiper.activeIndex);
  };

  const getSlideStyle = (isActive: boolean, isNext: boolean): React.CSSProperties => ({
    transition: 'all 0.4s ease',
    width: isActive ? '650px' : isNext ? '400px' : '0px',
    height: isActive ? '400px' : isNext ? '300px' : '0px',
    overflow: 'hidden',
    opacity: isActive || isNext ? 1 : 0,
  });

  return (
    <div style={{
      maxWidth: '1400px',
      margin: '0 auto',
      position: 'relative',
      padding: '0 10px 100px',
      borderRadius: '0px',
    }}>
      <h2 style={{
        textAlign: 'left',
        fontSize: '0px',
        fontWeight: 'bold'
      }}>Номера Делюкс</h2>

      <div style={{ position: 'relative', height: '400px' }}>
        <Swiper
          modules={[Navigation]}
          spaceBetween={160}
          navigation={{
            nextEl: `#${nextId}`,
            prevEl: `#${prevId}`,
          }}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          onSlideChange={handleSlideChange}
          loop={false}
          initialSlide={0}
          breakpoints={{
            100: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
          }}
        >
          {slides.map((slide, index) => {
            const isActive = index === activeIndex;
            const isNext = index === activeIndex + 1;

            return (
              <SwiperSlide key={index}>
                <div style={getSlideStyle(isActive, isNext)}>
                  <img
                    src={slide.src}
                    alt={slide.alt}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>

        <div style={{
          position: 'absolute',
          bottom: '5px',
          left: '51%',
          display: 'flex',
          gap: '25px',
          zIndex: 10,
        }}>
          <button
            id={prevId}
            style={{
              width: '40px',
              height: '40px',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
            }}
            aria-label="Предыдущий слайд"
          >
            <ArrowLeftOutlined style={{ color: '#000', fontSize: '16px' }} />
          </button>
          <button
            id={nextId}
            style={{
              width: '40px',
              height: '40px',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
            }}
            aria-label="Следующий слайд"
          >
            <ArrowRightOutlined style={{ color: '#000', fontSize: '16px' }} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CarouselDelux;