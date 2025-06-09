import { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { Swiper as SwiperType } from 'swiper/types';
/*import photo1 from 'C:/Users/lapa_/OneDrive/Рабочий стол/Elbrus-Hotel/my-app/src/pagers/MainPage/image/room1.png';
import photo2 from 'C:/Users/lapa_/OneDrive/Рабочий стол/Elbrus-Hotel/my-app/src/pagers/MainPage/image/room2.png';
import photo3 from 'C:/Users/lapa_/OneDrive/Рабочий стол/Elbrus-Hotel/my-app/src/pagers/MainPage/image/room3.png';
import photo4 from 'C:/Users/lapa_/OneDrive/Рабочий стол/Elbrus-Hotel/my-app/src/pagers/MainPage/image/room4.png';
import photo5 from 'C:/Users/lapa_/OneDrive/Рабочий стол/Elbrus-Hotel/my-app/src/pagers/MainPage/image/room5.png';
import photo6 from 'C:/Users/lapa_/OneDrive/Рабочий стол/Elbrus-Hotel/my-app/src/pagers/MainPage/image/room6.png';
import photo7 from 'C:/Users/lapa_/OneDrive/Рабочий стол/Elbrus-Hotel/my-app/src/pagers/MainPage/image/room7.png';
import photo8 from 'C:/Users/lapa_/OneDrive/Рабочий стол/Elbrus-Hotel/my-app/src/pagers/MainPage/image/room8.png';*/

// Дополнительные фото для детального просмотра
//import detailPhoto1 from 'C:/Users/lapa_/OneDrive/Рабочий стол/Elbrus-Hotel/my-app/src/pagers/MainPage/image/room1.png';
//import detailPhoto2 from 'C:/Users/lapa_/OneDrive/Рабочий стол/Elbrus-Hotel/my-app/src/pagers/MainPage/image/room2.png';
import photo1 from '../image/room1.png';
import photo2 from '../image/room2.png';
import photo3 from '../image/room3.png';
import photo4 from '../image/room4.png';
import photo5 from '../image/room5.png';
import photo6 from '../image/room6.png';
import photo7 from '../image/room7.png';
import photo8 from '../image/room8.png';

// Дополнительные фото для детального просмотра
import detailPhoto1 from '../image/room1.png';
import detailPhoto2 from '../image/room2.png';
// ... добавьте остальные детальные фото

export default function Carousel() {
  const photos = [
    { id: 1, img: photo1, title: "Люкс с видом на горы", detailImg: detailPhoto1 },
    { id: 2, img: photo2, title: "Стандартный двухместный", detailImg: detailPhoto2 },
    { id: 3, img: photo3, title: "Делюкс с балконом", detailImg: detailPhoto1 },
    { id: 4, img: photo4, title: "Семейный номер", detailImg: detailPhoto2 },
    { id: 5, img: photo5, title: "Президентский люкс", detailImg: detailPhoto1 },
    { id: 6, img: photo6, title: "Номер для новобрачных", detailImg: detailPhoto2 },
    { id: 7, img: photo7, title: "Бизнес-класс", detailImg: detailPhoto1 },
    { id: 8, img: photo8, title: "Эконом стандарт", detailImg: detailPhoto2 }
  ];

  const swiperRef = useRef<SwiperType | null>(null);
  const [activeDetails, setActiveDetails] = useState<{ [key: number]: boolean }>({});

  const toggleDetails = (id: number) => {
    setActiveDetails(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <div style={{
      backgroundColor: '#161f23',
      maxWidth: '1600px',
      margin: '0 auto',
      position: 'relative',
      padding: '1px 0',
      bottom: '130px',
      top: '-100px'
    }}>
      <h2 style={{
        textAlign: 'center',
        fontSize: '36px',
        fontWeight: '600',
        color: 'white',
        marginBottom: '30px',
        fontFamily: 'Arial, sans-serif',
        textTransform: 'uppercase',
        letterSpacing: '1px'
      }}>
        Популярные предложения
      </h2>
      <div style={{
        position: 'relative',
        height: '700px',
        display: 'flex',
        alignItems: 'center',
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '0 8px 24px rgba(0,0,0,0.15)'
      }}>
        {/* Левая стрелка */}
        <button
          onClick={() => swiperRef.current?.slidePrev()}
          style={{
            position: 'absolute',
            left: '40px',
            top: '40%',
            transform: 'translateY(-50%)',
            zIndex: 10,
            width: '60px',
            height: '60px',
            background: 'rgba(255, 255, 255, 0.8)',
            border: 'none',
            borderRadius: '50%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'pointer',
            boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 1)';
            e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.8)';
            e.currentTarget.style.transform = 'translateY(-50%)';
          }}
        >
          <ArrowLeftOutlined style={{ color: '#000', fontSize: '24px' }} />
        </button>

        {/* Карусель */}
        <Swiper
          modules={[Navigation]}
          spaceBetween={40}
          slidesPerView={1}
          centeredSlides={true}
          loop={true}
          onSwiper={(swiper) => swiperRef.current = swiper}
          style={{
            
          }}
        >
          {photos.map((photo) => (
            <SwiperSlide key={photo.id}>
              <div style={{
                width: '1000px',
                height: '700px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'relative',
                top: '-150px',
                right: '-267px'
              }}>
                {/* Основное или детальное изображение */}
                <img
                  src={activeDetails[photo.id] ? photo.detailImg : photo.img}
                  alt={`Фото номера ${photo.id}`}
                  style={{
                    width: 'auto',
                    height: '100%',
                    maxWidth: '100%',
                    objectFit: 'contain',
                    borderRadius: '8px',
                  }}
                />

                {/* Текст и кнопка (только для основного изображения) */}
                {!activeDetails[photo.id] && (
                  <div style={{
                    position: 'absolute',
                    bottom: '100px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    textAlign: 'center',
                    zIndex: 5,
                    background: 'rgba(0,0,0,0.6)',
                    padding: '20px 40px',
                    borderRadius: '8px',
                    color: 'white'
                  }}>
                    <h3 style={{
                      margin: '0 0 15px 0',
                      fontSize: '24px',
                      fontWeight: '500'
                    }}>
                      {photo.title}
                    </h3>
                    <button
                      onClick={() => toggleDetails(photo.id)}
                      style={{
                        padding: '10px 25px',
                        backgroundColor: '#1890ff',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        fontSize: '16px',
                        cursor: 'pointer',
                        transition: 'background-color 0.3s'
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.backgroundColor = '#40a9ff';
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.backgroundColor = '#1890ff';
                      }}
                    >
                      Подробнее
                    </button>
                  </div>
                )}

                {/* Кнопка "Назад" для детального просмотра */}
                {activeDetails[photo.id] && (
                  <button
                    onClick={() => toggleDetails(photo.id)}
                    style={{
                      position: 'absolute',
                      bottom: '30px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      padding: '10px 25px',
                      backgroundColor: '#1890ff',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      fontSize: '16px',
                      cursor: 'pointer',
                      zIndex: 5,
                      transition: 'background-color 0.3s'
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.backgroundColor = '#40a9ff';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.backgroundColor = '#1890ff';
                    }}
                  >
                    Назад к описанию
                  </button>
                )}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Правая стрелка */}
        <button
          onClick={() => swiperRef.current?.slideNext()}
          style={{
            position: 'absolute',
            right: '40px',
            top: '40%',
            transform: 'translateY(-50%)',
            zIndex: 10,
            width: '60px',
            height: '60px',
            background: 'rgba(255, 255, 255, 0.8)',
            border: 'none',
            borderRadius: '50%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'pointer',
            boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 1)';
            e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.8)';
            e.currentTarget.style.transform = 'translateY(-50%)';
          }}
        >
          <ArrowRightOutlined style={{ color: '#000', fontSize: '24px' }} />
        </button>
      </div>
    </div>
  );
}