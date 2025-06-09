import React, { useState } from 'react';
import { Button } from 'antd';
import styled from 'styled-components';
import RegisterModal from '../../../RegisterModelLP';

// Стили для кнопки "Зарегистрироваться"
const StyledButton = styled(Button)`
  position: absolute;
  top: 105%;
  left: 10%;
  color: white !important;
  background-color: #E3D9D4;
  color: black !important;  
  border: none;
  font-size: 25px;
  width: 300px;           /* Фиксированная ширина кнопки */
  height: 50px;           /* Фиксированная высота кнопки */
  display: flex;          /* Для центрирования содержимого */
  align-items: center;    /* Вертикальное центрирование */
  justify-content: center;/* Горизонтальное центрирование */
  
  /* Стили при наведении */
  &:hover {
    color: rgb(248, 248, 248) !important;
    background-color: #383B52 !important;
  }
`;

const HeaderButtonsLP: React.FC = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <>
            <StyledButton 
                type="primary"
                onClick={showModal}
            >
                Зарегистрироваться
            </StyledButton>
            
            <RegisterModal
                visible={isModalVisible}
                onClose={handleCancel}
                defaultActiveKey="register"
            />
        </>
    );
};

export default HeaderButtonsLP;