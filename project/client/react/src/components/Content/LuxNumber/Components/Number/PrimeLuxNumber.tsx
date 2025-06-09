import React from 'react';
import BaseNumber from './BaseNumber';
import CarouselPrimeLux from '../CarouselPrimeLux';
import { Button, message } from 'antd';
import ConfigProvider from 'antd/es/config-provider';
import { Link, useNavigate } from 'react-router-dom';

const ImprovedNumber: React.FC = () => {
    const navigate = useNavigate();

  const handleReserveClick = async (e: React.MouseEvent) => {
    e.preventDefault(); 
    
    try {
      const response = await fetch('http://localhost:8787/api/reserve', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          roomType: 'Двухместный стандарт',
        }),
      });

      if (response.ok) {
        navigate('/reserve');
      } else {
        throw new Error('Ошибка при отправке данных');
      }
    } catch (error) {
      message.error('Произошла ошибка при бронировании');
      console.error('Ошибка:', error);
    }
  };
  return(
  <BaseNumber
    CarouselComponent={CarouselPrimeLux}
    description={
      <>
        Этот номер воплощение безупречного вкуса и статуса. Здесь <br />
        многовековые традиции кавказского гостеприимства гармонично <br />
        сочетаются с современной роскошью, а величественный Эльбрус <br />
        за стеклом создает впечатление, будто вся мощь Кавказа — часть <br />
        ваших апартаментов.
        <br /><br />
        <ConfigProvider
          theme={{
            components: {
              Button: {
                colorPrimary: '#383B52',          // Основной цвет кнопки
                colorPrimaryHover: '#E3D9D4',     // Цвет фона при наведении
                colorTextLightSolid: '#ffffff',    // Цвет текста по умолчанию (белый)
                colorPrimaryTextHover: '#000000',  // Цвет текста при наведении (чёрный)
              },
            },
          }}
        >
          <Link to="/bookingform" onClick={handleReserveClick}>
            <Button type="primary" size="large">
              Забронировать
            </Button>
          </Link>
        </ConfigProvider>
      </>
    }
  />
);
};

export default ImprovedNumber;