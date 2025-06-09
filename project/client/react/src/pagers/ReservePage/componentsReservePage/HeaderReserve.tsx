import React from 'react';
import { Layout, Typography } from 'antd';
import Image from '../../../picture/image-2.png';
import ButtonMainPageReserve from './HeaderReserve/ButtonMainPage';
import ButtonViewingNumberReserve from './HeaderReserve/ButtonViewNumber';
import ButtonContactsReserveP from './HeaderReserve/ButtonContact';

const { Header, Content } = Layout;
const { Title, Paragraph } = Typography;

const layoutStyle: React.CSSProperties = {
  borderRadius: 8,
  overflow: 'hidden',
  width: '100%',
};

const headerStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  padding: '0 154px',
  background: '#fff',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
  height: '120px',
};

const logoStyle: React.CSSProperties = {
  height: '100px',
  marginRight: '30px',
};

const contentStyle: React.CSSProperties = {
  padding: '30px',
  textAlign: 'center',
};

const customTextStyle: React.CSSProperties = {
  fontSize: '20px',
  color: '#555555',
};

const HorizontalLine = () => (
  <div style={{
    height: '10px',
    background: '#DDD6D6',
    position: 'relative',
    left: '50%',
    transform: 'translateX(-50%)',
  }} />
);

const HeaderService: React.FC = () => (
  <Layout style={layoutStyle}>
    <Header style={headerStyle}>
      <img
        src={Image}
        alt="Логотип компании"
        style={logoStyle}
      />
      <ButtonMainPageReserve />
      <ButtonViewingNumberReserve />
      <ButtonContactsReserveP />
    </Header>
    <Content style={contentStyle}>
      <Title level={2}>Забронировать отдых</Title>
      <Paragraph style={{ ...customTextStyle, margin: '20px 0' }}> {/* Применяем стиль к тексту */}
        Если нужный номер занят в течение всего запрашиваемого периода,  наш <br /> менеджер по номеру
        +7 (988) 721-16-75 поможет подобрать альтернативный <br /> вариант с переездом.
      </Paragraph>
      <HorizontalLine />
      <Paragraph style={{ ...customTextStyle, margin: '30px 0' }}>Выберите даты заезда, выезда и количество гостей.</Paragraph>
    </Content>
  </Layout>
);

export default HeaderService;