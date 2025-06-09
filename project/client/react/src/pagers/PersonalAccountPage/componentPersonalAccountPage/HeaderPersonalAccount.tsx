import React from 'react';
import { Layout } from 'antd';
import Image from '../../../picture/image-2.png';
import ButtonMainPersonalAccount from './HeaderPersonalAccount/ButtonMainPage';
import ButtonServicePersonalAccount from './HeaderPersonalAccount/ButtonService';
import ButtonContactsPersonalAccount from './HeaderPersonalAccount/ButtonContacts';

const { Header } = Layout;

const layoutStyle: React.CSSProperties = {
  borderRadius: 8,
  overflow: 'hidden',
  width: '100%',
};

const headerStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  padding: '0 154px',
  background: '#fff',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
  height: '120px',
  position: 'relative', // Needed for the pseudo-element
};

const logoStyle: React.CSSProperties = {
  height: '100px',
  marginRight: '30px',
};

const HeaderPersonalAccount: React.FC = () => (
  <Layout style={layoutStyle}>
    <Header style={headerStyle}>
      <img
        src={Image}
        alt="Логотип компании"
        style={logoStyle}
      />
      <ButtonMainPersonalAccount />
      <ButtonServicePersonalAccount />
      <ButtonContactsPersonalAccount />
      {/* Bottom line */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '5px',
        backgroundColor: '#D9D9D9',
      }} />
    </Header>
  </Layout>
);

export default HeaderPersonalAccount;