import React from 'react';
import BaseNumber from './BaseNumber';
import CarouselFourNumber from '../CarouselFourNumber';
import { Button, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import ConfigProvider from 'antd/es/config-provider';

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

  return (
    <BaseNumber
      CarouselComponent={CarouselFourNumber}
      roomType="FourPlaceComfortNumber"
      description={
        <>
          Четырехместный номер «Комфорт» — идеальный выбор для тех, кто ценит <br />
          простор и уют. Здесь вас ждут удобные кровати, стильный интерьер<br />
          в горной тематике и всё необходимое для отдыха в сердце Кавказа.<br />
          После дня, проведенного на склонах Эльбруса, вас встретит атмосфера тепла <br />
          и расслабления. Большие окна открывают живописные виды, а продуманный <br />
          дизайн создает ощущение домашнего комфорта.
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
              <Button type="primary" size="large" >
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