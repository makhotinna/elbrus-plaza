import React from 'react';
import { Layout } from 'antd';

const footerStyle: React.CSSProperties = {
    textAlign: 'center',
    color: '#fff',
    backgroundColor: '#fff',
    padding: '16px 0',
    marginTop: '0px', // Отрицательный отступ для поднятия футера

};

const layoutStyle = {
    borderRadius: 8,
    overflow: 'hidden',
    width: 'calc(60% - 8px)',
    maxWidth: 'calc(50% - 8px)',
    marginTop: '0', // Убрал возможные отступы сверху
};

const FooterPersonalAccount: React.FC = () => (
    <Layout style={layoutStyle}>
        <Layout.Footer style={footerStyle}>
            Footer
        </Layout.Footer>
    </Layout>
);

export default FooterPersonalAccount;