import { useState, useRef, useMemo } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';

import photo1 from '../../../../picture/TwoPlace/Improve/TPImproveOne.png';
import photo2 from '../../../../picture/TwoPlace/Improve/TPImproveTwo.png';
import photo3 from '../../../../picture/TwoPlace/Improve/TPImproveTree.png';
import photo4 from '../../../../picture/White.png';

export default function CarouselImprove() {
    const swiperRef = useRef<SwiperType | null>(null);
    const [activeIndex, setActiveIndex] = useState(0);
    
    const [prevId, nextId] = useMemo(() => [
        `improve-prev-${Math.random().toString(36).substr(2, 9)}`,
        `improve-next-${Math.random().toString(36).substr(2, 9)}`
    ], []);

    const photos = useMemo(() => [
        { src: photo1, alt: 'Улучшенный номер 1' },
        { src: photo2, alt: 'Улучшенный номер 2' },
        { src: photo3, alt: 'Улучшенный номер 3' },
        { src: photo4, alt: 'Улучшенный номер 4' },
    ], []);

    const handleSlideChange = (swiper: SwiperType) => {
        setActiveIndex(swiper.activeIndex);
    };

    const getSlideStyle = (isActive: boolean, isNext: boolean) => ({
        transition: 'all 0.4s ease',
        width: isActive ? '650px' : isNext ? '400px' : '0px',
        height: isActive ? '400px' : isNext ? '300px' : '0px',
        overflow: 'hidden',
        opacity: isActive || isNext ? 1 : 0
    });

    return (
        <div style={{
            maxWidth: '1400px',
            margin: 'auto',
            position: 'relative',
            padding: '0 10px 100px',
            borderRadius: '0px',
        }}>
            <h2 style={{
                textAlign: 'left',
                fontSize: '0px',
                fontWeight: 'bold'
            }}>Улучшенные номера</h2>

            <div style={{ position: 'relative', height: '400px' }}>
                <Swiper
                    modules={[Navigation]}
                    spaceBetween={160}
                    navigation={{
                        nextEl: `#${nextId}`,
                        prevEl: `#${prevId}`,
                    }}
                    loop={false}
                    initialSlide={0}
                    onSwiper={(swiper) => swiperRef.current = swiper}
                    onSlideChange={handleSlideChange}
                    breakpoints={{
                        100: {
                            slidesPerView: 2,
                            spaceBetween: 20
                        }
                    }}
                >
                    {photos.map((photo, index) => {
                        const isActive = index === activeIndex;
                        const isNext = index === activeIndex + 1;
                        
                        return (
                            <SwiperSlide key={index}>
                                <div style={getSlideStyle(isActive, isNext)}>
                                    <img
                                        src={photo.src}
                                        alt={photo.alt}
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover'
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
}