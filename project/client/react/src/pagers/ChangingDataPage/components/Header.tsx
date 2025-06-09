import { Layout, Menu } from 'antd';
import { Image } from 'antd';
import type { MenuProps } from 'antd';
import Container from "./Container";
import LogoImage from '../../../picture/image-2.png';

const { Header: AntHeader } = Layout;

const items: MenuProps['items'] = [
  {
    key: 'home',
    label: 'Главная страница',
  },
  {
    key: 'services',
    label: 'Услуги',
  },
  {
    key: 'contact',
    label: 'Связаться',
  },
];

const AppHeader = () => {
  return (
    <AntHeader 
      style={{ 
        background: '#fff', 
        borderBottom: '1px solid #d3d3d3',
        padding: 0,
        position: 'sticky',
        top: 0,
        zIndex: 1,
        width: '100%',
        height: '125px'
      }}
    >
      <Container>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center',
          justifyContent: 'space-between',
          right: '100px', // Добавленный отступ вправо
        }}>
          <div style={{ 
            cursor: 'pointer',
            marginLeft: '200px' // Отступ слева для логотипа
          }}>
            <Image 
              width={170}
              src={LogoImage}
              preview={false}
              alt="Логотип"
            />
          </div>
          
          <Menu
            theme="light"
            mode="horizontal"
            items={items}
            style={{
              flex: 1,
              justifyContent: 'flex-end',
              minWidth: 0,
              borderBottom: 'none',
              left: '50px' // Дополнительный отступ для меню
            }}
          />
        </div>
      </Container>
    </AntHeader>
  );
};

export default AppHeader;