import React, { useState } from "react";
//import HotelLogo from "C:/Users/lapa_/OneDrive/Рабочий стол/Elbrus-Hotel/my-app/src/pagers/MainPage/image/Hotel-logo.jpg";
import HotelLogo from "../image/Hotel-logo.jpg";
import { Popover } from 'antd';
import RegisterModal from "../../LoyatlyProgramPage/RegisterModelLP";
import LoginModal from "../../../components/ContHeader/LoginModal";
//import RegisterModal from "./RegisterModal";
//import LoginModal from "./LoginModal"; // Импортируем компонент модального окна входа

const SubHeader: React.FC = () => {  
    const [popoverVisible, setPopoverVisible] = useState(false);
    const [isRegisterModalVisible, setRegisterModalVisible] = useState(false);
    const [isLoginModalVisible, setLoginModalVisible] = useState(false);

    const showRegisterModal = () => {
        setRegisterModalVisible(true);
    };

    const handleRegisterModalClose = () => {
        setRegisterModalVisible(false);
    };

    const showLoginModal = () => {
        setLoginModalVisible(true);
    };

    const handleLoginModalClose = () => {
        setLoginModalVisible(false);
    };

    const contactContent = (
        <div style={{ padding: '12px', maxWidth: '250px' }}>
            <div style={{ fontWeight: 600, marginBottom: '8px' }}>
                Связаться по номеру телефона:
            </div>
            <a href="tel:+79887211675" style={{ display: 'block', margin: '4px 0', color: '#1890ff' }}>
                +7 (988) 721-16-75
            </a>
            <a href="tel:+79264121120" style={{ display: 'block', margin: '4px 0', color: '#1890ff' }}>
                +7 (926) 412-11-20
            </a>
            <div style={{ marginTop: '12px', fontWeight: 600 }}>
                Email для вопросов и пожеланий:
            </div>
            <a href="mailto:elbrusplaza@hotel.com" style={{ color: '#1890ff' }}>
                elbrusplaza@hotel.com
            </a>
        </div>
    );

    return (
        <>
            <section className='sub-header'>
                <div className='button-with-geo'>
                    <button className='choise-btn'>
                        <i className="fa fa-map-pin" aria-hidden="true"></i> Выбрать отель
                    </button>
                </div>

                <div className='button-with-phone'>
                    <Popover
                        content={contactContent}
                        title="Контактная информация"
                        trigger="click"
                        open={popoverVisible}
                        onOpenChange={setPopoverVisible}
                        placement="bottom"
                        overlayStyle={{
                            borderRadius: '8px',
                            boxShadow: '0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 6px 16px 0 rgba(0, 0, 0, 0.08)',
                        }}
                    >
                        <button 
                            className='connection-btn'
                            onClick={() => setPopoverVisible(!popoverVisible)}
                        >
                            <i className="fa fa-phone" aria-hidden="true"></i> Связаться
                        </button>
                    </Popover>
                </div>

                <div className='image'>
                    <img src={HotelLogo} alt="Логотип отеля" className='hotel-logo' />
                </div>
                
                <div className='reg-button'>
                    <button 
                        className='reg-btn' 
                        onClick={showRegisterModal}
                    >
                        Зарегистрироваться
                    </button>
                </div>

                <div className='auth'>
                    <div className='enter-btn'>
                        <button 
                            type='submit'
                            onClick={showLoginModal}
                        >
                            Вход в аккаунт
                        </button>
                    </div>
                </div>
            </section>

            <RegisterModal
                visible={isRegisterModalVisible}
                onClose={handleRegisterModalClose}
                defaultActiveKey="register"
            />

            <LoginModal
                visible={isLoginModalVisible}
                onClose={handleLoginModalClose}
            />
        </>
    );
};

export default SubHeader;