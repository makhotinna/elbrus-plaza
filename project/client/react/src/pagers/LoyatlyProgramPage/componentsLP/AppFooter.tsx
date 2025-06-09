// AppFooterLP.tsx
import React, { useState } from 'react';
import { Layout, Typography, Button } from 'antd';
import RegisterModal from '../RegisterModelLP';

const { Title, Paragraph } = Typography;

interface AppFooterLPProps {
  titleSize?: number;
  textSize?: number;
  buttonSize?: number;
}

const AppFooterLP: React.FC<AppFooterLPProps> = ({ 
  titleSize = 32, 
  textSize = 18,
  buttonSize = 16
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const containerStyle: React.CSSProperties = {
    textAlign: 'center',
    color: '#142940',
    backgroundColor: '#fff',
    padding: '60px 20px',
    width: '100%',
    borderTop: '1px solid #f0f0f0'
  };

  const titleStyle: React.CSSProperties = {
    fontSize: `${titleSize}px`,
    fontWeight: 500,
    marginBottom: '20px',
    lineHeight: 1.3,
    color: '#142940'
  };

  const textStyle: React.CSSProperties = {
    fontSize: `${textSize}px`,
    marginBottom: '30px',
    color: '#555'
  };

  const buttonStyle: React.CSSProperties = {
    backgroundColor: '#142940',
    color: '#fff',
    border: 'none',
    fontWeight: 'bold',
    fontSize: `${buttonSize}px`,
    padding: '0 32px',
    height: '48px',
    borderRadius: '24px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    transition: 'all 0.3s',
  };

  return (
    <>
      <Layout.Footer style={containerStyle}>
        <Title level={2} style={titleStyle}>
          Регистрируйтесь, бронируйте и<br />
          получайте вознаграждения!
        </Title>
        <Paragraph style={textStyle}>
          Начните зарабатывать бонусы уже при первом бронировании
        </Paragraph>
        <Button 
          type="primary" 
          style={buttonStyle}
          onClick={showModal}
        >
          Зарегистрироваться
        </Button>
      </Layout.Footer>
      
      <RegisterModal
        visible={isModalVisible}
        onClose={handleCancel}
        defaultActiveKey="register"
      />
    </>
  );
};

export default AppFooterLP;