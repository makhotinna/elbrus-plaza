import { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { Swiper as SwiperType } from 'swiper/types';
/*import photo1 from "C:/Users/lapa_/OneDrive/Рабочий стол/Elbrus-Hotel/my-app/src/pagers/MainPage/image/Frame-9.jpg";
import photo2 from "C:/Users/lapa_/OneDrive/Рабочий стол/Elbrus-Hotel/my-app/src/pagers/MainPage/image/Frame 13.jpg";
import photo3 from "C:/Users/lapa_/OneDrive/Рабочий стол/Elbrus-Hotel/my-app/src/pagers/MainPage/image/Frame 11.jpg";
import photo4 from "C:/Users/lapa_/OneDrive/Рабочий стол/Elbrus-Hotel/my-app/src/pagers/MainPage/image/Frame 10.jpg";*/
import photo1 from "../image/Frame-9.jpg";
import photo2 from "../image/Frame 13.jpg";
import photo3 from "../image/Frame 11.jpg";
import photo4 from "../image/Frame 10.jpg";

export default function Carousel() {
    const photos: string[] = [photo1, photo2, photo3, photo4];
    const swiperRef = useRef<SwiperType | null>(null);

    return (
        <div style={{
            maxWidth: '700px',
            margin: '0 auto',
            position: 'relative',
            bottom: '445px',
            height: '100px',
            marginLeft: '820px'
        }}>
            <div style={{ 
                position: 'relative',
                height: '445px',
                display: 'flex',
                alignItems: 'center'
            }}>
                {/* Левая стрелка */}
                <button 
                    onClick={() => swiperRef.current?.slidePrev()}
                    style={{
                        position: 'absolute',
                        left: '90px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        zIndex: 10,
                        width: '50px',
                        height: '50px',
                        background: 'rgba(255, 255, 255, 0.7)',
                        border: 'none',
                        borderRadius: '50%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        cursor: 'pointer',
                        boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
                    }}
                >
                    <ArrowLeftOutlined style={{ color: '#000', fontSize: '20px' }} />
                </button>

                {/* Карусель */}
                <Swiper
                    modules={[Navigation]}
                    spaceBetween={30}
                    slidesPerView={1}
                    centeredSlides={true}
                    loop={true}
                    onSwiper={(swiper) => swiperRef.current = swiper}
                    style={{
                        width: '100%',
                        height: '100%'
                    }}
                >
                    {photos.map((photo, index) => (
                        <SwiperSlide key={index}>
                            <div style={{
                                width: '100%',
                                height: '100%',
                                display: 'flex',
                                justifyContent: 'center'
                            }}>
                                <img
                                    src={photo}
                                    alt={`Фото ${index + 1}`}
                                    style={{
                                        width: 'auto',
                                        height: '100%',
                                        maxWidth: '100%',
                                        objectFit: 'cover',
                                        borderRadius: '8px',
                                        boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                                    }}
                                />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>

                {/* Правая стрелка */}
                <button 
                    onClick={() => swiperRef.current?.slideNext()}
                    style={{
                        position: 'absolute',
                        right: '90px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        zIndex: 10,
                        width: '50px',
                        height: '50px',
                        background: 'rgba(255, 255, 255, 0.7)',
                        border: 'none',
                        borderRadius: '50%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        cursor: 'pointer',
                        boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
                    }}
                >
                    <ArrowRightOutlined style={{ color: '#000', fontSize: '20px' }} />
                </button>
            </div>
        </div>
    );
}