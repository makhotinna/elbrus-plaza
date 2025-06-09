import { Button, Popover } from 'antd';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const StyledButton = styled(Button)`
  position: absolute;
  top: 7%;
  left: 75%;
  color: black !important;
  background-color: transparent;
  border: none;
  font-size: 25px;
  &:hover {
    color: #A0A0A0 !important;
    background-color: transparent;
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

const ButtonContactsBookingForm: React.FC<ContactButtonProps> = ({ onClick }) => {
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
            align={{
                offset: [0, 0], 
            }}
            overlayStyle={{
                position: 'absolute',
                left: '72%', 
                top: 'calc(6% + 40px)', 
                borderRadius: '8px',
                boxShadow: '0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 6px 16px 0 rgba(0, 0, 0, 0.08)',
            }}
            getPopupContainer={() => document.body}
        >
            <Link to="/account" style={{ display: 'inline-block' }}>
                <StyledButton 
                    icon={<i className="fa fa-map-pin" aria-hidden="true" />}
                    type="text"
                    onClick={onClick}
                >
                    Связаться
                </StyledButton>
            </Link>
        </Popover>
    );
};

export default ButtonContactsBookingForm;