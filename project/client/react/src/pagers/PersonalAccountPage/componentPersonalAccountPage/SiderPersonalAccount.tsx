import React from 'react';
import { Layout, Typography } from 'antd';
import { Button } from 'antd';
import Bronza from '../../../picture/bronza.png';
import { Link } from 'react-router-dom';


const siderStyle: React.CSSProperties = {
  textAlign: 'center',
  color: '#fff',
  backgroundColor: 'rgba(255, 255,255, 1)', // Полупрозрачный белый
  height: 'auto',
  padding: '20px',
  position: 'relative', // Добавляем позиционирование
  zIndex: 1, // Устанавливаем z-index
};

const titleStyle: React.CSSProperties = {
  color: '#7B7B7B',
  margin: '20px 0',
  textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)',
  fontSize: '34px',
  fontWeight: 350,
  marginBottom: '30px',
  textAlign: 'left',
  paddingLeft: '70px',
};

const FIO: React.CSSProperties = {
  color: '#000',
  textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)',
  fontSize: '44px',
  fontWeight: 350,
  textAlign: 'left',
  margin: 0,
  lineHeight: '1.2',
};

const contentStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  paddingLeft: '70px',
};



const SiderPersonalAccount: React.FC = () => (
  <Layout.Sider width="50%" style={siderStyle}>
    <Typography.Title style={titleStyle}>
      Профиль гостя
    </Typography.Title>

    <div style={contentStyle}>
      <img src={Bronza} alt="Bronze" style={{ width: '250px', marginRight: '20px' }} />
      <Typography.Title style={FIO}>
        Махотина Валерия <br /> Олеговна
      </Typography.Title>

    </div>
    <Link to='/change'>
      <Button
        type="default"
        style={{ marginLeft: '100px' }} // Добавляем отступ слева
      >
        Изменить данные
      </Button>
    </Link>

  </Layout.Sider>
);

export default SiderPersonalAccount;