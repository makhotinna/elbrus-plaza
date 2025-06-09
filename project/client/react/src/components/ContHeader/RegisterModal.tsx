import { Button, Modal, Tabs, Input, Form } from 'antd';
import styled from 'styled-components';
import { CloseOutlined } from '@ant-design/icons';
import { useState } from 'react';

const { TabPane } = Tabs;

interface RegisterModalProps {
    visible: boolean;
    onClose: () => void;
    tabTextColor?: string;
    activeTabTextColor?: string;
    tabHoverColor?: string;
    defaultActiveKey?: 'register' | 'login';
}

const ModalContent = styled.div`
  .ant-tabs-nav {
    margin-bottom: 24px;
  }
  
  .ant-form-item {
    margin-bottom: 16px;
  }
  
  .footer-actions {
    display: flex;
    justify-content: space-between;
    margin-top: 24px;
  }
`;

const StyledTabs = styled(Tabs) <{
    $tabTextColor?: string;
    $activeTabTextColor?: string;
    $tabHoverColor?: string;
}>`
  .ant-tabs-tab {
    color: ${props => props.$tabTextColor || 'red'} !important;
    
    &:hover {
      color: ${props => props.$tabHoverColor || 'green'} !important;
    }
  }
  
  .ant-tabs-tab-active {
    .ant-tabs-tab-btn {
      color: ${props => props.$activeTabTextColor || 'yellow'} !important;
    }
  }
`;

const CloseButton = styled(Button)`
  position: absolute;
  top: 15px;
  right: 15px;
  border: none;
  background: none;
  font-size: 20px;
  cursor: pointer;
  z-index: 1000;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  border-radius: 50%;

  &:hover {
    background-color: rgb(146, 84, 84);
    
    .anticon {
      color: rgba(0, 0, 0, 0.75);
    }
  }

  .anticon {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const ForgotLoginButton = styled(Button)`
  color:  rgb(0, 3, 39)  !important;
  
  &:hover {
    color:  rgb(18, 27, 127)  !important;
  }
`;

const RegisterFormButton = styled(Button)`
  background-color: #142940 !important;
  border-color: #142940 !important;
  
  &:hover {
    background-color: rgb(0, 3, 39) !important;
    border-color:rgb(0, 3, 39) !important;
  }
`;

const SendCodeButton = styled(Button)`
  background-color: #142940 !important;
  border-color: #142940 !important;
  
  &:hover {
    background-color: rgb(0, 3, 39) !important;
    border-color: rgb(0, 3, 39) !important;
  }
`;

const LoginButton = styled(Button)`
  background-color: #142940 !important;
  border-color: #142940 !important;
  
  &:hover {
    background-color: rgb(0, 3, 39) !important;
    border-color: rgb(0, 3, 39) !important;
  }
