import React from 'react';
import { Layout } from 'antd';
import AppHeaderLP from './componentsLP/AppHeader';
import AppContent1LP from './componentsLP/AppContent1';
import AppContent2 from './componentsLP/AppContent2';
import AppContent3 from './componentsLP/AppContent3';
import AppFooterLP from './componentsLP/AppFooter';

const layoutStyle: React.CSSProperties = {
  width: '100%',
  maxWidth: '100%',
  display: 'flex',
  flexDirection: 'column'
};

const AppLP: React.FC = () => (
  <Layout style={layoutStyle}>
    <AppHeaderLP />
    <AppContent1LP />
    <AppContent2 />
    <AppContent3 />
    <AppFooterLP />
  </Layout>
);

export default AppLP;