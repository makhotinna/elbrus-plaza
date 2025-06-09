// AppContent1LP.tsx
import React, { useState } from 'react';
import { Layout, Typography, Button } from 'antd';
import styled from 'styled-components';
import HotelImage from '../../../picture/image 95.png';
import RegisterModal from '../RegisterModelLP';

const { Title, Paragraph } = Typography;

const StyledContainer = styled.div`
  display: flex;
  min-height: 500px;
  padding: 40px 5%;
  background-color: #f5f5f5;
  width: 100%;
  align-items: center;
  position: relative;
`;

const ImageContainer = styled.div`
  flex: 0 0 45%;
  padding-right: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const TextContainer = styled.div`
  flex: 1;
  padding-left: 40px;
  max-width: 600px;
  width: 100%;
`;

const StyledTitle = styled(Title)`
  font-size: 38px !important;
  font-weight: 500 !important;
  margin-bottom: 30px !important;
  color: #142940 !important;
  line-height: 1.3 !important;
`;

const StyledSubtitle = styled(Paragraph)`
  font-size: 23px !important;
  font-weight: 500 !important;
  margin-bottom: 8px !important;
  color: #142940 !important;
  line-height: 1.5 !important;
`;

const StyledParagraph = styled(Paragraph)`
  font-size: 16px !important;
  margin-bottom: 24px !important;
  color: #333 !important;
  line-height: 1.6 !important;
`;

const StyledButton = styled(Button)`
  margin-top: 26px !important; 
  background-color: #142940 !important;
  border-color: #142940 !important;
  height: 50px !important;
  font-size: 18px !important;
  border-radius: 4px !important;
  color: #fff !important;
  width: 200px !important;
  position: absolute !important;
  top: 89% !important;
  left: 140% !important;
  z-index: 1000 !important;

  &:hover {
    background-color: #E3D9D4 !important;
    border-color: #E3D9D4 !important;
    color: black !important;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2) !important;
  }
`;

const AppContent1LP: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Layout>
        <StyledContainer>
          <ImageContainer>
            <img 
              src={HotelImage} 
              alt="Отель Эльбрус" 
              style={{ 
                width: '100%', 
                height: '500px', 
                objectFit: 'cover',
                borderRadius: '8px'
              }}
            />
            <StyledButton 
              type="primary" 
              size="large"
              onClick={showModal}
            >
              Зарегистрироваться
            </StyledButton>
          </ImageContainer>
          
          <TextContainer>
            <StyledTitle level={2}>Как это работает?</StyledTitle>
            <StyledSubtitle>Регистрация и авторизация</StyledSubtitle>
            <StyledParagraph>
              Чтобы участвовать в программе, необходимо быть зарегистрированным на нашем сайте.
            </StyledParagraph>
            <StyledSubtitle>Копите баллы</StyledSubtitle>
            <StyledParagraph>
              30% от стоимости бронирования возвращаются вам в виде баллов.
            </StyledParagraph>
            <StyledSubtitle>Тратите баллы</StyledSubtitle>
            <StyledParagraph>
              Используйте баллы для оплаты проживания и дополнительных услуг.
            </StyledParagraph>
          </TextContainer>
        </StyledContainer>
      </Layout>

      <RegisterModal 
        visible={isModalVisible}
        onClose={handleCancel}
        defaultActiveKey="register"
      />
    </>
  );
};

export default AppContent1LP;