import React from 'react';
import { Layout } from 'antd';
import DvamestaButton from './Sider/TwoPlaceButton';
import LuxButton from './Sider/LuxButton';
import ComfortButton from './Sider/ComfortButton';
import FamilyButton from './Sider/FamilyButton';
import HouseButton from './Sider/HouseButton';

const siderStyle: React.CSSProperties = {
  textAlign: 'center',
  color: '#fff',
  backgroundColor: '#fff',
  padding: '1rem',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: 'calc(100vh - 60px)',
};

const AppSider: React.FC = () => {
  return (
    <Layout.Sider width="25%" style={siderStyle}>
      <DvamestaButton />
      <LuxButton />
      <ComfortButton />
      <FamilyButton />
      <HouseButton />
    </Layout.Sider>
  );
};

export default AppSider;