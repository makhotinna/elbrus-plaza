import React from 'react';
import BaseNumber from './BaseNumber';
import CarouselDelux from '../CarouselDelux';
import { Button, message } from 'antd';
import ConfigProvider from 'antd/es/config-provider';
import { Link, useNavigate } from 'react-router-dom';


const DeluxeNumber: React.FC = () => {
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
          roomType: 'Двухместный делюкс',
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

  return (
    <BaseNumber
      CarouselComponent={CarouselDelux}
      description={
        <>
          Этот номер - гармония кавказского колорита и современного комфорта, где <br />
          каждый элемент интерьера, от резной мебели до тканей ручной работы,<br />
          создаёт атмосферу уюта. Гостей ждёт безупречный сервис, включающий<br />
          индивидуальное concierge-обслуживание и внимание к каждой детали.<br />
          После дня на склонах Эльбруса здесь особенно приятно расслабиться у камина<br />
          или в хаммаме, наслаждаясь безукоризненным качеством проживания.
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


export default DeluxeNumber;