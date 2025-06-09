import React from 'react';
import { Layout } from 'antd';
import HeaderService from './componentsService/HeaderService';
import ContentService from './componentsService/ContentService';

const layoutStyle: React.CSSProperties = {
    borderRadius: 8,
    overflow: 'hidden',
    width: '100%', // Занимает 100% ширины родителя
};

const AppService: React.FC = () => (
    <Layout style={layoutStyle}>
        <HeaderService />
        <Layout>
            <ContentService />
        </Layout>
    </Layout>
);

export default AppService;