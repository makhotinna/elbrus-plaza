import React from 'react';
import BaseNumber from './BaseNumber';
import CarouselFamily from '../CarouselFamilyNumber';
import { Button } from 'antd';
import ConfigProvider from 'antd/es/config-provider';
import { Link } from 'react-router-dom';

const StandardNumber: React.FC = () => (
  <BaseNumber
    CarouselComponent={CarouselFamily}
    description={
      <>
        Просторный и уютный номер для родителей и детей с отдельными <br />
        спальными зонами и панорамным видом на горы. Теплая атмосфера, <br />
        натуральные материалы и всё необходимое для комфортного отдыха <br />
        после горных приключений.
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
          <Link to="/bookingform">
            <Button type="primary" size="large">
              Забронировать
            </Button>
          </Link>
        </ConfigProvider>
      </>
    }
  />
);

export default StandardNumber;