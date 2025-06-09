import React from 'react';
import { Layout } from 'antd';
import HeaderPersonalAccount from './componentPersonalAccountPage/HeaderPersonalAccount';
import ContentPersonalAccount from './componentPersonalAccountPage/ContentPersonalAccount';
import SiderPersonalAccount from './componentPersonalAccountPage/SiderPersonalAccount';
import FooterPersonalAccount from './componentPersonalAccountPage/FooterPersonalAccount';

const layoutStyle: React.CSSProperties = {
  width: '100%',
  minHeight: '100vh', // Занимает всю высоту viewport
};

const AppPersonalAccount: React.FC = () => (
  <Layout style={layoutStyle}>
    <HeaderPersonalAccount />
    <Layout>
      <SiderPersonalAccount />
      <ContentPersonalAccount />
    </Layout>
    <FooterPersonalAccount />
  </Layout>
);

export default AppPersonalAccount;