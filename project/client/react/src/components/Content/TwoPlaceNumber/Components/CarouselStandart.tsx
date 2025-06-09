import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { Swiper as SwiperType } from 'swiper/types';

import photo3 from '../../../../picture/TwoPlace/Standart/DvSStart.png';
import photo2 from '../../../../picture/TwoPlace/Standart/DvSNextOne.png';
import photo1 from '../../../../picture/TwoPlace/Standart/DvSNextTwo.png';
import photo4 from '../../../../picture/White.png';

export default function CarouselStandart() {
    const photos: string[] = [photo1, photo2, photo3, photo4];
    const [activeIndex, setActiveIndex] = useState<number>(0);

    const handleSlideChange = (swiper: SwiperType) => {
        setActiveIndex(swiper.activeIndex);
    };

    return (
        <div style={{
            maxWidth: '1400px',
            margin: ' auto',
            position: 'relative',
            padding: '0px 10px 100px',
            borderRadius: '0px',
        }}>
            <h2 style={{
                textAlign: 'left',
                fontSize: '0px',
                fontWeight: 'bold'
            }}>Двухместные номера (Стандарт)</h2>

            <div style={{ position: 'relative', height: '400px' }}>
                <Swiper
                    modules={[Navigation]}
                    spaceBetween={160}
                    navigation={{
                        nextEl: '.standart-next',
                        prevEl: '.standart-prev',
                    }}
                    loop={false}
                    initialSlide={0}
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
                                    alt={`Стандарт ${index + 1}`}
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
                    <button className="standart-prev" style={{
                        width: '40px',
                        height: '40px',
                        background: 'rgba(255, 255, 255, 0)',
                        border: 'none',
                        pointerEvents: 'auto',
                    }}>
                        <ArrowLeftOutlined style={{ color: '#000', fontSize: '16px' }} />
                    </button>
                    <button className="standart-next" style={{
                        width: '40px',
                        height: '40px',
                        background: 'rgba(255, 255, 255, 0)',
                        border: 'none',
                    }}>
                        <ArrowRightOutlined style={{ color: '#000', fontSize: '16px' }} />
                    </button>
                </div>
            </div>
        </div>
    );
}