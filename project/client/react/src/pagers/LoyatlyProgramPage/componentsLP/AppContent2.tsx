import React from 'react';
import { Typography, Row, Col } from 'antd';
import Bronza from '../../../picture/bronza.png';
import Silver from '../../../picture/silver.png';
import Gold from '../../../picture/gold.png';

const { Title, Paragraph } = Typography;

const AppContent2: React.FC = () => {
  // Настройка высоты изображений (измените это значение по вашему вкусу)
  const imageHeight = '270px'; // Можно использовать '300px', '400px' и т.д.

  return (
    <div style={{
      padding: '40px 5%',
      backgroundColor: '#f5f5f5',
      textAlign: 'center'
    }}>
      {/* Заголовок раздела */}
      <Title level={2} style={{
        marginBottom: '30px',
        color: '#142940'
      }}>
        Уровни программы
      </Title>

      <Paragraph style={{
        fontSize: '18px',
        marginBottom: '40px',
        maxWidth: '800px',
        marginLeft: 'auto',
        marginRight: 'auto'
      }}>
        Чем больше баллов вы накапливаете, тем выше ваш статус и привилегии
      </Paragraph>

      <Row gutter={[40, 40]} justify="center">
        {/* Бронзовый уровень */}
        <Col xs={24} md={8}>
          <div style={{
            backgroundColor: '#fff',
            padding: '30px',
            borderRadius: '8px',
            height: '100%',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
          }}>
            <div style={{
              height: imageHeight, // Используем переменную здесь
              backgroundColor: '#f0f0f0',
              marginBottom: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '4px'
            }}>
              <img
                src={Bronza}
                alt="Бронзовый уровень"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  borderRadius: '4px',
                }}
              />
            </div>
            <Title level={3} style={{ color: '#cd7f32' }}>Бронзовый</Title>
            <Paragraph strong>(20 000 баллов)</Paragraph>
            <Paragraph>Базовые преимущества, ускоренная обработка заявок</Paragraph>
          </div>
        </Col>

        {/* Серебряный уровень */}
        <Col xs={24} md={8}>
          <div style={{
            backgroundColor: '#fff',
            padding: '30px',
            borderRadius: '8px',
            height: '100%',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
          }}>
            <div style={{
              height: imageHeight, // Используем ту же переменную
              backgroundColor: '#f0f0f0',
              marginBottom: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '4px'
            }}>
              <img
                src={Silver}
                alt="Серебряный уровень" // Исправлено описание alt
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  borderRadius: '4px'
                }}
              />
            </div>
            <Title level={3} style={{ color: '#c0c0c0' }}>Серебряный</Title>
            <Paragraph strong>(50 000 баллов)</Paragraph>
            <Paragraph>Повышенный кэшбэк (35% вместо 30%), приоритетное заселение</Paragraph>
          </div>
        </Col>

        {/* Золотой уровень */}
        <Col xs={24} md={8}>
          <div style={{
            backgroundColor: '#fff',
            padding: '30px',
            borderRadius: '8px',
            height: '100%',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
          }}>
            <div style={{
              height: imageHeight, // И здесь используем переменную
              backgroundColor: '#f0f0f0',
              marginBottom: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '4px'
            }}>
              <img
                src={Gold}
                alt="Золотой уровень" // Исправлено описание alt
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  borderRadius: '4px'
                }}
              />
            </div>
            <Title level={3} style={{ color: '#ffd700' }}>Золотой</Title>
            <Paragraph strong>(100 000 баллов)</Paragraph>
            <Paragraph>Максимальный кэшбэк (40%), бесплатный поздний выезд, welcome-набор</Paragraph>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default AppContent2;