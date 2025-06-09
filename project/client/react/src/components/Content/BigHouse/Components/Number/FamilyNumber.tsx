import React from 'react';
import BaseNumber from './BaseNumber';
import CarouselBigHouse from '../CarouselFamilyNumber';
import ConfigProvider from 'antd/es/config-provider';
import { Button, ButtonProps } from 'antd';
import { Link } from 'react-router-dom';

// Кастомная кнопка с явно указанными пропсами
const BookButton: React.FC<ButtonProps> = (props) => (
  <Button type="primary" size="large" {...props} />
);

const StandardNumber: React.FC = () => (
  <BaseNumber
    CarouselComponent={CarouselBigHouse}
    description={
      <>
        Идеальное решение для большой семьи или компании друзей — уютный <br />
        дом с камином, панорамными окнами и отдельными спальнями для <br />
        комфортного отдыха. Здесь вас ждёт атмосфера горного уюта, <br />
        современные удобства и потрясающие виды на склоны величественного <br />
        Эльбруса.
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
            <BookButton>Забронировать</BookButton>
          </Link>
        </ConfigProvider>
      </>
    }
  />
);

export default StandardNumber;