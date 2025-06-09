import { Layout } from 'antd';
import AppLP from './LoyatlyProgramPage/AppLoyaltyProgram';

const { Content } = Layout;

const LoyaltyPage: React.FC = () => {
  return (
    <div style={{
      width: '100vw',
      minHeight: '100vh',
      margin: 0,
      padding: 0,
      overflowX: 'hidden'
    }}>
      <Layout style={{
          width: '100%',
          minHeight: '100vh',
          margin: 0,
          padding: 0,
          background: 'transparent',
          display: 'flex',
          flexDirection: 'column'
        }}>
        <Content style={{
          flex: 1,
          padding: 0,
          margin: 0,
          width: '100%',
          display: 'flex', // Добавляем flex
          justifyContent: 'center' // Центрируем содержимое
        }}>
          <AppLP />
        </Content>
      </Layout>
    </div>
  );
};

export default LoyaltyPage;