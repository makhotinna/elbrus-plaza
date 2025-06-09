import React from 'react';
import { Layout, Typography } from 'antd';
import AchievementsImage from '../../../picture/image 100.png';

const { Title, Paragraph } = Typography;

// Основные стили
const containerStyle: React.CSSProperties = {
  display: 'flex',
  minHeight: '500px',
  padding: '40px 15%',
  backgroundColor: '#f5f5f5',
  width: '100%',
  alignItems: 'center',
};

// Стили для текстового контейнера (теперь слева)
const textContainerStyle: React.CSSProperties = {
  flex: '1',
  paddingRight: '40px', // Изменили paddingLeft на paddingRight
  maxWidth: '600px',
  width: '100%',
};

// Стили для изображения (теперь справа)
const imageContainerStyle: React.CSSProperties = {
  flex: '0 0 50%',
  paddingLeft: '50px', // Изменили paddingRight на paddingLeft
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

// Стили для заголовка
const titleStyle: React.CSSProperties = {
  fontSize: '38px',
  fontWeight: 500,
  marginBottom: '30px',
  color: '#142940',
  lineHeight: '1.3'
};

// Стили для списка достижений
const achievementItemStyle: React.CSSProperties = {
  fontSize: '18px',
  marginBottom: '20px',
  color: '#333',
  lineHeight: '1.6',
  paddingLeft: '20px',
  position: 'relative'
};

// Стиль для маркера списка
const achievementMarkerStyle: React.CSSProperties = {
  position: 'absolute',
  left: 0,
  color: '#142940',
  fontWeight: 'bold'
};

const AppContent3: React.FC = () => (
  <Layout>
    <Layout.Content style={containerStyle}>
      {/* Блок с текстом (теперь слева) */}
      <div style={textContainerStyle}>
        <Title level={2} style={titleStyle}>Достижения</Title>
        
        <Paragraph style={{ fontSize: '20px', marginBottom: '30px', color: '#555' }}>
          Зарабатывайте дополнительные бонусы за активность:
        </Paragraph>

        <div style={{ marginBottom: '20px' }}>
          <Paragraph style={achievementItemStyle}>
            <span style={achievementMarkerStyle}>•</span>
            <strong>«Первое бронирование»</strong> – +500 баллов за первую оплаченную бронь.
          </Paragraph>
          
          <Paragraph style={achievementItemStyle}>
            <span style={achievementMarkerStyle}>•</span>
            <strong>«Постоянный гость»</strong> – +1000 баллов за 5 успешных бронирований.
          </Paragraph>
          
          <Paragraph style={achievementItemStyle}>
            <span style={achievementMarkerStyle}>•</span>
            <strong>«VIP-клиент»</strong> – +2000 баллов за 10 бронирований.
          </Paragraph>
        </div>
        
      </div>

      {/* Блок с изображением (теперь справа) */}
      <div style={imageContainerStyle}>
        <img 
          src={AchievementsImage} 
          alt="Достижения в программе лояльности" 
          style={{ 
            width: '110%', 
            height: '500px', 
            objectFit: 'cover',
            borderRadius: '8px'
          }}
        />
      </div>
    </Layout.Content>
  </Layout>
);

export default AppContent3;