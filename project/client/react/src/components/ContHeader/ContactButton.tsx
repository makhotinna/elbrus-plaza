import { Button, Popover } from 'antd';
import styled from 'styled-components';
import { useState } from 'react';

const StyledButton = styled(Button)`
  font-family: New Century Schoolbook, TeX Gyre Schola, serif !important;
  font-size: 20px !important;
  height: 40px !important;
  width: 200px !important;
  border-radius: 20px !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  margin-left: 140px !important;
  transition: all 0.3s ease !important;
  
  &:hover {
    background-color: #f0f0f0 !important;
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

interface ContactButtonProps {
  onClick?: () => void;
}

const ContactButtonHeader: React.FC<ContactButtonProps> = ({ onClick }) => {
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
      placement="bottom"  // Изменено на "bottom" для отображения снизу
      overlayStyle={{
        borderRadius: '8px',
        boxShadow: '0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 6px 16px 0 rgba(0, 0, 0, 0.08)',
        marginTop: '10px',  // Добавлен отступ от кнопки
      }}
    >
      <StyledButton 
        icon={<i className="fa fa-map-pin" aria-hidden="true" />}
        type="text"
        onClick={onClick}
      >
        Связаться
      </StyledButton>
    </Popover>
  );
};

export default ContactButtonHeader;