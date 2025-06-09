import { useState, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { Swiper as SwiperType } from 'swiper/types';

import photo1 from '../../../../picture/FamilyNumber/FamilyOne.png';
import photo2 from '../../../../picture/FamilyNumber/FamilyTwo.png';
import photo3 from '../../../../picture/White.png';

export default function CarouselFamily() {
    const photos: string[] = [photo1, photo2, photo3];
    const [activeIndex, setActiveIndex] = useState<number>(0);
    const swiperRef = useRef<SwiperType | null>(null);
    
    const prevId = `family-prev-${Math.random().toString(36).substr(2, 9)}`;
    const nextId = `family-next-${Math.random().toString(36).substr(2, 9)}`;

    const handleSlideChange = (swiper: SwiperType) => {
        setActiveIndex(swiper.activeIndex);
    };

    return (
        <div style={{
            maxWidth: '1400px',
            margin: 'auto',
            position: 'relative',
            padding: '0px 10px 100px',
            borderRadius: '0px',
        }}>
            <h2 style={{
                textAlign: 'left',
                fontSize: '0px',
                fontWeight: 'bold'
            }}>Семейный номер</h2>

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
                    {photos.map((photo, index) => (
                        <SwiperSlide key={index}>
                            <div style={{
                                transition: 'all 0.4s ease',
                                width: (index === activeIndex || index === activeIndex + 1) ?
                                    (index === activeIndex ? '650px' : '400px') : '0px',
                                height: (index === activeIndex || index === activeIndex + 1) ?
                                    (index === activeIndex ? '400px' : '300px') : '0px',
                                overflow: 'hidden',
                                opacity: (index === activeIndex || index === activeIndex + 1) ? 1 : 0
                            }}>
                                <img
                                    src={photo}
                                    alt={`Семейный ${index + 1}`}
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover'
                                    }}
                                />
                            </div>
                        </SwiperSlide>
                    ))}
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
                            background: 'rgba(255, 255, 255, 0)',
                            border: 'none',
                            pointerEvents: 'auto',
                        }}
                    >
                        <ArrowLeftOutlined style={{ color: '#000', fontSize: '16px' }} />
                    </button>
                    <button 
                        id={nextId}
                        style={{
                            width: '40px',
                            height: '40px',
                            background: 'rgba(255, 255, 255, 0)',
                            border: 'none',
                        }}
                    >
                        <ArrowRightOutlined style={{ color: '#000', fontSize: '16px' }} />
                    </button>
                </div>
            </div>
        </div>
    );
} 