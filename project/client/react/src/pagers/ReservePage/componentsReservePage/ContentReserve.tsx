// ContentReserve.tsx
import React from 'react';
import { Layout } from 'antd';
import CalendarComponent from './ContentReserve/Index';

const { Content } = Layout;

const contentStyle: React.CSSProperties = {
  padding: '0px',
  marginTop: '-40px',
  backgroundColor: '#f5f5f5',
};

const ContentReserve: React.FC = () => (
  <Layout>
    <Content style={contentStyle}>
      <CalendarComponent />
    </Content>
  </Layout>
);

export default ContentReserve;