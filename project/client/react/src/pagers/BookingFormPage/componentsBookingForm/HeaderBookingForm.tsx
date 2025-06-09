import React from 'react';
import { Layout } from 'antd';
import Image from '../../../picture/image-2.png';
import ButtonContactsBookingForm from './HeaderButton/ButtonContactsBF';
import ButtonMainPageBookingForm from './HeaderButton/ButtonMainPageBF';
import ButtonViewingBookingForm from './HeaderButton/ButtonViewNumber';

const { Header } = Layout;

const headerStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  padding: '0 154px',
  background: '#fff',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
  height: '120px',
};

const logoStyle: React.CSSProperties = {
  height: '100px',
  marginRight: '30px',
};

const HeaderBookingForm: React.FC = () => (
  <Layout >
    <Header style={headerStyle}>
      <img
        src={Image}
        alt="Логотип компании"
        style={logoStyle}
      />
      <ButtonMainPageBookingForm />
      <ButtonViewingBookingForm />
      <ButtonContactsBookingForm />
    </Header>
  </Layout>
);

export default HeaderBookingForm;