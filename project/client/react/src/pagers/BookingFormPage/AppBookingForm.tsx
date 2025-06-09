import React from 'react';
import { Layout } from 'antd';
import HeaderBookingForm from './componentsBookingForm/HeaderBookingForm';
import ContentBookingForm from './componentsBookingForm/ContentBookingForm';
import SiderBookingForm from './componentsBookingForm/SiderBookingForm';

const layoutStyle: React.CSSProperties = {
    width: '100%',
    minHeight: '100vh', // Занимает всю высоту viewport
};

const siderStyle: React.CSSProperties = {
    textAlign: 'center',
    lineHeight: '600px',
    color: '#fff',
    backgroundColor: '#1677ff',
};

const AppBookingForm: React.FC = () => (
    <Layout style={layoutStyle}>
        <HeaderBookingForm />
        <Layout>
            <ContentBookingForm />
            <Layout.Sider width="35%" style={siderStyle}>
                <SiderBookingForm />
            </Layout.Sider>
        </Layout>
    </Layout>
);

export default AppBookingForm;