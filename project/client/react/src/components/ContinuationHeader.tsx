// ContinuationHeader.tsx
import React, { useState } from 'react';
import { Layout } from 'antd';
import styled from 'styled-components';
import Lable from '../picture/Lable.png';
import ContactButtonH from './ContHeader/ContactButton';
import LoginButtonH from './ContHeader/LoginButton';
import ReserveButton from './ContHeader/ReserveButton';
import RegisterButtonH from './ContHeader/RegisterButton';
import RegisterModal from './ContHeader/RegisterModal'; // Изменили импорт

interface ContinuationHeaderProps {}

const StyledHeader = styled(Layout.Header)`
  padding: 0;
  height: 125px;
`;

const SubHeader = styled.section`
  display: flex;
  height: 110px;
  align-items: center;
  background-color: white;
  padding: 20px;
`;

const HotelLogo = styled.img`
  display: flex;
  justify-content: center;
  width: 210px;
  height: 105px;
  margin-top: 5px;
  margin-left: -80px;
`;

const AuthContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 0px;
  margin-left: -3px;
  position: relative;
  z-index: 1;
`;

const ContinuationHeader: React.FC<ContinuationHeaderProps> = () => {
  const [registerModalVisible, setRegisterModalVisible] = useState(false); // Изменили состояние
  const [loginModalVisible, setLoginModalVisible] = useState(false);

  const handleLoginClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setLoginModalVisible(true);
  };

  const handleRegisterClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setRegisterModalVisible(true);
  };

  return (
    <>
      <StyledHeader className="continuation-header">
        <SubHeader>
          <div className='button-with-geo'>
            <ContactButtonH />
          </div>

          <div className='button-with-phone'>
            <ReserveButton />
          </div>

          <div className='image'>
            <HotelLogo src={Lable} alt="Логотип отеля" />
          </div>

          <div className='reg-button'>
            <RegisterButtonH onClick={handleRegisterClick} /> {/* Добавили обработчик */}
          </div>

          <AuthContainer>
            <div className='enter-btn'>
              <LoginButtonH onClick={handleLoginClick} />
            </div>
          </AuthContainer>
        </SubHeader>
      </StyledHeader>

      <RegisterModal 
        visible={registerModalVisible}
        onClose={() => setRegisterModalVisible(false)}
        defaultActiveKey="register" // Указываем, что по умолчанию открыта регистрация
      />
      
      <RegisterModal 
        visible={loginModalVisible}
        onClose={() => setLoginModalVisible(false)}
        defaultActiveKey="login" // Указываем, что по умолчанию открыт вход
      />
    </>
  );
};

export default ContinuationHeader;