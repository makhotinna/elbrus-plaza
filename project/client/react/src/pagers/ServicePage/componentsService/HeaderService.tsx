import React from 'react';
import { Layout } from 'antd';
import Image from '../../../picture/Frame 76.png';
import ButtonLoyaltyProgramS from './HeaderService/ButtonLoyaltyProgram';
import ButtonMainPageS from './HeaderService/ButtonMainPage';
import ButtonContactsS from './HeaderService/ButtonPersonalPage';
import ButtonViewingNumberS from './HeaderService/ButtonViewingNumber';
import TextHeaderS from './HeaderService/TextS';

const layoutStyle: React.CSSProperties = {
    borderRadius: 8,
    overflow: 'hidden',
    width: '100%', 
};

const HeaderService: React.FC = () => (
    <Layout style={layoutStyle}>
        <img
            src={Image}
            alt="Логотип компании"
            style={{ height: '850px' }}
        />
        <ButtonLoyaltyProgramS />
        <ButtonMainPageS />
        <ButtonContactsS />
        <ButtonViewingNumberS />
        <TextHeaderS />
    </Layout>)
export default HeaderService