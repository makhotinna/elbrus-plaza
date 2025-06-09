import React from 'react';
import BaseNumber from './BaseNumber';
import CarouselLux from '../CarouselLux';
import { Button, message } from 'antd';
import ConfigProvider from 'antd/es/config-provider';
import { Link, useNavigate } from 'react-router-dom';

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
          roomType: 'Люкс',
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
      CarouselComponent={CarouselLux}
      description={
        <>
          Люкс с панорамными окнами и теплым камином — идеальное <br />
          место после горных прогулок. Здесь кавказское гостеприимство <br />
          встречается с современным комфортом, а заснеженный Эльбрус <br />
          за окном становится частью интерьера.
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