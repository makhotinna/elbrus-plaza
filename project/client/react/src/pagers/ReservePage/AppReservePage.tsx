import React from 'react';
import { Layout } from 'antd';
import ContentReserve from './componentsReservePage/ContentReserve';
import FooterReserve from './componentsReservePage/FooterReserve';
import HeaderService from './componentsReservePage/HeaderReserve';


const layoutStyle: React.CSSProperties = {
  width: '100%',
  minHeight: '100vh', 
};

const AppReserve: React.FC = () => (
  <Layout style={layoutStyle}>
    <HeaderService />
    <Layout>
        <ContentReserve />
    </Layout>
    <FooterReserve />
  </Layout>
);

export default AppReserve;