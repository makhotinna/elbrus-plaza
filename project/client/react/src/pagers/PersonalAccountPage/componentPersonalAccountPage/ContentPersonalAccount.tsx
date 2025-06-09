import React from 'react';
import { Layout, Typography, Card, Button } from 'antd';
import { Link } from 'react-router-dom';

const contentStyle: React.CSSProperties = {
  textAlign: 'center',
  backgroundColor: '#fff',
  padding: '24px',
  height: 'auto', // Изменено с minHeight на auto
};

const titleStyle: React.CSSProperties = {
  color: '#7B7B7B',
  margin: '30px 0',
  textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)',
  fontSize: '34px',
  fontWeight: 350,
  marginBottom: '30px',
  marginLeft: '-300px'
};

const cardStyle: React.CSSProperties = {
  width: '400px',
  margin: '0 auto',
  backgroundColor: '#142840',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  borderRadius: '0px',
  marginLeft: '50px'
};

const levelStyle: React.CSSProperties = {
  color: '#fff',
  fontSize: '28px',
  marginLeft: '-80px',
  marginBottom: '35px',
};

const pointsStyle: React.CSSProperties = {
  color: '#fff',
  fontSize: '28px',
  marginBottom: '10px',
  marginLeft: '-50px',
};

const buttonStyle: React.CSSProperties = {
  marginLeft: '-200px',
  marginTop: '20px',
  width: '200px',
  height: '50px',
  fontSize: '20px',
  borderRadius: '0px',
};

const ContentPersonalAccount: React.FC = () => (
  <Layout.Content style={contentStyle}>
    <Typography.Title style={titleStyle}>
      Карта лояльности
    </Typography.Title>

    <Card style={cardStyle}>
      <div style={levelStyle}>
        Уровень: бронзовый
      </div>
      <div style={pointsStyle}>
        Накопленных баллов: 0
      </div>
    </Card>
    <Link to='/loyalty'>
      <Button style={buttonStyle} type="default">
        Подробнее
      </Button>
    </Link>
  </Layout.Content>
);

export default ContentPersonalAccount;