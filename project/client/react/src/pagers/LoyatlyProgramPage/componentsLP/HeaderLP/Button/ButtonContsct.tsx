import React, { useState } from 'react';
import { Button, Popover } from 'antd';
import styled from 'styled-components';

// Стили для кнопки "Связаться"
const StyledButton = styled(Button)`
  position: absolute;
  top: 105%;
  left: 35%;
  color: white !important;
  background-color: rgba(0, 0, 0, 0.5) !important; 
  border: 1px solid black !important;
  font-size: 25px;
  width: 170px;           /* Фиксированная ширина кнопки */
  height: 50px;           /* Фиксированная высота кнопки */
  display: flex;          /* Для центрирования содержимого */
  align-items: center;    /* Вертикальное центрирование */
  justify-content: center;/* Горизонтальное центрирование */
  
  /* Стили при наведении */
  &:hover {
    color: black !important;
    background-color: rgba(255, 255, 255, 0.5) !important; 
    border: 1px solid white !important;
  }
`;

const ContactPopoverContent = styled.div`
  padding: 12px;
  font-size: 14px;
  line-height: 1.6;
  max-width: 250px;
  
  .contact-title {
    font-weight: 600;
    margin-bottom: 8px;
  }
  
  .phone-number {
    display: block;
    margin: 4px 0;
    color: #1890ff;
  }
  
  .email-section {
    margin-top: 12px;
    font-weight: 600;
  }
  
  .email {
    color: #1890ff;
  }
`;

const ButtonsContactsLP: React.FC = () => {
  const [popoverVisible, setPopoverVisible] = useState(false);

  const contactContent = (
    <ContactPopoverContent>
      <div className="contact-title">Связаться по номеру телефона:</div>
      <a href="tel:+79887211675" className="phone-number">+7 (988) 721-16-75</a>
      <a href="tel:+79264121120" className="phone-number">+7 (926) 412-11-20</a>
      <div className="email-section">Email для вопросов и пожеланий:</div>
      <a href="mailto:elbrusplaza@hotel.com" className="email">elbrusplaza@hotel.com</a>
    </ContactPopoverContent>
  );

  return (
    <Popover
      content={contactContent}
      title="Контактная информация"
      trigger="hover"
      open={popoverVisible}
      onOpenChange={setPopoverVisible}
      placement="bottom"
      overlayStyle={{
        borderRadius: '8px',
        boxShadow: '0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 6px 16px 0 rgba(0, 0, 0, 0.08)',
        marginTop: '10px',
      }}
    >
      <StyledButton type="primary">
        Связаться
      </StyledButton>
    </Popover>
  );
};

export default ButtonsContactsLP;