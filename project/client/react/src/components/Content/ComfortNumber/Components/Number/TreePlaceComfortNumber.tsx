import React from 'react';
import BaseNumber from './BaseNumber';
import CarouselTreeNumber from '../CarouselTreeNumber';
import { Button, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import ConfigProvider from 'antd/es/config-provider';

const StandardNumber: React.FC = () => {
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
    CarouselComponent={CarouselTreeNumber}
    roomType="TreePlaceComfortNumber"
    description={
      <>
        Трехместный номер "Комфорт" — уютное пространство с панорамными <br />
        видами на Эльбрус, где вас ждут ортопедические кровати, современная <br />
        ванная и теплая атмосфера в стиле горного шале. Идеальное место для <br />
        отдыха после активного дня, наполненного природной гармонией<br />
        и комфортом.
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

export default StandardNumber;