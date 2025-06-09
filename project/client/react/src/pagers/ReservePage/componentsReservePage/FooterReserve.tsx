import React from 'react';
import { Layout, Button } from 'antd';
import { Link } from 'react-router-dom';

const footerStyle: React.CSSProperties = {
  textAlign: 'center',
  backgroundColor: '#F5F5F5',
  padding: '0px',
};

const buttonStyle: React.CSSProperties = {
  backgroundColor: '#383B52',
  color: '#fff',
  borderRadius: '0px',
  padding: '0 180px',
  height: '48px',
  fontSize: '16px',
  fontWeight: 500,
  transition: 'all 0.3s ease',
};

const layoutStyle: React.CSSProperties = {
  width: '100%',
  minHeight: '100vh',
};

const FooterReserve: React.FC = () => (
  <Link to='/bookingform'>
      <Layout style={layoutStyle}>
    <Layout.Footer style={footerStyle}>
      <Button 
        type="primary" 
        style={buttonStyle}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = '#E3D9D4';
          e.currentTarget.style.color = '#383B52';
          e.currentTarget.style.borderColor = '#383B52';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = '#383B52';
          e.currentTarget.style.color = '#fff';
          e.currentTarget.style.borderColor = '#383B52';
        }}
      >
        Перейти к заполнению данных
      </Button>
    </Layout.Footer>
  </Layout>
  </Link>

);

export default FooterReserve;