`;

const RegisterModal: React.FC<RegisterModalProps> = ({
    visible,
    onClose,
    tabTextColor = '3B395A',
    activeTabTextColor = 'grey',
    tabHoverColor = '142940',
    defaultActiveKey = 'register'
}) => {
    const [activeTab, setActiveTab] = useState('email');
    const [currentView, setCurrentView] = useState<'register' | 'login' | 'forgot'>(defaultActiveKey === 'register' ? 'register' : 'login');

    const handleCancel = () => {
        onClose();
        setCurrentView('register');
    };

    const handleForgotPassword = () => {
        setCurrentView('forgot');
    };

    const handleLogin = () => {
        setCurrentView('login');
    };

    const handleBackToRegister = () => {
        setCurrentView('register');
    };

    const onFinish = (values: any) => {
        console.log('Received values:', values);
        handleCancel();
    };

    return (
        <Modal
            title={null}
            visible={visible}
            onCancel={handleCancel}
            footer={null}
            closable={false}
            width={400}
            centered
        >
            <CloseButton icon={<CloseOutlined />} onClick={handleCancel} />

            {currentView === 'register' ? (
                <ModalContent>
                    <h3>Регистрация</h3>
                    <Form onFinish={onFinish}>
                        <Form.Item
                            name="firstName"
                            rules={[{ required: true, message: 'Введите имя' }]}
                        >
                            <Input placeholder="Имя" size="large" />
                        </Form.Item>

                        <Form.Item
                            name="lastName"
                            rules={[{ required: true, message: 'Введите фамилию' }]}
                        >
                            <Input placeholder="Фамилия" size="large" />
                        </Form.Item>

                        <Form.Item
                            name="phone"
                            rules={[{ required: true, message: 'Введите номер телефона' }]}
                        >
                            <Input placeholder="Номер телефона" size="large" />
                        </Form.Item>

                        <Form.Item
                            name="email"
                            rules={[{ required: true, type: 'email', message: 'Введите корректный email' }]}
                        >
                            <Input placeholder="Электронная почта" size="large" />
                        </Form.Item>

                        <Form.Item
                            name="confirmEmail"
                            rules={[
                                { required: true, message: 'Подтвердите email' },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || getFieldValue('email') === value) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(new Error('Email не совпадает'));
                                    },
                                }),
                            ]}
                        >
                            <Input placeholder="Подтвердите электронную почту" size="large" />
                        </Form.Item>

                        <div className="footer-actions">
                            <ForgotLoginButton type="link" onClick={handleLogin}>
                                Уже есть аккаунт? Войти
                            </ForgotLoginButton>
                            <RegisterFormButton type="primary" htmlType="submit">
                                Зарегистрироваться
                            </RegisterFormButton>
                        </div>
                    </Form>
                </ModalContent>
            ) : currentView === 'login' ? (
                <ModalContent>
                    <StyledTabs
                        activeKey={activeTab}
                        onChange={setActiveTab}
                        $tabTextColor={tabTextColor}
                        $activeTabTextColor={activeTabTextColor}
                        $tabHoverColor={tabHoverColor}
                    >
                        <TabPane tab="Почта" key="email" />
                        <TabPane tab="Телефон" key="phone" />
                    </StyledTabs>

                    <Form onFinish={onFinish}>
                        {activeTab === 'email' ? (
                            <Form.Item
                                name="email"
                                rules={[{ required: true, message: 'Введите email' }]}
                            >
                                <Input placeholder="Электронная почта" size="large" />
                            </Form.Item>
                        ) : (
                            <Form.Item
                                name="phone"
                                rules={[{ required: true, message: 'Введите телефон' }]}
                            >
                                <Input placeholder="Номер телефона" size="large" />
                            </Form.Item>
                        )}

                        <Form.Item
                            name="password"
                            rules={[{ required: true, message: 'Введите пароль' }]}
                        >
                            <Input.Password placeholder="Пароль" size="large" />
                        </Form.Item>

                        <div className="footer-actions">
                            <div>
                                <ForgotLoginButton type="link" onClick={handleForgotPassword}>
                                    Забыли пароль?
                                </ForgotLoginButton>
                                <ForgotLoginButton type="link" onClick={handleBackToRegister}>
                                    Зарегистрироваться
                                </ForgotLoginButton>
                            </div>
                            <LoginButton type="primary" htmlType="submit">
                                Войти
                            </LoginButton>
                        </div>
                    </Form>
                </ModalContent>
            ) : (
                <ModalContent>
                    <h3>Восстановление пароля</h3>
                    <p>Для восстановления доступа укажите вашу зарегистрированную электронную почту. На неё будет отправлен код подтверждения.</p>

                    <Form onFinish={onFinish}>
                        <Form.Item
                            name="recoveryEmail"
                            rules={[{ required: true, message: 'Введите email' }]}
                        >
                            <Input placeholder="Электронная почта" size="large" />
                        </Form.Item>

                        <div className="footer-actions">
                            <Button onClick={handleBackToRegister}>Отмена</Button>
                            <SendCodeButton type="primary" htmlType="submit">
                                Отправить код
                            </SendCodeButton>
                        </div>
                    </Form>
                </ModalContent>
            )}
        </Modal>
    );
};

export default RegisterModal;