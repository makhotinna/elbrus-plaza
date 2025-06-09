import React from 'react';
import { Layout } from 'antd';
import Image from '../../../picture/Frame 75.png';
import ButtonContactsLP from './HeaderLP/Button/ButtonPersonalAccounts';
import ButtonViewingNumber from './HeaderLP/Button/ButtonViewingNumber';
import ButtonMainPageLP from './HeaderLP/Button/ButtonMainPage';
import ButtonServiceLP from './HeaderLP/Button/ButtonService';
import TextHeaderLP from './HeaderLP/Text';
import HeaderButtonsLP from './HeaderLP/Button/ButtonRegister';
import ButtonsContactsLP from './HeaderLP/Button/ButtonContsct';

const layoutStyle: React.CSSProperties = {
    width: '100%',
    maxWidth: '100%', // Занимаем всю доступную ширину
    display: 'flex',
    flexDirection: 'column'
};

const AppHeaderLP: React.FC = () => (
    <Layout style={layoutStyle}>
        <img
            src={Image}
            alt="Логотип компании"
            style={{ height: '850px' }}
        />
        <ButtonContactsLP />
        <ButtonViewingNumber />
        <ButtonMainPageLP />
        <ButtonServiceLP />
        <TextHeaderLP />
        <HeaderButtonsLP />
        <ButtonsContactsLP />
    </Layout>
);

export default AppHeaderLP