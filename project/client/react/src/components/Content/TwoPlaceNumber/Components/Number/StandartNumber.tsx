//'http://localhost:8787/api/reserve',
import React from 'react';
import BaseNumber from './BaseNumber';
import CarouselStandart from '../CarouselStandart';
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

  return (
    <BaseNumber
      CarouselComponent={CarouselStandart}
      description={
        <>
          Простой, но одновременно красивый и светлый номер с видом на горы. <br />
          Тёплый интерьер и уютная атмосфера идеально подходят <br />
          для отдыха после прогулок или катания на склонах Эльбруса.
          <br /><br />
          <ConfigProvider
            theme={{
              components: {
                Button: {
                  colorPrimary: '#383B52',
                  colorPrimaryHover: '#E3D9D4',
                  colorTextLightSolid: '#ffffff',
                  colorPrimaryTextHover: '#000000',
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